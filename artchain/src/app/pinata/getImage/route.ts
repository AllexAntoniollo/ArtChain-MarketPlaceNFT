import axios from "axios";

async function getImage(uri: string) {
  const response = await axios({
    method: "GET",
    url: uri,
    headers: {
      "x-pinata-gateway-token": `${process.env.TOKEN}`,
    },
    responseType: "arraybuffer",
  });
  return response.data;
}

export async function GET(request: Request) {
  const url = new URL(request.url);

  const params = url.searchParams;

  const parametro1 = params.get("uri");

  if (!parametro1) {
    return new Response("Parâmetro 'uri' ausente", { status: 400 });
  }

  try {
    const result = await getImage(parametro1);

    return new Response(result, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    return new Response("Erro ao obter a imagem", { status: 500 });
  }
}
