'use client';
import Button from '@/components/ui/Button';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { MdArrowOutward } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import {createImageURL, formatDate} from '@/utils/utils';
import {PostDetails} from "@/api";

type PostProps = {
  post: PostDetails;
};

export default function PostRow({ post }: PostProps) {
  const router = useRouter();
  return (
      <div className={'flex flex-center'}>
        <div className={'relative mx-auto max-w-7xl h-72 border-b border-neutral hidden sm:flex w-full py-9  gap-9 justify-between '}>
          <div className={'max-w-72 flex flex-row-reverse gap-9 items-center'}>
            <PostRowCover urls={post.covers.map(cover => createImageURL(post.id, cover))}/>
          </div>
          <div className={'flex flex-col w-72 min-h-0'}>
            <h2 className={'z-10 text-3xl font-semibold h-fit bg-none bg-clip-text pointer-events-none'}>
              {post.title}
            </h2>
            <p className={'break-words mt-auto leading-6 line-clamp-4'}>{post.description}</p>
          </div>
          <div className={'flex flex-col h-full justify-end gap-9 w-72 items-end '}>

            <p className={'h-fit text-nowrap'}>
              {formatDate(new Date(post.createdAt))}
            </p>
            <p className={'flex gap-2 mb-auto h-full'}>
              {post.tags.map(tag => (<span key={tag} className={'rounded-full h-fit border border-neutral p-2 bg-white text-sm text-nowrap'}>{tag}</span>))}
            </p>
            <Button onClick={() => router.push(`posts/${post.slug}`)} className={'h-24'}>
              Read
              <MdArrowOutward></MdArrowOutward>
            </Button>
          </div>
        </div>

        {/*Para moviles */}
        <div className={'sm:hidden relative w-full h-fit flex flex-col border-b-2 border-neutral'} onClick={() => router.push(`posts/${post.slug}`)}>
          <img
              src={createImageURL(post.id, post.covers[0])}
              alt={'Cover post'}
              className={cn(
                  'h-64 w-full object-cover object-center duration-200 cursor-pointer ease-in-out',
              )}
          />
          <div className={'flex flex-col gap-6 p-9'}>
            {formatDate(new Date(post.createdAt))}
            <div className={'flex justify-between items-baseline'}>
              <h2 className={ 'flex justify justify-between text-2xl max-w-full font-semibold z-10 bg-none bg-clip-text pointer-events-none'}>
                {post.title}
              </h2>
              {/*<Button*/}
              {/*    className={'size-fit p-0'}*/}
              {/*>*/}
              {/*  Read <MdArrowOutward className={'pointer-events-none size-9'} />*/}
              {/*</Button>*/}
            </div>
            <p className={'line-clamp-6'}>{post.description}</p>
          </div>
        </div>
      </div>
  );
}

type PostRowCoverProps = {
  urls: string[];
};

type Cover = {
  index: number;
  url: string;
  selected: boolean;
};

function PostRowCover({ urls }: PostRowCoverProps) {
  const [covers, setCovers] = useState<Cover[]>([]);
  const [selected, setSelected] = useState(0);
  const [translate, setTranslate] = useState(0);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTranslate(getTranslate());
  }, [selected]);

  useEffect(() => {
    setCovers(
      urls.map((url, index) => ({
        index: index,
        url: url,
        selected: index === 0,
      })),
    );
  }, []);

  const handleClick = (index: number) => {
    setSelected(index);
    setCovers((prev) =>
      prev.map((cover) => {
        return {
          ...cover,
          selected: cover.index === index,
        };
      }),
    );
  };

  const getTranslate = () => {
    if (!imgRefs.current[selected]) return 0;
    let totalWidth = 0;

    let gap = 0;

    if (containerRef.current) {
      const style = window.getComputedStyle(containerRef.current);
      gap = parseFloat(style.columnGap || style.gap || '0');
    }

    for (let i = selected - 1; i >= 0; i--) {
      totalWidth += (imgRefs.current[i]?.width || 0) + gap;
    }

    return totalWidth;
  };

  return (
    <div ref={containerRef} className="flex flex-row-reverse gap-9 w-72 h-full ">
      {covers.map((cover, index) => (
        <img
          key={index}
          ref={(el) => {
            imgRefs.current[index] = el;
          }}
          src={cover.url}
          alt={'Cover post'}
          onClick={() => handleClick(index)}
          className={cn(
            'object-cover object-right-top duration-200 cursor-pointer ease-in-out ',
            cover.selected
              ? 'right-0 relative'
              : 'opacity-50 hover:opacity-100',
          )}
          style={{ transform: `translateX(${translate}px)` }}
        />
      ))}
    </div>
  );
}
