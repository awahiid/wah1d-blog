import "@/styles/global.css";
import React from "react";
import PostList from "@/components/home/PostList";
import HomeToolbar from '@/components/home/HomeToolbar';
import TagsContainer from "@/components/home/TagsContainer";
import HomeHero from "@/components/home/HomeHero";
import {PostControllerService} from "@/api";

export default async function HomePage() {
    const page = await PostControllerService.getFilteredPosts();
    const tagsPage = await PostControllerService.getTags();
    const sectionsPage = await PostControllerService.getSections();
    const posts = page.data?.content || []
    const tags = tagsPage.data || []
    const sections = sectionsPage.data || []

    return (
        <>
            <HomeHero post={posts[0]} />
            <main className="w-full flex flex-col relative">
                <HomeToolbar sections={sections}/>
                <TagsContainer tags={tags}/>
                <PostList posts={posts}/>
                <footer className="w-full h-36 border-t border-neutral flex flex-col p-9 justify-center items-center">
                    <p className="h-fit w-full max-w-7xl flex justify-end">Made by Abdel Wahed</p>
                </footer>
            </main>
        </>
    );
}


