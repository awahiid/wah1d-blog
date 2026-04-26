'use client'

import useProfileStore from "@/stores/useProfileStore";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";
import Image from "next/image";
import {createImageURL, formatDate} from "@/utils/utils";
import Button from "@/components/ui/Button";
import {MdDelete, MdEdit} from "react-icons/md";
import LightButton from "@/components/ui/LightButton";
import {TbRestore} from "react-icons/tb";
import {IoMdClose} from "react-icons/io";
import React from "react";
import {PostDetails} from "@/api";

type EditPostRowProps = {
    post: PostDetails;
};

export function EditPostRow({post}: EditPostRowProps) {
    const {deletePost, restorePost, purgePost} = useProfileStore();
    const router = useRouter();

    return (
        <motion.div
            className={"flex w-full h-72 max-w-screen-2xl justify-between p-9 bg-gradient-to-r from-transparent via-white to-transparent border-neutral z-10 "}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
        >
            {
                post.covers[0] && (
                    <Image
                        src={createImageURL(post.id, post.covers[0])}
                        alt={"Cover"}
                        width={200}
                        height={200}
                        className="h-full shadow-sm object-cover object-center"
                    />
                )}

            {
                !post.covers[0] && (
                    <div className={"size-60 aspect-square border border-black flex justify-center items-center"}>
                        No cover
                    </div>
                )}

            <div className={"flex flex-col justify-between gap-9"}>
                <div className={'flex flex-col gap-4'}>
                    <p className={'text-sm'}>{post.id}</p>
                    <h1 className={"text-4xl font-semibold max-w-72"}>{post.title}</h1>
                </div>
                <div className={"w-full flex gap-3"}>
                    <Button cursor={true} className={'w-fit py-2 rounded'} onClick={() => router.push(`edit/${post.id}`)}>
                        <MdEdit></MdEdit>
                        Edit
                    </Button>
                </div>
            </div>

            <div className={"flex w-72 flex-col justify-between h-full"}>
                <p className={"max-h-36 overflow-hidden overflow-ellipsis"}>
                    {post.description}
                </p>
                {post.deleted && <p className={"text-red-500"}> Borrado </p>}
                {post.published && <p> Publicado </p>}
            </div>
            <div className={"flex flex-col justify-between items-end gap-2"}>
                <p>{formatDate(new Date(post.createdAt))}</p>
                {
                    !post.deleted &&
                    <LightButton
                        className={"rounded-full  p-4 aspect-square w-fit transition-colors duration-75"}
                        onClick={() => deletePost(post.id)}
                    >
                        <MdDelete></MdDelete>
                    </LightButton>
                }

                {
                    post.deleted && (
                        <div className={"w-fit flex gap-3"}>
                            <LightButton
                                className={"border-neutral rounded-full border p-4 aspect-square w-fit transition-colors duration-75"}
                                onClick={() => restorePost(post.id)}
                            >
                                <TbRestore></TbRestore>
                            </LightButton>
                            <LightButton
                                className={"border-neutral hover:bg-red-500 hover:border-red-500 hover:text-white rounded-full border p-4 aspect-square w-fit transition-colors duration-75"}
                                onClick={() => purgePost(post.id)}
                            >
                                <IoMdClose></IoMdClose>
                            </LightButton>
                        </div>
                    )
                }
            </div>
        </motion.div>
    );
}