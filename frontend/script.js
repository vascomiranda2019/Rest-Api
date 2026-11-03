// URL da API. Muda conforme o que estas a usar:
//   json-server:     "http://localhost:3001"
//   API Express:     "http://localhost:3000/api"
//   Render (deploy): "https://a-tua-api.onrender.com/api"
const API_URL = "http://localhost:3000/api";

const form = document.getElementById("form-aluno");
const inputId = document.getElementById("aluno-id");
const inputNome = document.getElementById("nome");
const inputApelido = document.getElementById("apelido");
const selectCurso = document.getElementById("idCurso");
const inputAno = document.getElementById("anoCurricular");
const btnCancelar = document.getElementById("btn-cancelar");
const corpoTabela = document.getElementById("corpo-tabela");
const formTitulo = document.getElementById("form-titulo");

let cursos = [];

// Arranque
document.addEventListener("DOMContentLoaded", async () => {
  await carregarCursos();
  await carregarAlunos();
});

// Carregar cursos para a dropdown
async function carregarCursos() {
  const resposta = await fetch(`${API_URL}/cursos`);
  cursos = await resposta.json();
  selectCurso.innerHTML = "";
  cursos.forEach((curso) => {
    const opcao = document.createElement("option");
    opcao.value = curso.id;
    opcao.textContent = curso.nomeDoCurso;
    selectCurso.appendChild(opcao);
  });
}

function nomeDoCurso(idCurso) {
  const curso = cursos.find((c) => c.id == idCurso);
  return curso ? curso.nomeDoCurso : "-";
}

// LER - mostrar alunos na tabela
async function carregarAlunos() {
  const resposta = await fetch(`${API_URL}/alunos`);
  const alunos = await resposta.json();
  corpoTabela.innerHTML = "";
  alunos.forEach((aluno) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.apelido}</td>
      <td>${nomeDoCurso(aluno.idCurso)}</td>
      <td>${aluno.anoCurricular}</td>
      <td>
        <button onclick="editarAluno('${aluno.id}')">Editar</button>
        <button onclick="apagarAluno('${aluno.id}')">Apagar</button>
      </td>
    `;
    corpoTabela.appendChild(linha);
  });
}

// CRIAR / ATUALIZAR
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const aluno = {
    nome: inputNome.value,
    apelido: inputApelido.value,
    idCurso: selectCurso.value,
    anoCurricular: Number(inputAno.value),
  };
  const id = inputId.value;

  if (id) {
    // editar
    await fetch(`${API_URL}/alunos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });
  } else {
    // criar
    await fetch(`${API_URL}/alunos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });
  }

  limparFormulario();
  await carregarAlunos();
});

// Preparar edicao - preenche o formulario
async function editarAluno(id) {
  const resposta = await fetch(`${API_URL}/alunos/${id}`);
  const aluno = await resposta.json();
  inputId.value = aluno.id;
  inputNome.value = aluno.nome;
  inputApelido.value = aluno.apelido;
  selectCurso.value = aluno.idCurso;
  inputAno.value = aluno.anoCurricular;
  formTitulo.textContent = "Editar aluno";
  btnCancelar.hidden = false;
}

// APAGAR
async function apagarAluno(id) {
  if (!confirm("Apagar este aluno?")) return;
  await fetch(`${API_URL}/alunos/${id}`, { method: "DELETE" });
  await carregarAlunos();
}

// Cancelar edicao
btnCancelar.addEventListener("click", limparFormulario);

function limparFormulario() {
  form.reset();
  inputId.value = "";
  formTitulo.textContent = "Adicionar aluno";
  btnCancelar.hidden = true;
}
