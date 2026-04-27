"use client";

import SelectTagsContainer from "@/components/editor/SelectTagsContainer";
import PostContent from "@/components/editor/PostContent";
import React, { useEffect, useState } from "react";
import EditPostHeader from "@/components/editor/EditPostHeader";
import EditPageTools from "@/components/editor/EditPageTools";
import usePostStore from "@/stores/usePostStore";
import { useParams } from "next/navigation";
import {PostControllerService} from "@/api";
import { motion } from "framer-motion";
import {AddBlockButton} from "@/components/editor/AddBlockButton";

export default function Edit() {
  const initialize = usePostStore(state => state.initialize);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id == "string") {
      PostControllerService.getPostById({path: {id}}).then(async (response) => {
        await initialize(response.data!, true);
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      {loading && <div className={"h-screen"}></div>}

      {!loading && (
        <>
          <motion.div className={"absolute z-10 size-full bg-white"} animate={{opacity: 0, visibility: "hidden"}}></motion.div>
          <EditPostHeader />
          <SelectTagsContainer />
          <main className={ "w-full overflow-x-hidden max-w-screen-xl flex flex-col justify-center pl-9 pr-9"}>
            <PostContent />
          </main>
          <EditPageTools />
          <AddBlockButton/>
        </>
      )}
    </>
  );
}
