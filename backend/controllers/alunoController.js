const Aluno = require("../models/Aluno");

// GET /api/alunos - listar todos os alunos
exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// GET /api/alunos/:id - obter um aluno
exports.obterAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) {
      return res.status(404).json({ erro: "Aluno nao encontrado" });
    }
    res.json(aluno);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// POST /api/alunos - criar um aluno
exports.criarAluno = async (req, res) => {
  try {
    const novoAluno = await Aluno.create(req.body);
    res.status(201).json(novoAluno);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// PUT /api/alunos/:id - atualizar um aluno
exports.atualizarAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // devolve o documento ja atualizado
      runValidators: true, // valida os campos no update
    });
    if (!aluno) {
      return res.status(404).json({ erro: "Aluno nao encontrado" });
    }
    res.json(aluno);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// DELETE /api/alunos/:id - apagar um aluno
exports.apagarAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) {
      return res.status(404).json({ erro: "Aluno nao encontrado" });
    }
    res.json({ mensagem: "Aluno apagado com sucesso" });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};
