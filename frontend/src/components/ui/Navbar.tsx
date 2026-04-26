import Link from "next/link";
import "@/styles/global.css";
import BlogLogo from "@/assets/brand/wah1d-blog-logo.svg";
import BlogLogoSM from "@/assets/brand/w1-icon.svg";
import {MdMenu} from "react-icons/md";
import {createClient} from "@/lib/supabase/server";
import {NavButton} from "@/components/ui/NavButton";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className={"w-full border-neutral border-b-2 flex justify-center sticky top-0 z-50 bg-white"}>
      <div className=" flex justify-between flex-row h-16 w-full max-w-screen-xl pl-9 pr-9 sm:pr-0 items-center">
        <Link href={"/"} className={"hidden sm:flex h-full  items-center"}>
          <BlogLogo width={148} height={24}></BlogLogo>
        </Link>

        <Link href={"/"} className={"sm:hidden h-full flex items-center"}>
          <BlogLogoSM width={36} height={16}></BlogLogoSM>
        </Link>

        <div className={"hidden lg:flex"}>
          <NavButton page={"/contact"} text={"Contact"} />
          <NavButton page={"/portfolio"} text={"Portfolio"} />
          <NavButton page={"/about"} text={"About me"} />
          {user && <NavButton page={"/auth/signout"} text={"Sign out"}/>}
        </div>
        <MdMenu className={"block sm:hidden size-9"}></MdMenu>
      </div>
    </div>
  );
}
