"use client";
import Carousel from "@/components/carousel";
import { NFT } from "@/components/nft";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import { loadNfts, MarketItem } from "@/services/Web3Service";
export default function Home() {
  const [nfts, setNfts] = useState<MarketItem[]>([]);
  const [totalNfts, setTotalNfts] = useState<MarketItem[]>([]);

  useEffect(() => {
    loadNfts()
      .then((nfts) => {
        setTotalNfts(nfts);
        setNfts(nfts);
      })
      .catch((err) => console.log(err.msg));
  }, []);
  function onSearchChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const sentence = evt.target.value.toLocaleLowerCase();
    setNfts(
      totalNfts.filter((nft) => nft.name.toLowerCase().indexOf(sentence) !== -1)
    );
  }

  return (
    <>
      <Carousel></Carousel>
      <section id="nfts" className="rounded-md mx-9 border p-8">
        <h1 className="border-b  pb-3 flex justify-between">
          <p className="text-3xl flex font-medium">
            <FaFire></FaFire>
            <p className="ml-4">Latest NFTs</p>
          </p>{" "}
          <div className="relative">
            <input
              onChange={onSearchChange}
              className="ease-linear duration-150 rounded-xl border p-2 pl-8 outline-none focus:border-purple-900 shadow-sl hover:shadow-lg"
              placeholder="Search for NFTs..."
              type="text"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <CiSearch />
            </div>
          </div>
        </h1>

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
