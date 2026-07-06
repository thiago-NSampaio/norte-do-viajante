const gridDestinos = document.querySelector(".destinos-grid");
const inputBusca = document.getElementById("search-input");
const botaoBusca = document.getElementById("search-button");

const cidadesIniciais = ["Rio de Janeiro", "Paris", "Tóquio"];

async function carregarFichaComImagem(nomeCidade) {
  const dadosImagem = await buscarImagemCidade(nomeCidade);

  const urlImagemFinal = dadosImagem
    ? dadosImagem.urlRegular
    : "https://unsplash.com";

  const cardHtml = `
        <div class="destino-card">
            <div class="card-image-wrapper">
                <img src="${urlImagemFinal}" alt="${nomeCidade}" loading="lazy">
                <span class="badge-tag">Explorar</span>
            </div>
            <div class="card-info">
                <h3>${nomeCidade}</h3>
                <p class="card-text">Destino turístico mapeado pelo sistema. Explore as fotografias e planeje seu próximo embarque.</p>
                ${
                  dadosImagem
                    ? `
                <div style="font-size: 10px; color: rgba(255,255,255,0.4); margin-bottom: 15px;">
                    Foto por <a href="${dadosImagem.perfilFotografo}" target="_blank" style="color: inherit;">${dadosImagem.fotografo}</a> no Unsplash
                </div>
                `
                    : ""
                }
            </div>
        </div>
    `;

  gridDestinos.insertAdjacentHTML("beforeend", cardHtml);
}

async function atualizarGradeDestinos(listaCidades) {
  gridDestinos.innerHTML = "";
  for (const cidade of listaCidades) {
    await carregarFichaComImagem(cidade);
  }
}

// Vincula os eventos na barra de pesquisa da página
botaoBusca.addEventListener("click", () => {
  const valor = inputBusca.value.trim();
  if (valor) atualizarGradeDestinos([valor]);
});

inputBusca.addEventListener("keypress", (e) => {
  const valor = inputBusca.value.trim();
  if (e.key === "Enter" && valor) atualizarGradeDestinos([valor]);
});

// Carga inicial ao abrir o projeto
document.addEventListener("DOMContentLoaded", () => {
  atualizarGradeDestinos(cidadesIniciais);
});
