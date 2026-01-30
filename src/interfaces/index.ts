export interface ChatMessage {
    id: string;
    text: string;
    userId: string;
    userName: string;
    userPhotoUrl: string
    timestamp: number | object;
    replyTo?: ChatMessage;
}