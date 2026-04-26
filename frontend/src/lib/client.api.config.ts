import { client } from '@/api/client.gen'
import { createClient as createBrowserClient } from '@/lib/supabase/client'

export async function getAccessToken() {
    const supabase = createBrowserClient()
    const { data: userData, error } = await supabase.auth.getUser()

    if (!error && userData?.user) {
        const { data } = await supabase.auth.getSession()
        return data.session?.access_token ?? ''
    }

    return ''
}

client.interceptors.request.use(async (req) => {
    const token = await getAccessToken()

    if (token) {
        req.headers.set('Authorization', `Bearer ${token}`)
    }

    return req
})