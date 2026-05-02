'use client';

import {NavButton} from "@/components/ui/NavButton";
import {createClient} from "@/lib/supabase/client";
import React, {useEffect, useState} from "react";
import {Session} from "@supabase/auth-js";
import useUIStore from "@/stores/useUIStore";
import { motion } from "framer-motion";

export function MenuMobile() {
    const [session, setSession] = useState<Session | null>(null);
    const popup = useUIStore(state => state.activePopup)
    const setActivePopup = useUIStore(state => state.setActivePopup)

    const setPopup = () => setActivePopup(undefined)

    useEffect(() => {
        const supabase = createClient();

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    return (popup === 'menu') && <motion.div className={'sm:hidden bg-neutral h-screen w-screen fixed inset-0 flex flex-col items-center justify-center gap-9 z-20'}>
        <div className={'absolute inset-0 pattern-grid-white/70 pattern-size-40 pattern-size-30 pattern-thickness-2 pattern-offset-24'}></div>
        <div className={'absolute inset-0 bg-gradient-to-b from-neutral to-transparent'}></div>
        <NavButton className={'text-2xl '} page={"/contact"} text={"Contact"} onClick={setPopup}/>
        <NavButton className={'text-2xl'} page={"/portfolio"} text={"Portfolio"} onClick={setPopup}/>
        <NavButton className={'text-2xl'} page={"/about"} text={"About me"} onClick={setPopup}/>
        {session && <NavButton className={'text-2xl'} page={"/auth/signout"} text={"Sign out"} onClick={setPopup}/>}
    </motion.div>
}