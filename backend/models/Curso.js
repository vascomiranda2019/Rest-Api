const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema({
  nomeDoCurso: { type: String, required: true },
});

// Fazer com que o JSON devolvido tenha "id" (texto) em vez de "_id",
// para ficar equivalente ao json-server e simplificar o frontend.
cursoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model("Curso", cursoSchema);
