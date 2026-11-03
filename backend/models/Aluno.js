const mongoose = require("mongoose");

const alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  apelido: { type: String, required: true },
  idCurso: { type: String, required: true }, // referencia ao id de um curso
  anoCurricular: { type: Number, required: true },
});

// Devolver "id" (texto) em vez de "_id" no JSON
alunoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model("Aluno", alunoSchema);
