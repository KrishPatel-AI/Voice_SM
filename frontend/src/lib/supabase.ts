// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);


// Or if you want to use a static user ID approach
export async function getStaticUserSession(userId: string) {
    // This is for testing/development only
    // In production, you should use proper authentication
    return { userId };
}