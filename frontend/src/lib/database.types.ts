// database.types.ts
export type Message = {
    id: string;
    conversation_id: string;
    role: "user" | "assistant";
    content: string;
    created_at: string;
    timestamp?: Date; // Used for UI display
};

export type Conversation = {
    id: string;
    user_id?: string;
    title: string;
    summary: string;
    created_at: string;
    updated_at: string;
};

export type ConversationInput = {
    user_id: string;
    title: string;
    summary: string;
};

export type MessageInput = {
    conversation_id: string;
    role: "user" | "assistant";
    content: string;
};