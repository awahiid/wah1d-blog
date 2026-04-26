import {create} from "zustand/react";

type ConfigState = {
    tags: string[],
    sections: string[],
    setTags: (tags: string[]) => void,
    setSections: (sections: string[]) => void,
};

const useConfigStore = create<ConfigState>((set, get) => ({
    tags: [],

    sections: ['Software', 'Learning', 'Thoughts'],

    setTags: (tags: string[]) => set({tags}),

    setSections: (sections: string[]) => set({sections}),
}));

export default useConfigStore;