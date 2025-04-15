// hooks/useChat.js
import { useState, useEffect, useCallback } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export function useChat() {
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all conversations on component mount
    useEffect(() => {
        fetchConversations();
    }, []);

    // Fetch all conversations
    const fetchConversations = async () => {
        console.log('Fetching all conversations...');
        setIsLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/conversations`);
            console.log('Conversations response status:', response.status);

            if (!response.ok) {
                throw new Error(`Failed to fetch conversations: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched conversations:', data);
            setConversations(data);
        } catch (error) {
            console.error('Error fetching conversations:', error);
            setError('Failed to load conversations. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Select a conversation and load its messages
    const selectConversation = useCallback(async (conversationId) => {
        console.log(`Selecting conversation with ID: ${conversationId}`);
        setIsLoadingMessages(true);

        try {
            // First, fetch the conversation details
            console.log(`Fetching conversation details for ID: ${conversationId}`);
            const conversationResponse = await fetch(`${BACKEND_URL}/api/conversations/${conversationId}`);
            console.log('Conversation details response status:', conversationResponse.status);

            if (!conversationResponse.ok) {
                throw new Error(`Failed to fetch conversation: ${conversationResponse.status}`);
            }

            const conversationData = await conversationResponse.json();
            console.log('Fetched conversation details:', conversationData);

            // Then, fetch messages for this conversation
            console.log(`Fetching messages for conversation ID: ${conversationId}`);
            const messagesResponse = await fetch(`${BACKEND_URL}/api/conversations/${conversationId}/messages`);
            console.log('Messages response status:', messagesResponse.status);

            if (!messagesResponse.ok) {
                throw new Error(`Failed to fetch messages: ${messagesResponse.status}`);
            }

            const messagesData = await messagesResponse.json();
            console.log('Fetched messages:', messagesData);
            console.log(`Loaded ${messagesData.length} messages for conversation ID: ${conversationId}`);

            // Update states
            setCurrentConversation(conversationData);
            setMessages(messagesData);

            return conversationData;
        } catch (error) {
            console.error('Error selecting conversation:', error);
            setError(`Failed to load conversation: ${error.message}`);
            throw error;
        } finally {
            setIsLoadingMessages(false);
        }
    }, []);

    // Start a new conversation
    const startNewConversation = async (title) => {
        console.log('Starting new conversation with title:', title);
        setIsLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/api/conversations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });

            console.log('New conversation response status:', response.status);

            if (!response.ok) {
                throw new Error(`Failed to create conversation: ${response.status}`);
            }

            const conversationData = await response.json();
            console.log('Created new conversation:', conversationData);

            // Add the new conversation to our list and select it
            setConversations(prev => [conversationData, ...prev]);
            setCurrentConversation(conversationData);
            setMessages([]);

            return conversationData;
        } catch (error) {
            console.error('Error creating conversation:', error);
            setError('Failed to create conversation. Please try again.');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Send a message
    const sendMessage = async (userMessage, aiResponse) => {
        console.log('Sending message in conversation:', currentConversation?.id);
        if (!currentConversation) {
            console.error('No active conversation to send message to');
            return;
        }

        try {
            // Add user message
            console.log('Adding user message:', userMessage);
            const userMessageResponse = await fetch(`${BACKEND_URL}/api/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversation_id: currentConversation.id,
                    role: 'user',
                    content: userMessage,
                }),
            });

            console.log('User message response status:', userMessageResponse.status);

            if (!userMessageResponse.ok) {
                throw new Error(`Failed to add user message: ${userMessageResponse.status}`);
            }

            const userMessageData = await userMessageResponse.json();
            console.log('Added user message:', userMessageData);

            // Add AI response
            console.log('Adding AI response:', aiResponse);
            const aiMessageResponse = await fetch(`${BACKEND_URL}/api/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversation_id: currentConversation.id,
                    role: 'assistant',
                    content: aiResponse,
                }),
            });

            console.log('AI message response status:', aiMessageResponse.status);

            if (!aiMessageResponse.ok) {
                throw new Error(`Failed to add AI message: ${aiMessageResponse.status}`);
            }

            const aiMessageData = await aiMessageResponse.json();
            console.log('Added AI message:', aiMessageData);

            // Update messages in state with the newly created messages
            setMessages(prevMessages => [
                ...prevMessages.filter(msg => msg.id !== 'temp-' + new Date().getTime()),
                userMessageData,
                aiMessageData
            ]);

            return { userMessage: userMessageData, aiMessage: aiMessageData };
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message. Please try again.');
            throw error;
        }
    };

    // Delete a conversation
    const deleteConversation = async (conversationId) => {
        console.log(`Deleting conversation with ID: ${conversationId}`);

        try {
            const response = await fetch(`${BACKEND_URL}/api/conversations/${conversationId}`, {
                method: 'DELETE',
            });

            console.log('Delete conversation response status:', response.status);

            if (!response.ok) {
                throw new Error(`Failed to delete conversation: ${response.status}`);
            }

            // Update local state
            setConversations(prev => prev.filter(conv => conv.id !== conversationId));

            // If we deleted the current conversation, reset current conversation
            if (currentConversation?.id === conversationId) {
                console.log('Deleted the current conversation, resetting current conversation and messages');
                setCurrentConversation(null);
                setMessages([]);
            }

            return true;
        } catch (error) {
            console.error('Error deleting conversation:', error);
            setError('Failed to delete conversation. Please try again.');
            throw error;
        }
    };

    return {
        conversations,
        currentConversation,
        messages,
        isLoading,
        isLoadingMessages,
        error,
        selectConversation,
        startNewConversation,
        sendMessage,
        deleteConversation,
        setMessages,
    };
}