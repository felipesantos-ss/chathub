import { Button, Flex, Input, Typography } from "antd";
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
            flex: 1,
            background: "var(--color-background)",
            overflow: "hidden",
            padding: "20px 0"
        }}
        >

            <Flex
                vertical
                style={{
                    flex: 1,
                    width: "100%",
                    maxWidth: "720px",
                    margin: "0 auto",
                    background: "var(--color-background-secondary)",
                    borderRadius: 18,
                    padding: "24px 24px 16px 24px",
                    boxShadow: "0 20px 40px var(--color-background-primary)",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0, 
                }}
            >

            <Flex 
                vertical
                style={{ 
                    flex: 1,
                    overflowY: "auto",
                    paddingRight: 8,
                    minHeight: 0,
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
                        borderTop: "1px solid var(--color-border-primary)",
                        flexShrink: 0 
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
        <Flex 
            justify="center" 
            style={{ 
                padding: '16px 0 8px 0', 
                borderTop: '1px solid var(--color-border-primary)', 
                marginTop: '8px',
                flexShrink: 0
        }}
        >
        <a 
            href="https://github.com/felipesantos-ss" 
            target="_blank" 
            rel="noreferrer" 
            style={{ textDecoration: 'none' }}
        > 
            <Typography.Text 
                style={{ 
                    fontSize: '11px', 
                    letterSpacing: '1.5px', 
                    textTransform: 'uppercase', 
                    color: 'var(--color-text-primary)', 
                    fontWeight: 500
                }}
            >
                <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>Felipe Santos</span> 
                <span style={{ margin: '0 8px', opacity: 0.3 }}>|</span> 
                Full Stack Developer
            </Typography.Text>
        </a>

        </Flex>

    </Flex>
    );
}

export default Chat
