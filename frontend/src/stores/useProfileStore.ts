import { create } from 'zustand/react';
import {PostControllerService, PostDetails} from "@/api";
import '@/lib/client.api.config'

type ProfileState = {
  loadedPosts: PostDetails[];
  loadPosts: () => Promise<void>;
  setPosts: (posts: PostDetails[]) => void;
  deletePost: (id: string) => Promise<void>;
  purgePost: (id: string) => Promise<void>;
  restorePost: (id: string) => Promise<void>;
};

const useProfileStore = create<ProfileState>((set, get) => ({
  loadedPosts: [],

  setPosts: (loadedPosts: PostDetails[]) => set({ loadedPosts: loadedPosts }),

  loadPosts: async () => {
    const response = await PostControllerService.getUserFilteredPosts();
    const posts = response.data?.content || [];

    set({ loadedPosts: posts});
  },

  deletePost: async (id: string) => {
    const { loadPosts } = get();
    try {
      await PostControllerService.updatePost({
        body: {
          id,
          deleted: true
        }});
      await loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  },

  purgePost: async (id: string) => {
    const { loadPosts } = get();
    try {
      await PostControllerService.purgePost({
        path: {
          id
        }});
      await loadPosts();
    } catch (error) {
      console.error('Error purging post:', error);
    }
  },

  restorePost: async (id: string) => {
    const { loadPosts } = get();
    try {
      await PostControllerService.updatePost({
        body: {
          id,
          deleted: false
      }});
      await loadPosts();
    } catch (error) {
      console.error('Error restoring post:', error);
    }
  }
}));

export default useProfileStore;
