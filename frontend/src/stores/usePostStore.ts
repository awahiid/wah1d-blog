import { createMetadataSlice, MetadataSlice } from '@/stores/slices/useMetadataSlice';
import { BlocksSlice, createBlocksSlice } from '@/stores/slices/useBlocksSlice';
import { createTagsSlice, TagsSlice } from '@/stores/slices/useTagsSlice';
import { create } from 'zustand/react';
import { createMediaSlice, MediaSlice } from '@/stores/slices/useMediaSlice';
import Block, { SerializableContent } from '@/lib/blocks/Block';
import {PostControllerService, PostDTO, UpdatePostReq} from "@/api";
import {POST_BLOCK_TYPE} from "@/types";
import '@/lib/client.api.config'

interface PostStore extends MetadataSlice, BlocksSlice, TagsSlice, MediaSlice {
  /**
   * Initializes the store's state from a given Post object.
   * This is useful for loading an existing post into the editor.
   *
   * @param post - The post to load into the editor.
   * @param editable - Indicates if the post is going to be editable at first or not.
   */
  initialize: (post: PostDTO, editable: boolean) => Promise<void>;

  /**
   * Constructs a full Post object based on the current state.
   * This method is used before sending data to the backend.
   *
   * @returns A complete Post object.
   */
  constructPost: () => PostDTO;

  /**
   * Creates and initializes a post.
   */
  createPost: () => Promise<string>;

  /**
   * Sends an update request to the backend with the current post content.
   * This method does not handle image uploads — they should be handled separately.
   */
  updatePost: () => Promise<void>;

  /**
   * First updates the post on the backend,
   * then sends a "publish" request to make the post public.
   */
  publishPost: () => Promise<void>;
}

/**
 * Zustand store that handles all the business logic related to editing and representing a post.
 * It includes state and actions for handling metadata, content blocks, tags, and images.
 *
 * This store aggregates several slices (metadata, blocks, tags, images),
 * and provides additional methods to create, update, publish and initialize posts.
 *
 * @example
 * ```tsx
 * const { addBlock, removeBlock, createPost } = usePostStore();
 * ```
 */
const usePostStore = create<PostStore>((set, get, store) => ({
  ...createMetadataSlice(set, get, store),
  ...createBlocksSlice(set, get, store),
  ...createMediaSlice(set, get, store),
  ...createTagsSlice(set, get, store),

  constructPost: () => {
    const { id, title, section, createdAt, covers, description, selectedTags, blocks } = get();

    if(id == undefined) throw new Error("Cannot build a post without id");

    const post: PostDTO = {
      id: id,
      title: title,
      createdAt: createdAt,
      covers: covers,
      description: description,
      section: section ?? undefined,
      tags: selectedTags,
      content: [...blocks.map(b => ({
        id: b.id,
        position: b.position,
        type: b.type as POST_BLOCK_TYPE,
        content: b.content as SerializableContent
      }))],
      deleted: false,
      published: false
    };

    return post;
  },

  initialize: async (post: PostDTO, editable: boolean) => {
    if (!post.id || !post.createdAt) throw new Error("Invalid post");

    const state = get();

    await state.loadTags();

    const blocks = (post.content || [])
        .map(blockJSON =>
            state.blockFactory.createBlock(
                blockJSON.type as POST_BLOCK_TYPE,
                blockJSON.id,
                blockJSON.position,
                blockJSON.content as SerializableContent,
                editable
            )
        )
        .filter((block): block is Block<SerializableContent> => block !== undefined)
        .sort((a, b) => a.position - b.position);

    set({
      id: post.id,
      editable,
      title: post.title,
      section: post.section,
      selectedTags: post.tags ?? [],
      createdAt: post.createdAt,
      covers: post.covers,
      description: post.description,
      blocks,
      deleted: post.deleted,
      published: post.published,
    });
  },

  createPost: async () => {
    const { initialize } = get();

    const response = await PostControllerService.createPost();
    const postDTO = response.data;

    if(postDTO == undefined) throw new Error("Error while creating post");

    await initialize(postDTO, true);

    return postDTO.id;
  },

  updatePost: async () => {
    try {
      const { constructPost } = get();
      const post = constructPost();

      const updateReq: UpdatePostReq = {
        id: post.id,
        title: post.title,
        description: post.description,
        section: post.section,
        tags: post.tags,
        content: post.content,
        covers: post.covers
      }

      await PostControllerService.updatePost({
        body: updateReq
      });
    } catch (error) {
      throw new Error("Unable to update post. " + error);
    }
  },

  publishPost: async () => {
    const { id, updatePost } = get();
    if( id == undefined) throw new Error("Cannot publish a post without id")

    try {
      await updatePost();
      await PostControllerService.updatePost({
        body: {
          id: id,
          published: true
        }});
    } catch (error) {
      throw new Error("Unable to publish post. " + error);
    }
  },
}));

export default usePostStore;
