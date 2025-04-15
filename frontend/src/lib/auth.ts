// lib/auth.ts
import { supabase } from './supabase';

// Function to set Supabase auth with Clerk token
export async function setSupabaseAuth(clerkToken: string) {
    if (!clerkToken) return;

    const { data, error } = await supabase.auth.setSession({
        access_token: clerkToken,
        refresh_token: '',
    });

    if (error) {
        console.error('Error setting Supabase auth:', error);
    }

    return data;
}

// Hook for authenticated Supabase client
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export function useSupabaseAuth() {
    const { getToken } = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const setupAuth = async () => {
            const token = await getToken({ template: 'supabase' });
            if (token) {
                await setSupabaseAuth(token);
            }
            setIsLoaded(true);
        };

        setupAuth();
    }, [getToken]);

    return { isLoaded };
}