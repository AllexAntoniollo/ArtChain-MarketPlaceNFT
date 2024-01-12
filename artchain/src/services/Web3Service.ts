import axios from "axios";
import { ethers } from "ethers";

export type NewNFT721 = {
  name?: string;
  image?: File;
  description?: string;
  author?: string;
};

async function uploadFiled(file: File): Promise<string> {
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
  author?: string;
};

export async function uploadAndCreate(nft: NewNFT721): Promise<number> {
  if (!nft.image || !nft.name || !nft.description || !nft.author) {
    throw new Error("All fields are required");
  }

  const uri = await uploadFiled(nft.image);

  const metadataUri = await uploadMetadata({
    name: nft.name,
    description: nft.description,
    image: uri,
  });
  console.log(metadataUri);

  //Mint

  return 1;
}
