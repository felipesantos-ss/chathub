import { Flex, List, Typography, Avatar, Dropdown } from "antd"
import { Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReplyModal from "./ReplyModal";
import DeleteModal from "./DeleteModal";
import { deleteMessage, onMessageUpdate } from "../services/ChatService";
import { useAuth } from "../hooks/useAuth";
import type { ChatMessage } from "../interfaces";
import { formatTimeStamp } from "../utils/formatTimeStamp";

const Content = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);
    
    const handleDelete = async (id: string) => {
        await deleteMessage(id);
    }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onMessageUpdate((msg) => {
            setMessages(msg);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const endRef = useRef<HTMLDivElement>(null);
    useEffect(() => { 
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return(
        <List 
            dataSource={messages}
            split={false}
            loading={loading}
            style={{ width: "100%" }}
            renderItem={(msg) => {
                const isOwn = msg.userId === user?.uid;
                const menuItems: any[] = [];
                
                if(!isOwn){
                    menuItems.push({
                        key: "reply",
                        label: <ReplyModal msg={msg}/>
                    })
                } else {
                    menuItems.push({
                        key: "delete",
                        label: <DeleteModal onConfirm={() => handleDelete(msg.id)} message={msg.text}/>
                    }) 
                }

                return(
                    <List.Item style={{ 
                        display:"flex", 
                        justifyContent: isOwn ? "flex-end" : "flex-start",
                        padding: "8px 0",
                        border: "none"
                    }}>
                        <Flex 
                            vertical 
                            align={isOwn ? "end" : "start"} 
                            style={{ maxWidth: "85%", position: "relative" }}
                            className="message-bubble"
                        >
                            {!isOwn && (
                                <Typography.Text style={{ 
                                    fontSize: "11px", 
                                    color: "var(--color-text-primary)", 
                                    marginBottom: "4px",
                                    marginLeft: "4px"
                                }}>
                                    {msg.userName}
                                </Typography.Text>
                            )}

                            <Flex align="start" gap={8} style={{ flexDirection: isOwn ? "row-reverse" : "row" }}>
                                <Avatar size={32} src={msg.userPhotoUrl} style={{ marginTop: "4px", border: "1px solid var(--color-border-primary)" }} />
                                
                                <Flex vertical align={isOwn ? "end" : "start"}>
                                    <div style={{ 
                                        background:"var(--color-primary)",
                                        padding: "10px 14px",
                                        borderRadius: isOwn ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                                        color: "var(--color-text-primary)",
                                        position: "relative",
                                        border: isOwn ? "none" : "1px solid var(--color-border)"
                                    }}>
                                        {/* Reply Content */}
                                        {msg.replyTo && (
                                            <div style={{ 
                                                background: "var(--color-background-secondary)",
                                                borderLeft: "3px solid var(--color-primary)",
                                                padding: "6px 10px",
                                                borderRadius: "4px",
                                                marginBottom: "8px",
                                                fontSize: "12px"
                                            }}>
                                                <Typography.Text style={{ color: "var(--color-primary)", fontWeight: 600, display: "block", fontSize: "11px" }}>
                                                    {msg.replyTo.userName}
                                                </Typography.Text>
                                                <Typography.Text style={{ color: "var(--color-text-secondary)", fontSize: "12px" }}>
                                                    {msg.replyTo.text}
                                                </Typography.Text>
                                            </div>
                                        )}

                                        <Typography.Text style={{ color: "inherit", fontSize: "14px", lineHeight: "1.5" }}>
                                            {msg.text}
                                        </Typography.Text>

                                        {/* Dropdown Actions */}
                                        {user && (
                                            <div style={{ position: "absolute", top: "4px", right: isOwn ? "auto" : "-24px", left: isOwn ? "-24px" : "auto" }}>
                                                <Dropdown menu={{items: menuItems}} trigger={["click"]} placement="bottom" arrow>
                                                    <Ellipsis size={16} style={{ color: "var(--color-text-primary)", cursor: "pointer" }} />
                                                </Dropdown>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <Typography.Text style={{ 
                                        fontSize: "10px", 
                                        color: "var(--color-text-primary)",
                                        marginTop: "4px" 
                                    }}>
                                        {formatTimeStamp(msg.timestamp)}
                                    </Typography.Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </List.Item>
                );
            }}
        >
            <div ref={endRef}/>
        </List>
    );
}

export default Content;
