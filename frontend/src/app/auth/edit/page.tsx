"use client";

import usePostStore from "@/stores/usePostStore";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import TypeWriterText from "@/components/animations/TypeWriterText";

export default function RedirectEdit() {
  const { createPost } = usePostStore();
  const router = useRouter();

  useEffect(() => {
    createPost().then((id) => {
      router.push(`/auth/edit/${id}`);
    });
  }, [createPost, router]);

  return (
    <div className={"w-screen h-screen max-w-screen-2xl flex justify-center items-center"}>
      <TypeWriterText
        text={"Loading"}
        className={"text-2xl"}
      ></TypeWriterText>
    </div>
  );
}
