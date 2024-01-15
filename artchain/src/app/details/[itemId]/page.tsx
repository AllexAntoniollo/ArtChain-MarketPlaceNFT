"use client";
import { FaRegCopy } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getDetails, MarketItem, buyNft } from "@/services/Web3Service";
import { ethers } from "ethers";
import { NewMessage, Message } from "@/components/message";

export default function Details() {
  const params = useParams();
  const itemId = params.itemId;
  const [nft, setNft] = useState<MarketItem>({} as MarketItem);
  const [message, setMessage] = useState<NewMessage>({} as NewMessage);

  useEffect(() => {
    getDetails(Number(itemId))
      .then((nft) => setNft(nft))
      .catch((err) => console.log(err.msg));
  }, [params.itemId]);

  async function buy() {
    setMessage({ message: "Connecting MetaMask...wait...", type: "load" });
    await buyNft(nft.nftContract, nft.itemId, nft.price)
      .then((nftId) => {
        setMessage({
          message: "NFT successfully purchased!",
          type: "successfully",
        });
        window.location.href = "/details/" + Number(nftId);
      })
      .catch((err) => setMessage({ message: err.msg, type: "rejected" }));
  }

  return (
    <main>
      <section className="bg-red-700 h-60"></section>
      <section>
        <div
          style={{ margin: "0 auto" }}
          className="absolute left-1/2 -translate-y-3/4 -translate-x-1/2 rounded w-96 h-96 bg-green-400 border"
        ></div>
        <div className="flex text-purple-950 p-40 flex-col mt-24 items-center">
          <h1 className="text-4xl font-bold">
            Shiba Suspicious #{String(nft.tokenId)}
          </h1>
          <h1 className="p-2 mt-2 flex items-center bg-rose-50 hover:bg-rose-100 cursor-pointer rounded">
            {nft.nftContract}
            <FaRegCopy className="ml-4"></FaRegCopy>
          </h1>
          <p className="mt-5">Status: {nft.sold ? "Completed" : "For Sale"}</p>
          <p className="mt-5">
            Price: {nft.price ? ethers.formatEther(String(nft.price)) : "N/A"}
          </p>

          <p className="mt-5">I'm reaching for the random...</p>
          <div className="mt-8">
            <button
              disabled={nft.sold}
              onClick={buy}
              className="p-4 min-w-48 ease-linear  duration-100 bg-slate-600 hover:bg-slate-700 border-white  rounded-lg text-white font-semibold"
            >
              BUY NOW
            </button>
            {message.message ? <Message {...message} /> : ""}
          </div>
        </div>
      </section>
    </main>
  );
}
