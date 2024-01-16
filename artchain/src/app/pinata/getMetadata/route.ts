import axios from "axios";
import { Metadata } from "@/services/Web3Service";

async function getMetadata(uri: string): Promise<Metadata> {
  const response = await axios({
    method: "GET",
    url: uri,
    headers: {
      "x-pinata-gateway-token": `${process.env.TOKEN}`,
    },
  });
  return response.data;
}

export async function POST(request: Request) {
  const metadata = await request.json();
  const uri = await getMetadata(metadata.uri);
  return Response.json(uri);
}
