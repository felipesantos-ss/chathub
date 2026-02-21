import { Button, Flex, Input } from "antd";
import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import type { ChatMessage } from "../interfaces";
import Content from "./Content";
import { useAuth } from "../hooks/useAuth";
import { pushMessage } from "../services/ChatService";
import { serverTimestamp } from "firebase/database";

const Chat = () => {
    const [text, setText] = useState<string>("");
    const { user } = useAuth();
    const sendMessage = async() => {
        if(!text.trim()) return;
        if(!user) return;
        const message: Omit<ChatMessage, 'id'> = {
            text,
            userId: user.uid,
            userName: user.displayName?.split(" ")[0] ?? "",
            userPhotoUrl: user.photoURL ?? "",
            timestamp: serverTimestamp()
        }
        await pushMessage(message);
        setText("");
        console.log(message);
    }
    return(
        <Flex
        vertical
        style={{
            height: "100vh",
            background: "var(--color-background)",
        }}
        >

            <Flex
                vertical
                style={{
                    flex: 1,
                    width: "100%",
                    maxWidth: "720px",
                    margin: "20px auto",
                    background: "var(--color-background-secondary)",
                    borderRadius: 18,
                    padding: 24,
                    boxShadow: "0 20px 40px var(--color-background-primary)",
                }}
            >

            <Flex 
                style={{ 
                    flex: 1,
                    overflowY: "auto",
                    paddingRight: 8
                }}
                className="chat-scroll"
            >
                    <Content />  
            </Flex>
                <Flex
                    gap={12}
                    align="center"
                    style={{
                        marginTop: 16,
                        paddingTop: 16,
                        borderTop: "1px solid var(--color-border-primary)"
                    }}
    >
                    <Input
                        variant="borderless"
                        placeholder="Digite sua mensagem..."
                        value={text}
                        disabled={!user}
                        onChange={e => setText(e.target.value)}
                        onPressEnter={sendMessage}
                        style={{
                            backgroundColor: "var(--color-background-secondary)",
                            color: "var(--color-text-primary)",
                            backdropFilter: "blur(6px)",
                            padding: "10px 20px",
                            borderRadius: 10,
                            height: 44
                        }}
                        className="custom-input"
                    />
                    <Button
                    icon={<SendOutlined />}
                    disabled={!user}
                    onClick={sendMessage}
                    style={{
                        color: "var(--color-text-primary)",
                        border: "2px solid var(--color-border-secondary)",
                        background: "var(--color-background-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        width: 44,
                        height: 44,
                        padding: 0
                    }}
                    />
                </Flex>
            </Flex>
    </Flex>
    );
}

export default Chat


