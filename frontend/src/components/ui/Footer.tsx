import BrandLogo from "@/assets/brand/wah1d-logo.svg";
import {FooterAuthenticatedActions} from "@/components/ui/FooterAuthenticatedActions";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white p-9">
      <div className="flex flex-col gap-9 w-full max-w-screen-xl mx-auto">
        <div className="flex gap-9">
          <div className="flex flex-col w-fit space-y-2">
            <p className="text-lg text-nowrap">Socials</p>
            <a className="text-sm h-6">GitHub</a>
            <a className="text-sm h-6">LinkedIn</a>
            <a className="text-sm h-6">Instagram</a>
            <a className="text-sm h-6">X</a>
          </div>
          <div className="flex flex-col w-fit space-y-2">
            <p className="text-lg m-0">More</p>
            <a className="text-sm h-6">Portfolio</a>
            <a className="text-sm h-6">About me</a>
          </div>
          <FooterAuthenticatedActions/>
        </div>
        <div className="w-full flex justify-end">
          <BrandLogo className={'h-full'}/>
        </div>
      </div>
    </footer>
  );
}

