import PostList from "@/components/home/PostList";
import React from "react";
import {PostControllerService} from "@/api";

export async function PostListSection(){
    const page = await PostControllerService.getFilteredPosts();
    const posts = page.data?.content || []

    return <PostList posts={posts}/>
}

export async function PostListFallback() {
    return  <p className={'mx-auto h-72 flex flex-wrap items-center justify-center text-lg text-center gap-3 animate-pulse'}>
        Retrieving posts <span>(⩾﹏⩽)</span>
    </p>
}