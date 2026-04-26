import { create } from 'zustand/react';
import {PostControllerService, PostDetails} from "@/api";
import '@/lib/client.api.config'

type HomeState = {
  loadedPosts: PostDetails[];
  loadPosts: () => Promise<void>;
  setPosts: (posts: PostDetails[]) => void;
};

const useHomeStore = create<HomeState>((set, get) => ({
  loadedPosts: [],

  setPosts: (loadedPosts: PostDetails[]) => set({ loadedPosts }),

  loadPosts: async () => {
    if (get().loadedPosts.length > 0) return;

    const page = await PostControllerService.getFilteredPosts();

    set({
      loadedPosts: page.data?.content || [],
    });
  },
}));

export default useHomeStore;
