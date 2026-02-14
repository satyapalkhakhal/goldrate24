import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase instance (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to create an authenticated client with a user's session
export function createAuthClient(accessToken: string) {
    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    });
}

// Storage bucket name for article images
export const STORAGE_BUCKET = 'article-images';

// Get public URL for a storage file
export function getStorageUrl(path: string): string {
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return data.publicUrl;
}
