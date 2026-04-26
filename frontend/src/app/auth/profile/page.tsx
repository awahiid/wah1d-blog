import {PostControllerService} from "@/api";
import {ProfileContent} from "@/components/profile/ProfileContent";
import {ProfileNoContent} from "@/components/profile/ProfileNoContent";
import React from "react";

export default async function Page() {
  const response = await PostControllerService.getUserFilteredPosts();
  const posts = response.data?.content || [];

  return (
      <div className={"flex relative flex-col w-full flex-center justify-between min-h-screen h-fit"}>
        {/*<div className={'max-w-7xl border-b border-neutral gap-2 mx-auto w-full py-10 flex items-center'}>*/}
        {/*  <BrandLogo className="h-7"/>*/}
        {/*  <h1 className={'text-4xl'}>Admin panel</h1>*/}
        {/*</div>*/}
        { posts.length === 0 && <ProfileNoContent/> }
        {
            posts.length > 0 &&
            <div className={"flex flex-col w-full mx-auto min-w-[80%] max-w-screen-xl items-center h-fit"}>
              <ProfileContent posts={posts}/>
            </div>
        }
      </div>
  );
}



