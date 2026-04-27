import HomeHero from "@/components/home/HomeHero";
import React from "react";
import {PostControllerService} from "@/api";
import {cn} from "@/utils/cn";

export async function HomeHeroSection() {
    const page = await PostControllerService.getFilteredPosts();
    const posts = page.data?.content || []

    return <HomeHero post={posts[0]} />
}

export function HomeHeroFallback({text, className}: {text: string, className?: string}) {
    return  <div className={cn(className, "flex justify-center items-center w-full sm:flex max-h-[660px] h-[40.8rem]")}>
        {text}
    </div>
}