"use client";

import "@/styles/global.css";
import React, {useEffect, useRef, useState} from "react";
import { useParams } from "next/navigation";
import EditPostHeader from "@/components/editor/EditPostHeader";
import SelectTagsContainer from "@/components/editor/SelectTagsContainer";
import PostContent from "@/components/editor/PostContent";
import usePostStore from "@/stores/usePostStore";
import {PostControllerService} from "@/api";
import PixelatedCover from "@/components/motions/PixelatedCover";

export default function PostPage() {
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();
  const { initialize } = usePostStore();
  const [trigger, setTrigger] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loading) {
      setTrigger(true);
    }
  }, [loading]);

  useEffect(() => {
    PostControllerService.getPostBySlug({ path: {slug} }).then(async (post) => {
      if(post == undefined || post.data == undefined) {
        throw new Error("Unable to get post by slug");
      }
      await initialize(post.data, false);
      setLoading(false);
    });
  }, [initialize, slug]);

  return <>
      <PixelatedCover start={trigger} duration={1}/>
      <div className="w-full overflow-hidden flex flex-col items-center relative">
        {!loading && (
          <>
            <EditPostHeader />
            <SelectTagsContainer />
            <main   ref={ref} className={"w-full max-w-screen-xl flex flex-col justify-center pl-9 pr-9"}>
              <PostContent />
            </main>
          </>
        )}
        { loading &&  <div className={'h-screen'}></div> }
      </div>
    </>
}
