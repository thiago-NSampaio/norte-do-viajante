exports.handler = async function (event, context) {
  const query = event.queryStringParameters.query || "";
  const orientation = event.queryStringParameters.orientation || "landscape";
  const per_page = event.queryStringParameters.per_page || "6";

  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Parâmetro 'query' é obrigatório." }),
    };
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=${per_page}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "Falha ao conectar com o serviço de imagens do Unsplash.",
        }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erro interno do servidor: " + error.message,
      }),
    };
  }
};
