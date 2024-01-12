import axios from "axios";
import { ethers } from "ethers";
import MarketABI from "./Market.abi.json";
import Erc721ABI from "./Erc721.abi.json";
import Erc1155ABI from "./Erc1155.abi.json";

const MARKETPLACE_ADDRESS = `${process.env.MARKETPLACE_ADDRESS}`;
const ERC721 = `${process.env.ERC721}`;
const ERC1155 = `${process.env.ERC1155}`;

function getProvider(): ethers.BrowserProvider {
  if (!window.ethereum) throw new Error("No MetaMask found");
  return new ethers.BrowserProvider(window.ethereum);
}

function getContract(provider?: ethers.BrowserProvider): ethers.Contract {
  if (!provider) provider = getProvider();
  return new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketABI as ethers.InterfaceAbi,
    provider
  );
}

async function getContractSigner(
  provider?: ethers.BrowserProvider
): Promise<ethers.Contract> {
  if (!provider) provider = getProvider();
  const signer = await provider.getSigner(
    localStorage.getItem("wallet") || undefined
  );
  const contract = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketABI as ethers.InterfaceAbi,
    provider
  );
  return contract.connect(signer) as ethers.Contract;
}

export async function doLogin() {
  const provider = getProvider();
  const account = await provider.send("eth_requestAccounts", []);

  if (!account || !account.length) throw new Error("Wallet not found/allowed.");

  localStorage.setItem("wallet", account[0]);

  return account[0];
}

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

type NftSale = {
  price?: number;
  tokenId: number;
  nftAddress: string;
};

export async function sellNFT(nft: NftSale): Promise<number> {
  return 1;
}
