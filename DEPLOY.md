# Guia de Deploy (Parte 5)

Objetivo: pôr a **API** online no Render e o **front-end** online no Vercel (ou Render).
No fim, preenche os links no `README.md`.

---

## 1. API no Render

1. Faz push do projeto para o GitHub (repositório do Classroom).
2. Vai a https://render.com → cria conta (podes usar o GitHub) → **New → Web Service**.
3. Liga o teu repositório.
4. Configura:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Em **Environment → Add Environment Variable**, adiciona:
   - `MONGO_URI` = a tua connection string do Atlas (a mesma do `.env`)
   - `PORT` = `3000` (o Render também define uma automaticamente; o código usa `process.env.PORT`)
6. **Create Web Service**. No fim ficas com um URL tipo `https://a-tua-api.onrender.com`.
7. Testa: `https://a-tua-api.onrender.com/api/alunos` e `/api-docs`.

> Nota: no Atlas, em **Network Access**, confirma que tens `0.0.0.0/0` (já tens), senão o Render não liga.

---

## 2. Front-end no Vercel

1. Antes do deploy, edita `frontend/script.js` e muda a `API_URL` para o URL do Render + `/api`:
   ```js
   const API_URL = "https://a-tua-api.onrender.com/api";
   ```
2. Faz commit e push dessa alteração.
3. Vai a https://vercel.com → cria conta com GitHub → **Add New → Project**.
4. Importa o repositório.
5. Configura:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Other
6. **Deploy**. Ficas com um URL tipo `https://o-teu-frontend.vercel.app`.

---

## 3. Finalizar

- Preenche no `README.md` os dois URLs (front-end e API).
- Confirma que o front-end online consegue listar, adicionar, editar e apagar alunos.

> Dica: o plano gratuito do Render "adormece" a API após inatividade. O primeiro pedido pode demorar ~30s a acordar. É normal.
