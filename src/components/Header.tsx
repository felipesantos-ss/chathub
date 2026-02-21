import { Button, Flex, Typography } from "antd";
import { GoogleOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { AuthService } from "../services/AuthService";

const Header = () => {
    const { user } = useAuth();
    const authService = new AuthService();
    return (    
        <Flex 
            align="center" 
            justify="space-between" 
            style={{ 
                padding: '12px 24px',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                height: '64px',
                background: 'var(--color-background)',
                borderBottom: '1px solid var(--color-border)'
            }}>
        <Flex align="center" gap={10}>
            <div style={{ 
                padding: '6px', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img src="/chathub-logo.png" alt="ChatHub Logo" style={{ height: '28px' }} />
            </div>
            <Typography.Title 
                level={4}
                style={{ margin: 0, color:"var(--color-text-primary)", fontWeight: 700, letterSpacing: '-0.5px' }}>
                ChatHub
            </Typography.Title>
        </Flex>
        
        <Button 
            type="text"
            style={{ 
                color: "var(--color-text-primary)",
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
            icon={user ? <LogoutOutlined /> : <GoogleOutlined />}
            onClick={user ? authService.logout : authService.login}
        >
            {user ? "Sair" : "Entrar com Google"}
        </Button>
        </Flex>
    );
}

export default Header;
