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

export type NewNFT = {
  name?: string;
  image?: File;
  description?: string;
  author?: string;
  quantity?: number;
};

async function uploadFile(file: File): Promise<string> {
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

export type Metadata = {
  name?: string;
  description?: string;
  image?: string;
  author?: string;
};

async function createItem(url: string, amount?: number): Promise<number> {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  let mintTx;

  if (!amount) {
    const collectionContract = new ethers.Contract(ERC721, Erc721ABI, signer);
    mintTx = await collectionContract.safeMint(url);
  } else {
    const collectionContract = new ethers.Contract(ERC1155, Erc1155ABI, signer);
    mintTx = await collectionContract.mint(amount, url);
  }
  const mintTxReceipt: ethers.ContractTransactionReceipt = await mintTx.wait();
  let eventLog = mintTxReceipt.logs[0] as EventLog;
  const tokenId = Number(eventLog.args[2]);

  return tokenId;
}

export async function uploadAndCreate(nft: NewNFT): Promise<number> {
  if (!nft.image || !nft.name || !nft.description || !nft.author) {
    throw new Error("All fields are required");
  }

  const uri = await uploadFile(nft.image);

  const metadataUri = await uploadMetadata({
    name: nft.name,
    description: nft.description,
    author: nft.author,
    image: uri,
  });

  const tokenId = createItem(metadataUri, nft.quantity);

  return tokenId;
}

export type SellNewNFT = {
  price?: string;
  address?: string;
  tokenId?: string;
  amount?: number;
};

export async function sellNFT(nft: SellNewNFT): Promise<number> {
  if (!nft.address || !nft.price || !nft.tokenId) {
    throw new Error("All fields are required");
  }

  const provider = await getProvider();
  const signer = await provider.getSigner();
  let isApproved, collectionContract;
  if (nft.amount && nft.amount > 0) {
    collectionContract = new ethers.Contract(nft.address, Erc1155ABI, signer);
    isApproved = await collectionContract.isApprovedForAll(
      signer.address,
      MARKETPLACE_ADDRESS
    );
  } else {
    collectionContract = new ethers.Contract(nft.address, Erc721ABI, signer);
    isApproved = await collectionContract.getApproved(nft.tokenId);
  }

  if (typeof isApproved === "boolean") {
    if (isApproved !== true) {
      const txApprove = await collectionContract.setApprovalForAll(
        MARKETPLACE_ADDRESS,
        true
      );
      await txApprove.wait();
    }
  } else {
    if (isApproved !== MARKETPLACE_ADDRESS) {
      const txApprove = await collectionContract.approve(
        MARKETPLACE_ADDRESS,
        nft.tokenId
      );

      await txApprove.wait();
    }
  }
  const marketContract = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketABI,
    signer
  );

  const listingPrice = ethers.parseUnits("0.01", "ether").toString();
  let tx;

  if (nft.amount && nft.amount > 0) {
    for (let index = 0; index < nft.amount; index++) {
      tx = await marketContract.createMarketItem(
        ethers.parseUnits(nft.price, "ether"),
        nft.address,
        Number(nft.tokenId),
        { value: listingPrice }
      );
    }
  } else {
    tx = await marketContract.createMarketItem(
      ethers.parseUnits(nft.price, "ether"),
      nft.address,
      Number(nft.tokenId),
      { value: listingPrice }
    );
  }

  const txReceipt: ethers.ContractTransactionReceipt = await tx.wait();

  let eventLog = txReceipt.logs.find(
    (l) => (l as EventLog).eventName === "MarketItemCreated"
  ) as EventLog;

  const itemId = Number(eventLog.args[0]);

  return itemId;
}
export type MarketItem = {
  itemId: BigInt;
  tokenId: BigInt;
  seller: string;
  owner: string;
  nftContract: string;
  price: BigInt;
  sold: boolean;
  image: string;
  author: string;
  description: string;
  name: string;
};
export async function getDetails(itemId: number): Promise<MarketItem> {
  if (!itemId) {
    throw new Error("Item id field are required!");
  }

  const provider = await getProvider();

  const marketContract = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketABI,
    provider
  );

  const item: MarketItem = await marketContract.marketItems(itemId);

  if (item.seller === ethers.ZeroAddress) return {} as MarketItem;
  const contract = new ethers.Contract(
    item.nftContract,
    [
      "function supportsInterface(bytes4 interfaceId) external view returns (bool)",
    ],
    provider
  );
  const isERC721 = await contract.supportsInterface("0x80ac58cd");
  const isERC1155 = await contract.supportsInterface("0xd9b67a26");
  let tokenUri: string, collectionContract;
  if (isERC1155) {
    collectionContract = new ethers.Contract(
      item.nftContract,
      Erc1155ABI,
      provider
    );
    tokenUri = await collectionContract.uri(item.tokenId);
  } else if (isERC721) {
    collectionContract = new ethers.Contract(
      item.nftContract,
      Erc721ABI,
      provider
    );
    tokenUri = await collectionContract.tokenURI(item.tokenId);
  } else {
    tokenUri = "404";
  }
  let metadata,
    imageUrl: string = "",
    nameUrl: string = "",
    descriptionUrl: string = "",
    authorUrl: string = "";
  try {
    const resposta = await fetch(tokenUri);
    if (resposta.ok) {
      metadata = await resposta.json();
      imageUrl = metadata.image;
      nameUrl = metadata.name;
      descriptionUrl = metadata.description;
      authorUrl = metadata.author;
    } else {
      console.error(
        "Erro ao obter o JSON:",
        resposta.status,
        resposta.statusText
      );
    }
  } catch (error) {
    console.error("Erro ao processar a requisição:");
  }

  const market = {
    itemId: item.itemId,
    tokenId: item.tokenId,
    seller: item.seller,
    owner: item.owner,
    nftContract: item.nftContract,
    price: item.price,
    sold: item.sold,
    image: imageUrl,
    name: nameUrl,
    description: descriptionUrl,
    author: authorUrl,
  } as MarketItem;

  return market;
}

