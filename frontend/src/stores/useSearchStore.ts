import { create } from 'zustand/react';
import {PostControllerService} from "@/api";
import '@/lib/client.api.config'
import useHomeStore from "@/stores/useHomeStore";

type SearchState = {
    loading: boolean,
    tags: string[],
    section?: string,
    query: string,
    setTags: (tags: string[]) => void,
    setSection: (section: string | undefined) => void,
    setQuery: (query: string) => void,
    search: () => Promise<void>;
};

const useSearchStore = create<SearchState>((set, get) => ({
    loading: false,

    tags: [],

    section: undefined,

    query: '',

    setTags: (tags: string[]) => set({tags}),

    setSection: (section: string | undefined) => set({section}),

    setQuery: (query: string) => set({query}),

    search: async () => {
        const { tags, section, query } = get()

        set({loading: true})
        const setPosts = useHomeStore.getState().setPosts;

        setPosts([])

        const result = await PostControllerService.getFilteredPosts({
            query: {
                tags: tags,
                sections: section ? [section] : undefined,
                query
            }
        })

        const posts = result.data?.content;

        setPosts(posts || []);
        set({loading: false})
    },
}));

export default useSearchStore;