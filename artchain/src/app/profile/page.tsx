"use client";
import { IoPencilSharp } from "react-icons/io5";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { NFT } from "@/components/nft";
import { useGlobalContext } from "@/contexts/WalletContext";
import {
  MarketItem,
  loadNfts,
  itemsCreated,
  myNFTs,
} from "@/services/Web3Service";

enum profileNFTs {
  Collectibles,
  Created,
  OnSale,
}

export default function Profile() {
  const { wallet } = useGlobalContext();
  const [copied, setCopied] = useState(false);
  const [nfts, setNfts] = useState<MarketItem[]>([]);
  const [category, setCategory] = useState<profileNFTs>(
    profileNFTs.Collectibles
  );
  const handleCopyClick = () => {
    navigator.clipboard.writeText(wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
  };
  const purchased = () => {
    myNFTs()
      .then((nfts) => setNfts(nfts))
      .catch((err) => console.log(err.msg));
  };
  const onSale = () => {
    loadNfts()
      .then((nfts) => setNfts(nfts))
      .catch((err) => console.log(err.msg));
  };
  const created = () => {
    itemsCreated()
      .then((nfts) => setNfts(nfts))
      .catch((err) => console.log(err.msg));
  };
  useEffect(() => {
    purchased();
  }, []);
  function changeCategory(selectedCategory: profileNFTs) {
    setCategory(selectedCategory);
    if (selectedCategory === profileNFTs.OnSale) {
      onSale();
    } else if (selectedCategory === profileNFTs.Created) {
      created();
    } else if (selectedCategory === profileNFTs.Collectibles) {
      purchased();
    }
  }
  return (
    <main>
      <section
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2022/04/07/16/36/art-7117922_1280.jpg')",
        }}
        className="h-60 bg-no-repeat bg-cover bg-center border-b-black "
      ></section>
      <section>
        <div
          style={{ margin: "0 auto" }}
          className="rounded-full relative bottom-12 w-24 h-24 bg-green-400 border-black"
        >
          <IoPencilSharp className="absolute bottom-0 translate-y-full text-white size-7 cursor-pointer rounded bg-purple-950 p-1 inset-1/2 transform -translate-x-1/2"></IoPencilSharp>
        </div>
        <div className="flex text-purple-950 pb-12 flex-col items-center">
          <h1 className="text-4xl font-bold">Allex Antoniollo</h1>
          <h1
            className="p-2 mt-2 flex items-center bg-rose-50 hover:bg-rose-100 cursor-pointer rounded"
            onClick={handleCopyClick}
          >
            {wallet}
            {copied ? (
              <FaCheck className="ml-2" />
            ) : (
              <FaRegCopy className="ml-2" />
            )}
          </h1>
          <p className="mt-5">I'm reaching for the random...</p>
        </div>
      </section>
      <section className="pb-10">
        <div className="flex mx-16 py-5">
          <h1
            onClick={() => changeCategory(profileNFTs.Collectibles)}
            className={
              "border-b cursor-pointer grow text-center hover:border-purple-700 hover:text-purple-700 py-7 " +
              (category === profileNFTs.Collectibles
                ? "text-purple-800 border-purple-800"
                : "text-gray-600")
            }
          >
            COLLECTIBLES
          </h1>
          <h1
            onClick={() => changeCategory(profileNFTs.Created)}
            className={
              "border-b cursor-pointer grow text-center hover:border-purple-700 hover:text-purple-700 py-7 " +
              (category === profileNFTs.Created
                ? "text-purple-800  border-purple-800"
                : "text-gray-600")
            }
          >
            SALE CREATED
          </h1>
          <h1
            onClick={() => changeCategory(profileNFTs.OnSale)}
            className={
              "border-b cursor-pointer grow text-center hover:border-purple-700 hover:text-purple-700 py-7 " +
              (category === profileNFTs.OnSale
                ? "text-purple-800 border-purple-800"
                : "text-gray-600")
            }
          >
            ON SALE
          </h1>
        </div>
        <section className="mx-16 py-5 flex flex-wrap justify-around">
          {category === profileNFTs.Collectibles && nfts.length > 0 ? (
            nfts.map((nft: MarketItem, index) => (
              <NFT
                key={index}
                itemId={nft.itemId}
                price={nft.price}
                sold={nft.sold}
              />
            ))
          ) : category === profileNFTs.Created && nfts.length > 0 ? (
            nfts.map((nft: MarketItem, index) => (
              <NFT
                key={index}
                itemId={nft.itemId}
                price={nft.price}
                sold={nft.sold}
              />
            ))
          ) : category === profileNFTs.OnSale && nfts.length > 0 ? (
            nfts.map((nft: MarketItem, index) =>
              nft.seller.toLowerCase() === wallet ? (
                <NFT
                  key={index}
                  itemId={nft.itemId}
                  price={nft.price}
                  sold={nft.sold}
                />
              ) : (
                <p>No NFTs available.</p>
              )
            )
          ) : (
            <p>No NFTs available.</p>
          )}
        </section>
      </section>
    </main>
  );
}
