import "@/styles/global.css";
import React, {Suspense} from "react";
import {HomeToolbarSection} from "@/components/home/HomeToolbarSection";
import {HomeHeroFallback, HomeHeroSection} from "@/components/home/HomeHeroSection";
import {TagsContainerFallback, TagsSection} from "@/components/home/TagsSection";
import {PostListFallback, PostListSection} from "@/components/home/PostListSection";

export default async function HomePage() {
    return (
        <>
            <Suspense fallback={<HomeHeroFallback text={"Loading most recent post"} className={'animate-pulse'}/>}>
                <HomeHeroSection/>
            </Suspense>
            <main className="w-full flex flex-col relative">
                <Suspense>
                    <HomeToolbarSection/>
                </Suspense>
                <Suspense fallback={<TagsContainerFallback/>}>
                    <TagsSection/>
                </Suspense>
                <Suspense fallback={<PostListFallback/>}>
                    <PostListSection/>
                </Suspense>
                <footer className="w-full h-36 border-t border-neutral flex flex-col p-9 justify-center items-center">
                    <p className="h-fit w-full max-w-7xl flex justify-end">Made by Abdel Wahed</p>
                </footer>
            </main>
        </>
    );
}


