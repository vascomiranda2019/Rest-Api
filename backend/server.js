require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const ligarBD = require("./config/db");
const swaggerSpec = require("./docs/swagger");
const alunoRoutes = require("./routes/alunoRoutes");
const cursoRoutes = require("./routes/cursoRoutes");

const app = express();

// Middlewares
app.use(cors()); // permite que o frontend (noutro dominio) consuma a API
app.use(express.json()); // interpreta JSON no corpo dos pedidos

// Ligar a base de dados
ligarBD();

// Rota raiz (informativa)
app.get("/", (req, res) => {
  res.json({
    mensagem: "API Academica a funcionar",
    documentacao: "/api-docs",
    endpoints: ["/api/alunos", "/api/cursos"],
  });
});

// Rotas da API
app.use("/api/alunos", alunoRoutes);
app.use("/api/cursos", cursoRoutes);

// Documentacao Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Documentacao em http://localhost:${PORT}/api-docs`);
});
