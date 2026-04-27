'use client'

import {PostDetails} from "@/api";
import {EditPostRow} from "@/components/profile/EditPostRow";
import useProfileStore from "@/stores/useProfileStore";
import {useEffect} from "react";
import Button from "@/components/ui/Button";
import {redirect} from "next/navigation";
import {IoAdd} from "react-icons/io5";

export function ProfileContent({ posts }: { posts: PostDetails[] }) {
    const setPosts = useProfileStore(state => state.setPosts);
    const loadedPosts = useProfileStore(state => state.loadedPosts);

    useEffect(() => {
        setPosts(posts);
    }, [posts, setPosts]);

    return <>
        { loadedPosts.map((post: PostDetails) => <EditPostRow post={post} key={post.id}/>) }
        <div className={'w-full px-9'}>
            <Button className={"my-10 sm:w-fit w-full"} onClick={() => redirect('/auth/edit')}> <IoAdd/> New post </Button>
        </div>
    </>
}