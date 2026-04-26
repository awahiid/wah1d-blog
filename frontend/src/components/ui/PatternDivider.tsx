import React from "react";

export function PatternDivider({className}: { className: string }) {
    return (
        <div
            className={`${className} w-full h-9 pattern-diagonal-lines pattern-neutral pattern-bg-white pattern-size-2 pattern-opacity-100`}
        />
    );
}