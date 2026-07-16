const gridDestinos = document.querySelector(".destinos-grid");
const inputBusca = document.getElementById("search-input");
const botaoBusca = document.getElementById("search-button");

async function carregarGaleriaDestinos(nomeCidade) {
  if (!nomeCidade) return;

  gridDestinos.innerHTML =
    '<p style="color: rgba(255,255,255,0.5); grid-column: 1/-1; text-align:center;">Buscando perspectivas de destinos...</p>';

  try {
    const listaFotos = await buscarImagemCidade(nomeCidade);

    if (!listaFotos || listaFotos.length === 0) {
      gridDestinos.innerHTML =
        '<p style="color: rgba(255,255,255,0.5); grid-column: 1/-1; text-align:center;">Nenhum registro visual encontrado para esta cidade.</p>';
      return;
    }

    gridDestinos.innerHTML = "";

    listaFotos.forEach((foto, index) => {
      const cardHtml = `
                <div class="destino-card">
                    <div class="card-image-wrapper">
                        <img src="${foto.urlRegular}" alt="${nomeCidade} - Imagem ${index + 1}" loading="lazy">
                        <span class="badge-tag">Galeria</span>
                    </div>
                    <div class="card-info">
                        <h3>${nomeCidade}</h3>
                        <p class="card-text">Captura visual rica revelando a arquitetura, pontos turísticos e a essência local do destino.</p>
                        <div style="font-size: 10px; color: rgba(255,255,255,0.4); margin-top: auto; padding-top: 15px;">
                            Foto por <a href="${foto.perfilFotografo}" target="_blank" style="color: inherit; text-decoration: underline;">${foto.fotografo}</a> no Unsplash
                        </div>
                    </div>
                </div>
            `;
      gridDestinos.insertAdjacentHTML("beforeend", cardHtml);
    });
  } catch (error) {
    console.error(error);
    gridDestinos.innerHTML =
      '<p style="color: #ff4a4a; grid-column: 1/-1; text-align:center;">Erro ao renderizar a galeria de destinos.</p>';
  }
}

botaoBusca.addEventListener("click", () => {
  const valor = inputBusca.value.trim();
  if (valor) carregarGaleriaDestinos(valor);
});

inputBusca.addEventListener("keypress", (e) => {
  const valor = inputBusca.value.trim();
  if (e.key === "Enter" && valor) carregarGaleriaDestinos(valor);
});

document.addEventListener("DOMContentLoaded", () => {
  carregarGaleriaDestinos("Manaus");
});
