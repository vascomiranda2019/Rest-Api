# Atividade Prática #1 — Consumo e Implementação de APIs RESTful

Projeto completo de uma aplicação web com front-end e back-end separados, para gestão de **alunos** e **cursos**, usando Node.js, Express, MongoDB Atlas, JSON-Server, Fetch API e Swagger.

## Links de Deploy

- **Front-end (público):** _(preencher após deploy — ver Parte 5)_
- **API real (público):** _(preencher após deploy — ver Parte 5)_
- **Documentação Swagger:** _(URL da API)_ `/api-docs`

---

## Estrutura do Projeto

```
projeto-apis/
├── frontend/        Interface web (HTML/CSS/JS) com CRUD de alunos
├── backend/         API RESTful real (Express + MongoDB Atlas, estrutura MVC)
├── mock-server/     JSON-Server configurado
├── mock-data/       Base de dados JSON original (bd.json)
├── tests/           Coleção de testes do Postman
├── README.md
└── .gitignore
```

---

## Modelo de Dados

**Aluno:** `nome`, `apelido`, `idCurso`, `anoCurricular`
**Curso:** `nomeDoCurso`

---

## Como correr cada parte

### Pré-requisitos
- Node.js instalado (`node --version`)

### Parte 2 — API simulada (JSON-Server)
```bash
cd mock-server
npm install
npm start
```
- API simulada: http://localhost:3001/alunos e http://localhost:3001/cursos
- O front-end também é servido aqui (recurso estático): http://localhost:3001/

### Parte 3 — Front-end
O front-end está em `/frontend`. Podes abri-lo de duas formas:
1. Servido pelo JSON-Server (já configurado com `--static`): http://localhost:3001/
2. Ou abrir `frontend/index.html` diretamente no browser.

Para escolher a que API o front-end liga, edita a constante `API_URL` no topo de `frontend/script.js`.

### Parte 4 — API real (Express + MongoDB Atlas)
```bash
cd backend
npm install
# criar o ficheiro .env a partir do .env.example e preencher a MONGO_URI
npm run seed    # migra os dados do bd.json para o Atlas (uma vez)
npm start       # arranca a API em http://localhost:3000
```
Endpoints:
- `GET/POST /api/alunos`
- `GET/PUT/DELETE /api/alunos/:id`
- `GET/POST /api/cursos`
- `GET /api/cursos/:id`

### Parte 6 — Documentação Swagger
Com a API a correr: http://localhost:3000/api-docs

---

## Testes (Postman)
Importa o ficheiro `tests/postman_collection.json` no Postman.
A variável `baseUrl` alterna entre o JSON-Server (`http://localhost:3001`) e a API real (`http://localhost:3000/api`).

---

## Tecnologias
Node.js · Express · MongoDB Atlas · Mongoose · JSON-Server · Fetch API · Swagger · Postman
