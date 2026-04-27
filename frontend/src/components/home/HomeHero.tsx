'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { MdArrowForward, MdArrowOutward } from 'react-icons/md';

import Button from '@/components/ui/Button';
import TitleEditor from '@/components/editor/block-editors/TitleEditor';
import { createImageURL, formatDate } from '@/utils/utils';
import { PostDetails } from "@/api";

export default function HomeHero({post}: {post: PostDetails | undefined}) {
  const router = useRouter();

  const [selectedCover, setSelectedCover] = useState<string>('');
  const [prevCover, setPrevCover] = useState<string | null>(null);

  useEffect(() => {
    if (post?.covers?.length) {
      setSelectedCover(post.covers[0]);
    }
  }, [post]);

  if (!post || !post.covers?.length) return (
      <div className="flex justify-center items-center w-full sm:flex max-h-[660px] h-[40.8rem] ">
        No recent post
      </div>
  );

  const handleCoverChange = () => {
    const currentIndex = post.covers.indexOf(selectedCover);
    const nextIndex = (currentIndex + 1) % post.covers.length;

    setPrevCover(selectedCover);
    setSelectedCover(post.covers[nextIndex]);
  };

  const handleCoverSelect = (cover: string) => {
    setPrevCover(selectedCover);
    setSelectedCover(cover);
  };

  return (
      <div className="h-fit w-full p-9 sm:flex justify-center">
        <motion.header
            className="flex-col-reverse sm:flex-row w-full max-w-screen-xl h-[36.3rem] flex"
            initial={{ scale: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full md:p-0 flex flex-col justify-end gap-6 border-neutral">
            <TitleEditor content={post.title} editable={false} onEdit={() => {}} />

            <p className="flex flex-col-reverse sm:flex-row gap-9">
            <span className="hidden sm:block sm:max-w-36">
              {formatDate(new Date(post.createdAt))}
            </span>
              <span className="w-full sm:max-w-[60%]">{post.description}</span>
            </p>

            <Button
                className="sm:gap-6 sm:hover:gap-9"
                onClick={() => router.push(`/posts/${post.slug}`)}
            >
              Read more <MdArrowOutward />
            </Button>
          </div>

          <div className="w-full h-full p-9 relative">
            <AnimatePresence mode="wait">
              {prevCover && (
                  <motion.img
                      key={`prev-${prevCover}`}
                      src={createImageURL(post.id, prevCover)}
                      alt="Previous cover"
                      className="absolute inset-0 w-full h-full object-cover border-neutral"
                      initial={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                  />
              )}
            </AnimatePresence>

            <motion.img
                key={`selected-${selectedCover}`}
                src={createImageURL(post.id, selectedCover)}
                alt="Actual cover"
                className="absolute inset-0 w-full h-full object-cover border-neutral"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            />

            <MdArrowForward
                onClick={handleCoverChange}
                className="block sm:hidden rounded-full active:scale-95 duration-75 absolute bottom-9 right-9 mix-blend-exclusion bg-white z-10 size-12"
            />

            <div className="hidden sm:flex absolute bottom-0 right-0 gap-9 p-9">
              {post.covers
                  .filter(cover => cover !== selectedCover)
                  .map((cover) => (
                      <motion.img
                          key={cover}
                          src={createImageURL(post.id, cover)}
                          alt="Cover"
                          onClick={() => handleCoverSelect(cover)}
                          className="h-20 w-20 object-cover cursor-pointer"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                      />
                  ))}
            </div>
          </div>
        </motion.header>
      </div>
  );
}