"use client";
import Carousel from "@/components/carousel";
import { NFT } from "@/components/nft";
import { useEffect, useState } from "react";
import { loadNfts, MarketItem } from "@/services/Web3Service";
export default function Home() {
  const [nfts, setNfts] = useState<MarketItem[]>([]);

  useEffect(() => {
    loadNfts()
      .then((nfts) => setNfts(nfts))
      .catch((err) => console.log(err.msg));
  }, []);

  return (
    <>
      <Carousel></Carousel>
      <section className="rounded-md mx-9 border p-8">
        <h1 className="border-b text-3xl font-medium pb-3">Latest NFTs</h1>
        <div className="flex flex-wrap justify-around mt-6">
          {nfts && nfts.length
            ? nfts.map((nft: MarketItem, index) => (
                <>
                  <NFT key={index} {...nft} />
                </>
              ))
            : "No NFTS for sale"}
        </div>
      </section>
      <section className="mt-12"></section>
    </>
  );
}
