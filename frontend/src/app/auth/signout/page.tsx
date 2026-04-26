'use client'

import {createClient} from "@/lib/supabase/client";
import React from "react";
import BrandLogo from "@/assets/brand/wah1d-logo.svg";
import Button from "@/components/ui/Button";
import { useRouter } from 'next/navigation'
import {GeneralBackground} from "@/components/ui/GeneralBackground";
import {Card} from "@/components/ui/Card";

export default function SignOutPage(){
    const supabase = createClient()
    const router = useRouter()

    return (
        <GeneralBackground>
            <Card>
                <div className={'flex gap-3 items-baseline'}>
                    <BrandLogo className="h-4 text-black border-primary"/>
                    Sign out.
                </div>
                <p>Do you really want to sign out?</p>
                <div className={"flex gap-2 mt-20"}>
                    <Button className={'w-full bg-secondary text-primary border border-primary'} onClick={() => router.push('/')}>Return</Button>
                    <Button onClick={async () => {
                        await supabase.auth.signOut()
                        router.refresh();
                    }} className={'w-full'}>Sign out</Button>
                </div>
            </Card>
        </GeneralBackground>
    )
}