export async function loadNfts(): Promise<MarketItem[]> {
  const provider = await getProvider();
  const marketContract = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketABI,
    provider
  );
  const items: MarketItem[] = await marketContract.fetchMarketItems();
  if (items[0].seller === ethers.ZeroAddress) return [] as MarketItem[];
  let collectionContract, tokenUri: string;

  const metadataPromises = items.map(async (item: MarketItem) => {
    const contract = new ethers.Contract(
      item.nftContract,
      [
        "function supportsInterface(bytes4 interfaceId) external view returns (bool)",
      ],
      provider
    );
    const isERC721 = await contract.supportsInterface("0x80ac58cd");
    const isERC1155 = await contract.supportsInterface("0xd9b67a26");

    if (isERC1155) {
      collectionContract = new ethers.Contract(
        item.nftContract,
        Erc1155ABI,
        provider
      );
      tokenUri = await collectionContract.uri(item.tokenId);
    } else if (isERC721) {
      collectionContract = new ethers.Contract(
        item.nftContract,
        Erc721ABI,
        provider
      );
      tokenUri = await collectionContract.tokenURI(item.tokenId);
    } else {
      tokenUri = "404";
    }

    let metadata,
      imageUrl: string = "",
      nameUrl: string = "",
      descriptionUrl: string = "",
      authorUrl: string = "";
    try {
      const resposta = await fetch(tokenUri);
      if (resposta.ok) {
        metadata = await resposta.json();
        imageUrl = metadata.image;
        nameUrl = metadata.name;
        descriptionUrl = metadata.description;
        authorUrl = metadata.author;
      } else {
        console.error(
          "Erro ao obter o JSON:",
          resposta.status,
          resposta.statusText
        );
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:");
    }
    return {
      itemId: item.itemId,
      tokenId: item.tokenId,
      seller: item.seller,
      owner: item.owner,
      nftContract: item.nftContract,
      price: item.price,
      sold: item.sold,
      name: nameUrl,
      author: authorUrl,
      description: descriptionUrl,
      image: imageUrl,
    } as MarketItem;
  });

  const itemsWithMetadata: MarketItem[] = await Promise.all(metadataPromises);

  return itemsWithMetadata.reverse();
}

