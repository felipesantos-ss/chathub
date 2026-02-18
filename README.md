# ChatHub: Aplicação de Chat em Tempo Real

## Visão Geral

O ChatHub é uma aplicação de chat em tempo real, moderna e responsiva, desenvolvida com React e TypeScript. Utiliza o Firebase Realtime Database para sincronização automática e em tempo real das mensagens entre todos os usuários conectados, sem necessidade de recarregamento da página. A interface é construída com Ant Design e Lucide React, proporcionando uma experiência intuitiva, rápida e visualmente agradável.

## Funcionalidades

*   **Autenticação de Usuário:** Login seguro via Google (Firebase Authentication).
*   **Mensagens em Tempo Real:** Troca instantânea de mensagens entre usuários.
*   **Respostas a Mensagens:** Capacidade de responder a mensagens específicas, criando um fluxo de conversa mais organizado.
*   **Exclusão de Mensagens:** Usuários podem excluir suas próprias mensagens.
*   **Interface Responsiva:** Design adaptável para diferentes tamanhos de tela, garantindo uma ótima experiência em dispositivos móveis e desktops.
*   **Interface Moderna:** Utilização de componentes do Ant Design para uma UI limpa e profissional.

## 🧠 Tecnologias Utilizadas

| Camada        | Tecnologia                         |
|---------------|------------------------------------|
| Frontend      | React, TypeScript                  |
| UI / Componentes | Ant Design                      |
| Backend       | Firebase (Realtime Database, Authentication)|
| Ferramentas   | Vite (bundler)                     |

## Estrutura do Projeto

A estrutura de diretórios do projeto segue uma organização modular para facilitar o desenvolvimento e a manutenção:

```
chathub/
├── public/
│   └── chathub-logo.png
├── src/
│   ├── components/       # Componentes reutilizáveis da UI
│   │   ├── Chat.tsx
│   │   ├── Content.tsx
│   │   ├── DeleteModal.tsx
│   │   ├── Header.tsx
│   │   └── ReplyModal.tsx
│   ├── contexts/         # Contextos React para gerenciamento de estado global
│   │   └── AuthContext.tsx
│   ├── hooks/            # Hooks personalizados para lógica reutilizável
│   │   └── useAuth.tsx
│   ├── interfaces/       # Definições de tipos TypeScript
│   │   └── index.ts
│   ├── pages/            # Páginas principais da aplicação
│   │   └── Home.tsx
│   ├── services/         # Serviços para interação com o Firebase
│   │   ├── AuthService.ts
│   │   └── ChatService.ts
│   ├── utils/            # Funções utilitárias
│   │   └── formatTimeStamp.ts
│   ├── App.tsx           # Componente principal da aplicação
│   ├── firebase.ts       # Configuração do Firebase
│   ├── index.css         # Estilos globais
│   └── main.tsx          # Ponto de entrada da aplicação
├── .eslintrc.cjs
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── ...
```
## 🚀 **Acessar a aplicação:** [Abrir ChatHub](https://chathub-76512.web.app/)
