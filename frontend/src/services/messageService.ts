// services/messageService.ts
import { supabase } from '../lib/supabase';

// Save message service, with destructuring for clear parameters
export async function saveMessage({
    user_id,
    conversation_id,
    content,
    role,
    metadata = {}
}: {
    user_id: string;
    conversation_id: string;
    content: string;
    role: 'user' | 'assistant';
    metadata?: any;
}) {
    const { data, error } = await supabase
        .from('messages')
        .insert([{
            user_id,
            conversation_id,
            content,
            role,
            metadata: {
                ai_model: metadata.ai_model || 'groq-financial-1.0',
                tokens_used: metadata.tokens_used || 0,
                ...metadata
            }
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Get messages for a specific conversation
export async function getMessages(conversationId: string) {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
}

// Paginated messages fetching for large datasets
export async function getMessagesPaginated(
    conversationId: string,
    limit: number = 50,
    startAfter?: string
) {
    let query = supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .limit(limit);

    if (startAfter) {
        query = query.gt('created_at', startAfter);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
}

// Subscribe to new messages in real-time
export function subscribeToMessages(conversationId: string, callback: (message: any) => void) {
    return supabase
        .channel(`messages:${conversationId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`
            },
            (payload) => {
                callback(payload.new);
            }
        )
        .subscribe();
}
