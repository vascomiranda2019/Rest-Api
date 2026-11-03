const swaggerJSDoc = require("swagger-jsdoc");

const opcoes = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Academica - Alunos e Cursos",
      version: "1.0.0",
      description:
        "API RESTful para gestao de alunos e cursos, construida com Node.js, Express e MongoDB Atlas.",
    },
    servers: [
      { url: "http://localhost:3000", description: "Servidor local" },
    ],
  },
  // Onde o swagger-jsdoc procura os comentarios @swagger
  apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(opcoes);
