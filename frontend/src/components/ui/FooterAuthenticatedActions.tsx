import Link from "next/link";
import {createClient} from "@/lib/supabase/server";

export async function FooterAuthenticatedActions() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="flex flex-col w-fit space-y-2">
            <p className="text-lg m-0">Control</p>
            {!user && <Link className="text-sm h-6" href={"/login"}>Log in</Link>}
            {user && <>
                <Link className="text-sm h-6" href={"/auth/profile"}>Perfil</Link>
                <Link className="text-sm h-6" href={"/auth/edit"}>Nuevo post</Link>
            </>}
        </div>
    )
}