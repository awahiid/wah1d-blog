import { client } from '@/api/client.gen'
import { createClient as createServerClient } from '@/lib/supabase/server'

export async function getAccessToken() {
    if (typeof window === 'undefined') {
        const supabase = await createServerClient()

        const { data } = await supabase.auth.getSession()
        return data.session?.access_token ?? ''
    }
}

client.interceptors.request.use(async (req) => {
    const token = await getAccessToken()

    if (token) {
        req.headers.set('Authorization', `Bearer ${token}`)
    }

    return req
})