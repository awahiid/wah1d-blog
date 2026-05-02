'use client';

import useUIStore from "@/stores/useUIStore";
import {MdMenu} from "react-icons/md";

export function MenuButton() {
    const activePopup = useUIStore(state => state.activePopup);
    const setActivePopup = useUIStore(state => state.setActivePopup);

    return <MdMenu className={"block sm:hidden size-9 hover:cursor-pointer"} onClick={() => activePopup === 'menu' ? setActivePopup(undefined) : setActivePopup('menu')}></MdMenu>
}