# 🚀 Trilha-dev-backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-purple?style=for-the-badge&logo=prisma)
![Swagger](https://img.shields.io/badge/Swagger-API_Docs-brightgreen?style=for-the-badge&logo=swagger)

Backend desenvolvido em **Node.js** com **TypeScript**, **Prisma ORM** e documentação via **Swagger**. Este projeto é parte da trilha de estudos para desenvolvimento backend robusto, com foco em boas práticas, escalabilidade e arquitetura limpa.

---

## 📌 Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Arquitetura e Funcionalidades](#arquitetura-e-funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Rodando o Projeto](#rodando-o-projeto)
- [Documentação da API (Swagger)](#documentação-da-api-swagger)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 📖 Sobre o Projeto
O **Trilha-dev-backend** é uma API RESTful construída para fins educacionais e para servir de base a projetos futuros.  
Ele oferece endpoints para gerenciar eventos, inscrições e participantes, incluindo:
- Criação e gerenciamento de eventos.
- Registro de usuários em eventos.
- Validações de dados com **Zod**.
- Autenticação com **JWT**
- Exportação de dados.
- Documentação completa com **Swagger**.

---

## 🏗 Arquitetura e Funcionalidades
- **Node.js + TypeScript** → Tipagem forte e escalabilidade.
- **Prisma ORM** → Abstração e facilidade no acesso ao banco.
- **Express** → Roteamento simples e performático.
- **Swagger** → Documentação interativa dos endpoints.
- **Zod** → Validação de dados robusta.
- **Arquitetura em camadas** → Separação de responsabilidades (Controllers, Services, Routes).

---

## 🔧 Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Swagger (OpenAPI)](https://swagger.io/)
- [Zod](https://zod.dev/)

---

## ✅ Pré-requisitos
Antes de rodar, instale:
- [Node.js 18+](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- **NPM** ou **Yarn**

---

## ⚙️ Configuração do Ambiente
Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
PORT=3000
```

---

## 🚀 Instalação
```bash
# Clone o repositório
git clone https://github.com/DarwinGAZ/Trilha-dev-backend.git

# Acesse a pasta do projeto
cd Trilha-dev-backend

# Instale as dependências
npm install

# Gere o cliente Prisma
npx prisma generate

# Rode as migrações
npx prisma migrate dev
```

---

## ▶ Rodando o Projeto
### Ambiente de Desenvolvimento:
```bash
npm run dev
```
A API estará disponível em:  
```
http://localhost:3000
```

---

## 📄 Documentação da API (Swagger)
O projeto inclui um arquivo `swagger.yaml` para documentar os endpoints.

Para visualizar:
1. Abra [Swagger Editor](https://editor.swagger.io/) e importe o arquivo `swagger.yaml`.
2. Ou, se configurado no projeto, acesse:
```
http://localhost:3000/docs
```

---

## 📂 Estrutura de Pastas
```
├── prisma/
│   ├── schema.prisma     # Schema do banco de dados
│   └── migrations/       # Migrações geradas pelo Prisma
├── src/
│   ├── controllers/      # Lógica dos endpoints
│   ├── services/         # Regras de negócio
│   ├── routes/           # Definição das rotas
│   ├── middlewares/      # Middlewares globais
│   ├── utils/            # Funções auxiliares
│   └── server.ts         # Ponto de entrada do servidor
├── swagger.yaml          # Documentação da API
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 📜 Scripts Disponíveis
| Comando              | Descrição                                |
|----------------------|------------------------------------------|
| `npm run dev`        | Executa em modo desenvolvimento          |
| `npm run build`      | Compila o projeto TypeScript            |
| `npm start`          | Roda a aplicação compilada              |
| `npx prisma studio`  | Abre painel gráfico do Prisma           |
| `npx prisma migrate` | Executa as migrações                    |

---

---

## ⭐ Mostre seu apoio

Se este projeto te ajudou ou você gostou do conteúdo, considere:

- Dar uma **estrela no GitHub** ⭐  
- Compartilhar com outros desenvolvedores  
- Contribuir com **pull requests** ou sugestões

Sua colaboração ajuda muito a manter o projeto ativo e em constante evolução!
