"use client";

import PostRow from "@/components/home/PostRow";
import React, {useEffect} from "react";
import {PostDetails} from "@/api";
import useHomeStore from "@/stores/useHomeStore";
import usePostStore from "@/stores/usePostStore";
import useSearchStore from "@/stores/useSearchStore";
import TypeWriterText from "@/components/motions/TypeWriterText";

type PostListProps = {
  posts: PostDetails[];
};

export default function PostList({ posts }: PostListProps) {
  const setPosts = useHomeStore(state => state.setPosts);
  const loadedPosts = useHomeStore(state => state.loadedPosts);
  const tags = usePostStore(state => state.selectedTags);
  const loading = useSearchStore(state => state.loading);

  useEffect(() => {
    if (!tags.length) {
      setPosts(posts);
      return;
    }

    const filtered = posts.filter(post =>
        tags.some(t => post.tags.includes(t))
    );

    setPosts(filtered);
  }, [tags, posts, setPosts]);

  return (
    <>
      { loadedPosts.map((post, index) => (<PostRow key={index} post={post}/>)) }
      { !loading && loadedPosts.length === 0 && <p className={'mx-auto h-72 flex flex-wrap items-center justify-center text-lg text-center gap-9'}>Couldn’t find any posts with those filters <span>(╯︵╰,)</span></p> }
      { loading && <TypeWriterText text={'Loading'} className={'h-72 mx-auto text-lg flex items-center justify-center'} />}
    </>
  );
}
