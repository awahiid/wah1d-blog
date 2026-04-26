import Button from "@/components/ui/Button";
import React from "react";

export function ProfileTools() {
    return (
        <div className="w-full z-10 max-w-screen-xl fixed bottom-0 mb-2 bg-neutral bg-opacity-50 border-neutral rounded-full overflow-hidden backdrop-blur-md">
            <div className="p-2 h-full flex gap-2 justify-between items-center backdrop-blur-lg">
                <Button className={"rounded-full px-9"}></Button>
                <div className={"flex gap-2"}>
                    <Button className={"rounded-full px-9"}>Borrados</Button>
                    <Button className={"rounded-full px-9"}>Publicados</Button>
                    <Button className={"rounded-full px-9"}>Todos</Button>
                </div>
            </div>
        </div>
    );
}
