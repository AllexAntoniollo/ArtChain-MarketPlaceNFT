import axios from "axios";
import { EventLog, ethers } from "ethers";
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

async function createItem(url: string): Promise<number> {
  const provider = await getProvider();
  const signer = await provider.getSigner();

  const collectionContract = new ethers.Contract(ERC721, Erc721ABI, signer);
  const mintTx = await collectionContract.safeMint(url);
  const mintTxReceipt: ethers.ContractTransactionReceipt = await mintTx.wait();
  let eventLog = mintTxReceipt.logs[0] as EventLog;
  const tokenId = Number(eventLog.args[2]);

  return tokenId;
}

export async function uploadAndCreate(nft: NewNFT721): Promise<number> {
  if (!nft.image || !nft.name || !nft.description || !nft.author) {
    throw new Error("All fields are required");
  }

  const uri = await uploadFiled(nft.image);

  const metadataUri = await uploadMetadata({
    name: nft.name,
    description: nft.description,
    author: nft.author,
    image: uri,
  });

  const tokenId = createItem(metadataUri);

  return tokenId;
}

export type SellNewNFT = {
  price?: string;
  address?: string;
  tokenId?: string;
};

export async function sellNFT(nft: SellNewNFT): Promise<number> {
  if (!nft.address || !nft.price || !nft.tokenId) {
    throw new Error("All fields are required");
  }
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const collectionContract = new ethers.Contract(ERC721, Erc721ABI, signer);
  await collectionContract.approve();

  const marketContract = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketABI,
    signer
  );
  const listingPrice = ethers.toBigInt(0.1).toString();

  const tx = await marketContract.createMarketItem(
    ethers.toBigInt(nft.price),
    nft.address,
    ethers.toBigInt(nft.tokenId),
    { value: listingPrice }
  );

  const txReceipt: ethers.ContractTransactionReceipt = await tx.await();

  let eventLog = txReceipt.logs.find(
    (l) => (l as EventLog).eventName === "MarketItemCreated"
  ) as EventLog;
  const itemId = Number(eventLog.args[0]);

  return itemId;

  return 1;
}
