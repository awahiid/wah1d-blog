import {PostDetails} from "@/api";

export async function getPosts(): Promise<PostDetails[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/public`, {
        cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch posts');

    return res.json();
}