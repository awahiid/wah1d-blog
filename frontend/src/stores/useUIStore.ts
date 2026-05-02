import {create} from "zustand/react";

type Popup = 'menu'

type UIStore = {
    activePopup: Popup | undefined,
    setActivePopup: (popup: Popup | undefined) => void,
}

const useUIStore = create<UIStore>((set) => ({
    activePopup: undefined,
    setActivePopup: (popup: Popup | undefined) => set({activePopup: popup}),
}))

export default useUIStore;