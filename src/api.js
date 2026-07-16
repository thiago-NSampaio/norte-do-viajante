const UNSPLASH_ACCESS_KEY = "u7ZswoV9WtE4bn1MZHiXtjwAbXI8CKjxSbw9VTEEy8k";

const cache = {};

async function buscarImagemCidade(nomeCidade) {
  const formatedCidade = nomeCidade.trim();
  if (!formatedCidade) return null;

  console.log(cache);

  if (cache[formatedCidade]) {
    console.log(
      `[Cache] Retornando imagem de ${nomeCidade} diretamente da memória.`,
    );
    return cache[formatedCidade];
  }

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", formatedCidade);
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("per_page", "6");

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Falha ao conectar com o serviço de imagens.");
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const listaFotos = data.results.map((foto) => ({
        urlRegular: foto.urls.regular,
        urlThumb: foto.urls.thumb,
        fotografo: foto.user.name,
        perfilFotografo: foto.user.links.html,
      }));

      cache[formatedCidade] = listaFotos;
      return listaFotos;
    }

    return null;
  } catch (error) {
    console.error("Erro na API Unsplash:", error);
    return null;
  }
}
