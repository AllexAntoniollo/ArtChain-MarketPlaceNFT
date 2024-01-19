"use client";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getDetails, MarketItem, buyNft } from "@/services/Web3Service";
import { ethers } from "ethers";
import { NewMessage, Message } from "@/components/message";

export default function Details() {
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const itemId = params.itemId;
  const [nft, setNft] = useState<MarketItem>({} as MarketItem);
  const [message, setMessage] = useState<NewMessage>({} as NewMessage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (itemId) {
          const nft = await getDetails(Number(itemId));
          if (Object.keys(nft).length === 0) {
            window.location.href = "/";
          } else {
            setNft(nft);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [itemId]);

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
  const handleCopyClick = () => {
    navigator.clipboard.writeText(nft.nftContract);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="dark:bg-neutral-900">
      <section
        style={{
          backgroundImage: "url(/star.jpg)",
          backgroundSize: "100%",
        }}
        className="border-b dark:border-neutral-400 border-black h-60"
      ></section>
      <section>
        <div
          style={{
            margin: "0 auto",
            backgroundImage: nft.image === undefined ? "" : `url(${nft.image})`,
            backgroundSize: "100%",
          }}
          className="absolute dark:border-neutral-400 bg-white dark:bg-neutral-600 left-1/2 bg-center bg-no-repeat bg-contain  -translate-y-3/4 -translate-x-1/2 rounded w-96 h-96 border border-black"
        ></div>
        <div className="flex text-purple-950 dark:text-purple-600 p-40 flex-col mt-24 items-center">
          <h1 className="text-4xl font-bold">
            {nft.name} #{String(nft.tokenId)}
          </h1>
          <p className=" font-light mt-2">By: {nft.author}</p>
          <h1
            onClick={handleCopyClick}
            className="p-2 mt-2 flex items-center dark:bg-violet-100 dark:hover:bg-violet-200 bg-rose-50 hover:bg-rose-100 cursor-pointer rounded"
          >
            {nft.nftContract}
            {copied ? (
              <FaCheck className="ml-4" />
            ) : (
              <FaRegCopy className="ml-4" />
            )}
          </h1>
          <p className="mt-5">Status: {nft.sold ? "Completed" : "For Sale"}</p>
          <p className="mt-5">
            Price: {nft.price ? ethers.formatEther(String(nft.price)) : "N/A"}
          </p>

          <p className="mt-5">{nft.description}</p>
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
