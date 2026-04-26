'use client'

import {createClient} from "@/lib/supabase/client";
import React, {useState} from "react";
import BrandLogo from "@/assets/brand/wah1d-logo.svg";
import Button from "@/components/ui/Button";
import {GeneralBackground} from "@/components/ui/GeneralBackground";
import {Card} from "@/components/ui/Card";

export function LoginForm(){
    const supabase = createClient()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            return
        }

        window.location.href = '/'
    }

    return (
        <GeneralBackground>
            <Card>
                <div className={'flex items-baseline gap-2'}>
                    <BrandLogo className="h-3 text-black"  />
                    <h1>Login.</h1>
                </div>
                <form onSubmit={handleLogin} className={'flex flex-col gap-10'}>
                    <label className={'flex flex-col gap-2'}>Email
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={'p-2 w-full border border-neutral'}
                        />
                    </label>

                    <label className={'flex flex-col gap-2'}>Password
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={'p-2 w-full border border-neutral'}
                        />
                    </label>

                    <Button className={'w-full mt-20'} type="submit">Login</Button>

                    {error && <p className={'text-red-500 mx-auto'}>{error}</p>}
                </form>
            </Card>
        </GeneralBackground>
    )
}