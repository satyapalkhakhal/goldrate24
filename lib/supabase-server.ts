import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side Supabase instance with service role key
// Bypasses RLS — use only in API routes and server components
export function createServerClient() {
    return createClient(supabaseUrl, supabaseServiceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}
