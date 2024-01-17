"use client";
import Carousel from "@/components/carousel";
import { NFT } from "@/components/nft";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import { loadNfts, MarketItem } from "@/services/Web3Service";
export default function Home() {
  const [nftsl, setNftsl] = useState<MarketItem[]>([]);
  const [totalNfts, setTotalNfts] = useState<MarketItem[]>([]);

  useEffect(() => {
    loadNfts()
      .then((nfts) => {
        setTotalNfts(nfts);
        setNftsl(nfts);

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sentence = urlParams.get("sentence")?.toLowerCase() || undefined;
        if (sentence !== undefined) {
          setNftsl(
            nfts.filter(
              (nft) => nft.name.toLowerCase().indexOf(sentence) !== -1
            )
          );
        } else {
          setNftsl(nfts);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function onSearchChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const phrase = evt.target.value.toLowerCase();
    setNftsl(
      totalNfts.filter((nft) => nft.name.toLowerCase().indexOf(phrase) !== -1)
    );
  }

  return (
    <div className="">
      <Carousel></Carousel>
      <section
        id="nfts"
        className="rounded-md mx-9 mb-12 dark:border-neutral-600 border p-8"
      >
        <div className="border-b dark:border-neutral-600 pb-3 flex justify-between">
          <div className="text-3xl dark:text-neutral-300 flex font-medium">
            <FaFire></FaFire>
            <p className="ml-4 ">Latest NFTs</p>
          </div>
          <div className="relative">
            <input
              onChange={onSearchChange}
              className="ease-linear duration-150 dark:text-neutral-700 dark:bg-neutral-200 rounded-xl dark:border-neutral-600 border p-2 pl-8 outline-none focus:border-purple-900 shadow-sl hover:shadow-lg"
              placeholder="Search for NFTs..."
              type="text"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <CiSearch />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-around mt-6">
          {nftsl && nftsl.length ? (
            nftsl.map((nft: MarketItem, index) => (
              <>
                <NFT key={index} {...nft} />
              </>
            ))
          ) : (
            <p>No NFTS for sale</p>
          )}
        </div>
      </section>
    </div>
  );
}
