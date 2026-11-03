const Curso = require("../models/Curso");

// GET /api/cursos - listar todos os cursos
exports.listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// GET /api/cursos/:id - obter um curso
exports.obterCurso = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) {
      return res.status(404).json({ erro: "Curso nao encontrado" });
    }
    res.json(curso);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// POST /api/cursos - criar um curso
exports.criarCurso = async (req, res) => {
  try {
    const novoCurso = await Curso.create(req.body);
    res.status(201).json(novoCurso);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};
