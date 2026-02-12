import { Flex, List, Space, Typography, Avatar, Dropdown } from "antd"
import { Ellipsis, MessageCircleReply, MessageCircleX } from "lucide-react";

const Content = () => {
    const user = {
        uid:'01'
    }
    const messages = [
        {
            id: '01',
            text: "Oi",
            userId: "01",
            userName: "Felipe",
            userPhotoUrl: "https://github.com/felipesantos-ss.png",
            timestamp: new Date(),
        },
        {
            id: '02',
            text: "Olá!",
            userId: "02",
            userName: "Santos",
            userPhotoUrl: "https://github.com/felipesantos-ss.png",
            timestamp: new Date(),
            replyTo: {
                id: '01',
                text: "Olá",
                userId: "01",
                userName: "Felipe",
                userPhotoUrl: "https://github.com/felipesantos-ss.png",
                timestamp: new Date(),
            }
        },
        {
            id: '03',
            text: "Testando",
            userId: "01",
            userName: "Felipe",
            userPhotoUrl: "https://github.com/felipesantos-ss.png",
            timestamp: new Date(),
        }
    ]
    return(
        <List 
            dataSource={messages}
            split={false}
            style={{ 
                width: "100%",
            }}
            renderItem={(msg) => {
                const menuItems = [];
                if(msg.userId !== user.uid){
                    menuItems.push({
                        key: "reply",
                        label:  <Flex align="center" gap={2} style={{cursor: "pointer"}}>
                                    <MessageCircleReply size={20} color="var(--color-primary)"/>
                                    <Typography style={{color: "var(--color-text-secondary)"}}>Responder</Typography>
                                </Flex>
                    })
                }

                if(msg.userId === user.uid){
                    menuItems.push({
                        key: "delete",
                        label:  <Flex align="center" gap={2}>
                                    <MessageCircleX size={20} color="var(--color-error)"/>
                                    <Typography style={{cursor: "pointer", color: "var(--color-error)"}}>Excluir</Typography>
                                </Flex>
                    })
                }
                return(
                    <List.Item style={{ display:"flex", justifyContent: (msg.userId === user?.uid) ? "flex-end" : "flex-start"}}>
                        <div style={{ position:"relative", display:"inline-block", maxWidth:"90%" }}>
                            <Dropdown menu={{items: menuItems}} trigger={["click"]} placement="bottomRight" arrow>
                                <div style={{position:"absolute", top:5, right:7, zIndex: 1, cursor:"pointer"} }>
                                    {user && <Ellipsis size={18} color="var(--color-primary)"/>}
                                </div>
                            </Dropdown>
                        <Space
                            direction="vertical"
                            align={msg.userId === user.uid ? "end" : "start"}
                            style={{ 
                                background: "var(--color-background-message-default)",
                                padding: "12px 12px",
                                borderRadius: 8,
                             }}
                        >
                            <Typography.Title 
                                level={5}
                                style={{
                                    color:"var(--color-text-secondary)",
                                    fontWeight: "bold",
                                    margin: 8
                                }}
                            >
                                {msg.text}
                            </Typography.Title>
                            {msg.replyTo && (
                                    <Flex
                                        style={{
                                            background: "var(--color-background-message-reply)",
                                            borderLeft: "3px solid var(--color-primary)",
                                            padding: "6px 10px",
                                            borderRadius: "6px 6px 6px 2px",
                                        }}
                                    >
                                    <Flex style={{ flex: 1 }} vertical>
                                        <Typography.Text
                                            style={{
                                                color: "var(--color-text-secondary)",
                                                fontSize: 12,
                                                fontWeight: 500,
                                            }}
                                        >
                                            {msg.replyTo.text}
                                        </Typography.Text>
                                        <Flex>
                                            <Avatar
                                                size={16}
                                                src={msg.replyTo.userPhotoUrl}
                                                style={{ marginRight: 4 }}
                                            />
                                            <Typography.Text
                                                style={{
                                                    fontSize: 10,
                                                    color: "var(--color-text-secondary)"
                                                }}
                                            >
                                                {msg.replyTo.userName} · {Date(msg.replyTo.timestamp)}
                                            </Typography.Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            )}
                            <Space size={4}>
                                <Avatar size="small" src={msg.userPhotoUrl}/>
                                <Typography.Text
                                        style={{
                                            fontSize: 10,
                                            color: "var(--color-text-secondary)"
                                            }}
                                >
                                {msg.userName} · {Date(msg.timestamp)}
                                </Typography.Text>
                            </Space>
                        </Space>
                        </div>
                    </List.Item>
                );
            }}
        >
        </List>
    );
}

export default Content;