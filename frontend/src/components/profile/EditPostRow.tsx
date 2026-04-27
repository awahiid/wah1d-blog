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
            className={"flex sm:flex-row border-b-2 sm:gap-9 gap-3 flex-col w-full sm:h-72 max-w-screen-2xl justify-between p-9 bg-gradient-to-r from-transparent via-white to-transparent border-neutral z-10 "}
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
                        className="sm:h-full relative sm:w-fit w-full shadow-sm object-cover object-center"
                    />
                )}

            {
                !post.covers[0] && (
                    <div className={"sm:size-60 relative aspect-square border border-black flex justify-center items-center"}>
                        No cover
                    </div>
                )
            }

            <div className={"flex flex-col justify-between gap-9"}>
                <div className={'flex flex-col gap-4'}>
                    <p className={'text-sm hidden sm:block '}>{post.id}</p>
                    <p className={' sm:hidden'}>{formatDate(new Date(post.createdAt))}</p>
                    <h1 className={"text-4xl font-semibold max-w-72"}>{post.title}</h1>
                </div>
                <div className={"hidden sm:flex w-full gap-3"}>
                    <Button cursor={true} className={'w-full py-2'} onClick={() => router.push(`edit/${post.id}`)}>
                        <MdEdit></MdEdit>
                        Edit
                    </Button>
                </div>
            </div>

            <div className={"flex w-72 flex-col justify-between h-full"}>
                <p className={"max-h-36 overflow-hidden overflow-ellipsis"}>
                    {post.description}
                </p>
                {post.deleted && <p className={"text-red-500 hidden sm:block"}> Deleted </p>}
                {post.published && <p className={'hidden bottom-0 sm:block'}> Published </p>}
            </div>

            <div className={"flex flex-col justify-between sm:items-end sm:gap-2 gap-3"}>
                <p className={'hidden sm:block'}>{formatDate(new Date(post.createdAt))}</p>
                {
                    !post.deleted &&
                    <LightButton
                        className={"sm:rounded-full sm:w-fit gap-4 p-4 aspect-square w-full sm:border-none border transition-colors duration-75"}
                        onClick={() => deletePost(post.id)}
                    >
                        <MdDelete/>
                    </LightButton>
                }

                {
                    post.deleted && (
                        <div className={"sm:w-fit flex gap-3"}>
                            <LightButton
                                className={"border-neutral w-full sm:rounded-full border p-4 aspect-square sm:w-fit transition-colors duration-75"}
                                onClick={() => restorePost(post.id)}
                            >
                                <TbRestore></TbRestore>
                            </LightButton>
                            <LightButton
                                className={"border-neutral w-full hover:bg-red-500 hover:border-red-500 hover:text-white sm:rounded-full border p-4 aspect-square sm:w-fit transition-colors duration-75"}
                                onClick={() => purgePost(post.id)}
                            >
                                <IoMdClose></IoMdClose>
                            </LightButton>
                        </div>
                    )
                }
            </div>

            <div className={" sm:hidden w-full gap-3"}>
                <Button cursor={true} className={'w-full '} onClick={() => router.push(`edit/${post.id}`)}>
                    <MdEdit/>
                    Edit
                </Button>
            </div>
        </motion.div>
    );
}