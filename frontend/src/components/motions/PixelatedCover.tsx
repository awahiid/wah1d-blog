'use client';

import {shuffle} from "@/lib/utils/utils";
import {motion} from "framer-motion";
import {useEffect, useMemo, useState} from "react";
import {useElementSize} from "@/hooks/use-element-size";

const delay = 0.009

export default function PixelatedCover({start}: {start: boolean}) {
    const { ref, size } = useElementSize();

    const rows = 10;
    const cols = (!size.width || !size.height) ? 0 : Math.ceil(size.height / (size.width * 0.1));

    const pixeles = useMemo(() => {
        const arr = Array.from({ length: rows * cols }, (_, i) => i);
        return shuffle(arr);
    }, [rows, cols, size]);

    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(() => {
        if(cols > 0) {
            const totalAnimationDuration = (rows * cols * delay + 0.3) * 1000;

            const finishAnimation = setTimeout(() => {
                setAnimationFinished(true)
            }, totalAnimationDuration);

            return () => clearTimeout(finishAnimation);
        }
    }, [cols, rows, start])

    if(!start) return <motion.div ref={ref} className={"flex flex-wrap inset-0 size-screen mx-auto z-10 absolute bg-neutral overflow-hidden"}></motion.div>

    return !animationFinished && <motion.div ref={ref} className={"flex flex-wrap inset-0 size-screen mx-auto z-10 absolute overflow-hidden"}>
            {pixeles.map((val, i) => (
                <motion.div
                    key={i}
                    initial={{opacity: 1}}
                    animate={{opacity: 0, transition: {delay: val * delay, ease: "easeInOut"}}}
                    className={'bg-neutral aspect-square'}
                    style={{
                        width: '10%',
                        backgroundRepeat: 'no-repeat'
                    }}
                />))
            }
        </motion.div>
}