export async function buyNft(
  nftContract: string,
  marketId: BigInt,
  value: BigInt
): Promise<BigInt> {
  if (!nftContract || !marketId) {
    throw new Error("All fields are required");
  }

  const provider = await getProvider();
  const signer = await provider.getSigner();

  const marketContract = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketABI,
    signer
  );

  const tx = await marketContract.createMarketSale(nftContract, marketId, {
    value: value,
  });
  await tx.wait();

  return marketId;
}
export async function itemsCreated(): Promise<MarketItem[]> {
  const provider = await getProvider();
  const signer = await provider.getSigner();

  const marketContract = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketABI,
    provider
  );

  const items: MarketItem[] = await marketContract.fetchItemsCreated({
    from: signer.address,
  });

  if (items[0].seller === ethers.ZeroAddress) {
    return [] as MarketItem[];
  }
  let collectionContract, tokenUri: string;
  const metadataPromises = items.map(async (item: MarketItem) => {
    const contract = new ethers.Contract(
      item.nftContract,
      [
        "function supportsInterface(bytes4 interfaceId) external view returns (bool)",
      ],
      provider
    );
    const isERC721 = await contract.supportsInterface("0x80ac58cd");
    const isERC1155 = await contract.supportsInterface("0xd9b67a26");

    if (isERC1155) {
      collectionContract = new ethers.Contract(
        item.nftContract,
        Erc1155ABI,
        provider
      );
      tokenUri = await collectionContract.uri(item.tokenId);
    } else if (isERC721) {
      collectionContract = new ethers.Contract(
        item.nftContract,
        Erc721ABI,
        provider
      );
      tokenUri = await collectionContract.tokenURI(item.tokenId);
    } else {
      tokenUri = "404";
    }

    let metadata,
      imageUrl: string = "",
      nameUrl: string = "",
      descriptionUrl: string = "",
      authorUrl: string = "";
    try {
      const resposta = await fetch(tokenUri);
      if (resposta.ok) {
        metadata = await resposta.json();
        imageUrl = metadata.image;
        nameUrl = metadata.name;
        descriptionUrl = metadata.description;
        authorUrl = metadata.author;
      } else {
        console.error(
          "Erro ao obter o JSON:",
          resposta.status,
          resposta.statusText
        );
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:");
    }
    return {
      itemId: item.itemId,
      tokenId: item.tokenId,
      seller: item.seller,
      owner: item.owner,
      nftContract: item.nftContract,
      price: item.price,
      sold: item.sold,
      name: nameUrl,
      author: authorUrl,
      description: descriptionUrl,
      image: imageUrl,
    } as MarketItem;
  });

  const itemsWithMetadata: MarketItem[] = await Promise.all(metadataPromises);

  return itemsWithMetadata.reverse();
}

export async function myNFTs(): Promise<MarketItem[]> {
  const provider = await getProvider();
  const signer = await provider.getSigner();

  const marketContract = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketABI,
    provider
  );

  const items: MarketItem[] = await marketContract.fetchMyNfts({
    from: signer.address,
  });

  let collectionContract, tokenUri: string;
  const metadataPromises = items.map(async (item: MarketItem) => {
    const contract = new ethers.Contract(
      item.nftContract,
      [
        "function supportsInterface(bytes4 interfaceId) external view returns (bool)",
      ],
      provider
    );
    const isERC721 = await contract.supportsInterface("0x80ac58cd");
    const isERC1155 = await contract.supportsInterface("0xd9b67a26");

    if (isERC1155) {
      collectionContract = new ethers.Contract(
        item.nftContract,
        Erc1155ABI,
        provider
      );
      tokenUri = await collectionContract.uri(item.tokenId);
    } else if (isERC721) {
      collectionContract = new ethers.Contract(
        item.nftContract,
        Erc721ABI,
        provider
      );
      tokenUri = await collectionContract.tokenURI(item.tokenId);
    } else {
      tokenUri = "404";
    }

    let metadata,
      imageUrl: string = "",
      nameUrl: string = "",
      descriptionUrl: string = "",
      authorUrl: string = "";
    try {
      const resposta = await fetch(tokenUri);
      if (resposta.ok) {
        metadata = await resposta.json();
        imageUrl = metadata.image;
        nameUrl = metadata.name;
        descriptionUrl = metadata.description;
        authorUrl = metadata.author;
      } else {
        console.error(
          "Erro ao obter o JSON:",
          resposta.status,
          resposta.statusText
        );
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:");
    }

    return {
      itemId: item.itemId,
      tokenId: item.tokenId,
      seller: item.seller,
      owner: item.owner,
      nftContract: item.nftContract,
      price: item.price,
      sold: item.sold,
      name: nameUrl,
      author: authorUrl,
      description: descriptionUrl,
      image: imageUrl,
    } as MarketItem;
  });

  const itemsWithMetadata: MarketItem[] = await Promise.all(metadataPromises);

  return itemsWithMetadata.reverse();
}
