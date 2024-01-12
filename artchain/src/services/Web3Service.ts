import axios from "axios";
import { ethers } from "ethers";

export type NewNFT721 = {
  name?: string;
  image?: File;
  description?: string;
};

async function uplaodFiled(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios({
    method: "POST",
    url: "/pinata/file",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return `${response.data.uri}`;
}
async function uploadMetadata(metadata: Metadata): Promise<string> {
  const response = await axios({
    method: "POST",
    url: "/pinata/metadata",
    data: metadata,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return `${response.data.uri}`;
}

type Metadata = {
  name?: string;
  description?: string;
  image?: string;
};

export async function uploadAndCreate(nft: NewNFT721): Promise<number> {
  //Campos obrigatórios
  if (!nft.image) {
    throw new Error("All fields are required");
  }

  //Upload da imagem
  const uri = await uplaodFiled(nft.image);

  //Criação dos metadados
  const metadataUri = await uploadMetadata({
    name: nft.name,
    description: nft.description,
    image: uri,
  });
  //Verificar se a metadataUri está salvando com sucesso

  //Mint

  return 1;
}
