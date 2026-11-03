const mongoose = require("mongoose");

// Liga a aplicacao ao MongoDB Atlas usando a string em process.env.MONGO_URI
async function ligarBD() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("Ligado ao MongoDB Atlas");
  } catch (erro) {
    console.error("Erro ao ligar a BD:", erro.message);
    process.exit(1); // encerra a app se nao conseguir ligar
  }
}

module.exports = ligarBD;
