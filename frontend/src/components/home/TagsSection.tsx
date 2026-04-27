import TagsContainer from "@/components/home/TagsContainer";
import React from "react";
import {PostControllerService} from "@/api";

export async function TagsSection(){
    const tagsPage = await PostControllerService.getTags();
    const tags = tagsPage.data || []

    return <TagsContainer tags={tags}/>
}

export function TagsContainerFallback() {
    return <div className="overflow-x-auto mx-auto w-full max-w-screen-2xl h-[4.7rem] text-nowrap flex items-center border-b-2 border-neutral sm:pl-9 sm:pr-9 px-3 gap-2">
        {
            Array.from({ length: 3 }).map((_, index) => {
                return    <div key={index} className={"px-4 text-transparent py-3 sm:py-4 min-w-18 bg-gradient-to-br from-neutral to-neutral/80 animate-pulse sm:px-6 text-sm sm:text-md h-fit active:scale-95 duration-75 w-fit flex items-center justify-center rounded-full gap-2 cursor-pointer select-none"}>
                    Loading tags
                </div>
            })
        }

    </div>
}