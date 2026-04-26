import AddBlockMenu from "@/components/editor/AddBlockMenu";
import React from "react";
import usePostStore from "@/stores/usePostStore";

export function AddBlockButton(){
    const addBlock = usePostStore(state => state.addBlock);
    const blockFactory = usePostStore(state => state.blockFactory);
    const blocks = usePostStore(state => state.blocks)
    const editable = usePostStore(state => state.editable)

    return <>
        {editable &&  <div className={'w-fit mb-10 rounded-full border border-neutral'}>
            <AddBlockMenu onAdd={(type) => addBlock(type, blocks.length - 1)} catalog={blockFactory.catalog.catalog}/>
        </div>}
    </>
}