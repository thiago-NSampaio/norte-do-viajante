const UNSPLASH_ACCESS_KEY = "u7ZswoV9WtE4bn1MZHiXtjwAbXI8CKjxSbw9VTEEy8k";

async function buscarImagemCidade(nomeCidade) {
  const cidadeNormalizada = nomeCidade.trim();
  if (!cidadeNormalizada) return null;

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", cidadeNormalizada);
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("per_page", "1");

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
      const foto = data.results[0];

      return {
        urlRegular: foto.urls.regular,
        urlThumb: foto.urls.thumb,
        fotografo: foto.user.name,
        perfilFotografo: foto.user.links.html,
      };
    }

    return null;
  } catch (error) {
    console.error("Erro na API Unsplash:", error);
    return null;
  }
}
