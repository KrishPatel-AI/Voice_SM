// conversationService.ts
import { supabase } from '../lib/supabase';
import { Conversation, ConversationInput } from '../lib/database.types';
import { useUser } from '@clerk/clerk-react';

// Create a new conversation
export async function createConversation(data: Omit<ConversationInput, 'user_id'>): Promise<Conversation> {



    // const { data: { user }, error: userError } = await supabase.auth.getUser();

    // if (userError || !user) {
    //     console.error('Error fetching user:', userError);
    //     throw userError;
    // }

    const { data: conversation, error } = await supabase
        .from('conversations')
        .insert({
            ...data
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating conversation:', error);
        throw error;
    }

    return conversation;
}


// Get all conversations for the current user
export async function getConversations(): Promise<Conversation[]> {
    const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('updated_at', { ascending: false });

    if (error) {
        console.error('Error fetching conversations:', error);
        throw error;
    }

    return data || [];
}

// Get a specific conversation by ID
export async function getConversation(id: string): Promise<Conversation | null> {
    const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            // Record not found
            return null;
        }
        console.error('Error fetching conversation:', error);
        throw error;
    }

    return data;
}

// Update a conversation
export async function updateConversation(
    id: string,
    updates: Partial<ConversationInput>
): Promise<Conversation> {
    const { data, error } = await supabase
        .from('conversations')
        .update({
            ...updates,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating conversation:', error);
        throw error;
    }

    return data;
}

// Delete a conversation
export async function deleteConversation(id: string): Promise<void> {
    const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting conversation:', error);
        throw error;
    }
}