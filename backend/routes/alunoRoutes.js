const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - nome
 *         - apelido
 *         - idCurso
 *         - anoCurricular
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente
 *         nome:
 *           type: string
 *         apelido:
 *           type: string
 *         idCurso:
 *           type: string
 *           description: ID do curso a que o aluno pertence
 *         anoCurricular:
 *           type: integer
 *       example:
 *         nome: Ana
 *         apelido: Silva
 *         idCurso: "1"
 *         anoCurricular: 1
 */

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Gestao de alunos
 */

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: Aluno criado
 */
router.get("/", alunoController.listarAlunos);
router.post("/", alunoController.criarAluno);

/**
 * @swagger
 * /api/alunos/{id}:
 *   get:
 *     summary: Obtem um aluno por ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do aluno
 *       404:
 *         description: Aluno nao encontrado
 *   put:
 *     summary: Atualiza um aluno
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *       404:
 *         description: Aluno nao encontrado
 *   delete:
 *     summary: Apaga um aluno
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aluno apagado
 *       404:
 *         description: Aluno nao encontrado
 */
router.get("/:id", alunoController.obterAluno);
router.put("/:id", alunoController.atualizarAluno);
router.delete("/:id", alunoController.apagarAluno);

module.exports = router;
