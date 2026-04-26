import { StateCreator } from 'zustand';
import {PostControllerService} from "@/api";

export interface TagsSlice {
  /**
   * The loaded tags
   * */
  loadedTags: string[];

  /**
   * Selected tags for the post.
   * */
  selectedTags: string[];

  /**
   * Removes a tag from the selected ones in the post.
   * */
  addTag: (tag: string) => void;

  /**
   * Removes a tag from the selected ones in the post.
   * */
  removeTag: (index: number) => void;

  setTags: (tags: string[]) => void;

  /**
   * Gets the available post tags from the backend.
   * */
  loadTags: () => Promise<void>;
}

/**
 * Slice for the post store that handles the business logic related to the post tags.
 */
export const createTagsSlice: StateCreator<TagsSlice> = (set) => ({
  loadedTags: [],

  selectedTags: [],

  addTag: (tag) => set((state) => ({ selectedTags: [...state.selectedTags, tag] })),

  removeTag: (index) =>
      set((state) => ({
        selectedTags: state.selectedTags.filter((_, i) => i !== index),
      })),

  setTags: (tags: string[]) => set({ loadedTags: [...tags] }),

  loadTags: async () => {
    const response = await PostControllerService.getTags();
    const tags = response.data

    if (tags === undefined) {
      throw new Error("Unable to load tags");
    }

    set(() => ({
      loadedTags: tags,
    }));
  },
});
