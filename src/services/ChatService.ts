import { onValue, push, ref, remove } from "firebase/database";
import { db } from "../firebase";
import type { ChatMessage } from "../interfaces";

export const pushMessage = async(message: Omit<ChatMessage, 'id'>) => {
    try {
        await push(ref(db, "messages"), message);
    } catch (error) {
        console.error('Erro ao enviar mensagem', error);
    }
}

export const onMessageUpdate = (callback : (message: ChatMessage[]) => void) => {
    const messagesRef = ref(db, "messages");
    return onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const messagelist: ChatMessage[] = [];
        if (data) {
            Object.entries(data).forEach(([id, value]) => {
                const { id: _, ...rest } = value as ChatMessage;
                messagelist.push({ id, ...rest });
            })
        }
        callback(messagelist);
    });
}

export const deleteMessage = async (id: string) => {
    try {
        await remove(ref(db, `messages/${id}`));
    } catch (error) {
        console.error('Erro ao deletar mensagem', error);
    }
}

export const replyMessage = async (replyMessage: Omit<ChatMessage, 'id'>, replyedMessage: ChatMessage) => {
    try {
        await push(ref(db, "messages"), { ...replyMessage, replyTo: replyedMessage });
    } catch (error) {
        console.error('Erro ao responder mensagem', error);
    }
}