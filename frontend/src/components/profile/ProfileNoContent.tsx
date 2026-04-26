'use client';

import Button from "@/components/ui/Button";
import {useRouter} from "next/navigation";
import {IoAdd} from "react-icons/io5";

export function ProfileNoContent(){
    const router = useRouter();

    return (
        <div className={"h-screen w-full flex flex-col justify-center gap-9 items-center"}>
            <p>No posts</p>
            <Button onClick={() => router.push('/auth/edit')}> <IoAdd/> New post </Button>
        </div>
    )
}