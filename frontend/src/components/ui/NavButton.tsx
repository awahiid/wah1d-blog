import Link from "next/link";

type NavButtonProps = {
    page: string;
    text: string;
    className?: string;
};

export function NavButton({page, text, className = ""}: NavButtonProps) {
    return (
        <button className={"w-36 "}>
            <Link
                href={page}
                className={`${className}h-full after:ease-in-out w-fit after:content-[''] after:h-0.5 after:hover:left-0 after:right-0 after:bottom-0  after:absolute relative hover:after:w-full after:duration-200 after:transition-all after:w-0 after:bg-black after:inline text-center flex flex-col items-center justify-center`}
            >
                {text}
            </Link>
        </button>
    );
}