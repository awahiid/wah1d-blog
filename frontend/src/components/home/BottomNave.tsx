import RoundedButton from "@/components/ui/RoundedButton";
import {MdEdit} from "react-icons/md";
import React from "react";

export function BottomNav() {
    return (
        <div className="sm:hidden flex items-center p-3 gap-3 rounded-full fixed bottom-3 left-3 right-3 bg-neutral50 backdrop-blur-md bg-opacity-[68%] z-10">
            <RoundedButton>Diarios</RoundedButton>
            <RoundedButton>Código</RoundedButton>
            <RoundedButton className="ml-auto">
                <MdEdit/>
            </RoundedButton>
        </div>
    );
}