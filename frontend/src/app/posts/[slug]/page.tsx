"use client";

import "@/styles/global.css";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostTransition from "@/components/post/PostTransition";
import EditPostHeader from "@/components/editor/EditPostHeader";
import SelectTagsContainer from "@/components/editor/SelectTagsContainer";
import PostContent from "@/components/editor/PostContent";
import usePostStore from "@/stores/usePostStore";
import {PostControllerService} from "@/api";

export default function PostPage() {
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();
  const { initialize } = usePostStore();

  useEffect(() => {
    PostControllerService.getPostBySlug({ path: {slug} }).then(async (post) => {
      if(post == undefined || post.data == undefined) {
        throw new Error("Unable to get post by slug");
      }
      await initialize(post.data, false);
      setLoading(false);
    });
  }, [initialize, slug]);

  return (
    <div className="w-full h-fit overflow-hidden flex flex-col items-center">
      <PostTransition></PostTransition>
      {!loading && (
        <>
          <EditPostHeader />
          <SelectTagsContainer />
          <main className={"w-full max-w-screen-xl flex flex-col justify-center pl-9 pr-9"}>
            <PostContent />
          </main>
        </>
      )}
    </div>
  );
}
