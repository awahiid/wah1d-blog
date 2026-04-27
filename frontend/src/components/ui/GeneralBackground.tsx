import React from "react";

export function GeneralBackground({children}: { children: React.ReactNode }) {
    return (
        <div className={'w-full bg-neutral relative'}>
            <div className={'absolute inset-0 pattern-grid-white/70 pattern-size-40 pattern-size-30 pattern-thickness-2 pattern-offset-24'}></div>
            <div className={'absolute inset-0 bg-gradient-to-b from-neutral to-transparent'}></div>
            <div className={'max-w-7xl relative mx-auto border border-transparent h-full'}>
                <div className={'max-w-7xl relative mx-auto border border-transparent h-full'}>
                    {children}
                </div>
            </div>
        </div>
    )
}