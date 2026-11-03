// ========================================================
//  Script de migracao: le o mock-data/bd.json e insere os
//  dados no MongoDB Atlas.
//  Corre com:  npm run seed
// ========================================================
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const Aluno = require("./models/Aluno");
const Curso = require("./models/Curso");

async function migrar() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("Ligado ao Atlas. A migrar dados...");

    // Ler o bd.json original
    const caminho = path.join(__dirname, "..", "mock-data", "bd.json");
    const dados = JSON.parse(fs.readFileSync(caminho, "utf-8"));

    // Limpar coleccoes antes de inserir (para poder correr varias vezes)
    await Aluno.deleteMany({});
    await Curso.deleteMany({});

    // 1) Inserir cursos e construir mapa: idAntigo (do json) -> idNovo (do Mongo)
    const mapaCursos = {};
    for (const curso of dados.cursos) {
      const novo = await Curso.create({ nomeDoCurso: curso.nomeDoCurso });
      mapaCursos[curso.id] = novo.id; // id = _id em texto
    }
    console.log(`${dados.cursos.length} cursos inseridos.`);

    // 2) Inserir alunos, trocando o idCurso antigo pelo novo id do Mongo
    for (const aluno of dados.alunos) {
      await Aluno.create({
        nome: aluno.nome,
        apelido: aluno.apelido,
        idCurso: mapaCursos[aluno.idCurso],
        anoCurricular: aluno.anoCurricular,
      });
    }
    console.log(`${dados.alunos.length} alunos inseridos.`);

    console.log("Migracao concluida com sucesso!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (erro) {
    console.error("Erro na migracao:", erro.message);
    process.exit(1);
  }
}

migrar();
