const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       required:
 *         - nomeDoCurso
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente
 *         nomeDoCurso:
 *           type: string
 *       example:
 *         nomeDoCurso: Engenharia Informatica
 */

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Gestao de cursos
 */

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       201:
 *         description: Curso criado
 */
router.get("/", cursoController.listarCursos);
router.post("/", cursoController.criarCurso);

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Obtem um curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do curso
 *       404:
 *         description: Curso nao encontrado
 */
router.get("/:id", cursoController.obterCurso);

module.exports = router;
