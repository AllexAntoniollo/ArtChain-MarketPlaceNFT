"use client";
import { IoPencilSharp } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa6";
import HoverDiv from "@/components/hoverDiv";
import { useState, useEffect } from "react";
import { NFT } from "@/components/nft";
import { MarketItem, loadNfts } from "@/services/Web3Service";

enum profileNFTs {
  Collectibles,
  Created,
  OnSale,
}

export default function Profile() {
  const [nfts, setNfts] = useState<MarketItem[]>([]);
  const [category, setCategory] = useState<profileNFTs>(
    profileNFTs.Collectibles
  );
  useEffect(() => {
    loadNfts()
      .then((nfts) => setNfts(nfts))
      .catch((err) => console.log(err.msg));
  }, [category]);
  function changeCategory(selectedCategory: profileNFTs) {
    setCategory(selectedCategory);
  }
  return (
    <main>
      <section className="bg-red-700 h-60"></section>
      <section>
        <div
          style={{ margin: "0 auto" }}
          className="rounded-full relative bottom-12 w-24 h-24 bg-green-400 border"
        >
          <IoPencilSharp className="absolute bottom-0 translate-y-full text-white size-7 cursor-pointer rounded bg-purple-950 p-1 inset-1/2 transform -translate-x-1/2"></IoPencilSharp>
        </div>
        <div className="flex text-purple-950 pb-12 flex-col items-center">
          <h1 className="text-4xl font-bold">Allex Antoniollo</h1>
          <h1 className="p-2 mt-2 flex items-center bg-rose-50 hover:bg-rose-100 cursor-pointer rounded">
            0xc59Dc14b04Fff99ED14Ca28eE3653799A256222A{" "}
            <FaRegCopy className="ml-4"></FaRegCopy>
          </h1>
          <p className="mt-5">I'm reaching for the random...</p>
        </div>
      </section>
      <section>
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
            CREATED
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
        <section className="mx-16 py-5">
          {category === profileNFTs.Collectibles ? (
            <div className="grow max-w-xs mr-4 mt-5 rounded-2xl border ease-linear duration-200 relative p-2 hover:bottom-3 hover:border-2 hover:shadow">
              <div className="w-full rounded-lg h-64  bg-red-800">
                <HoverDiv></HoverDiv>
              </div>
              <div className="ml-3">
                <p className="font-light text-slate-700 text-sm mt-2">
                  by: Allex
                </p>
                <p className="text-xl mt-2">Shiba Smile</p>
              </div>
              <div className="flex justify-evenly rounded bg-gray-100 mt-3 text-sm">
                <div>
                  <p className="font-light text-slate-700">Status:</p>
                  <p>Completed</p>
                </div>
                <div>
                  <p className="font-light text-slate-700">Price:</p>
                  <p>20 MATIC</p>
                </div>
              </div>
            </div>
          ) : category === profileNFTs.Created ? (
            <div className="grow max-w-xs mr-4 mt-5 rounded-2xl border ease-linear duration-200 relative p-2 hover:bottom-3 hover:border-2 hover:shadow">
              <div className="w-full rounded-lg h-64  bg-red-800">
                <HoverDiv></HoverDiv>
              </div>
              <div className="ml-3">
                <p className="font-light text-slate-700 text-sm mt-2">
                  by: Allex
                </p>
                <p className="text-xl mt-2">Shiba Smile</p>
              </div>
              <div className="flex justify-evenly rounded bg-gray-100 mt-3 text-sm">
                <div>
                  <p className="font-light text-slate-700">Status:</p>
                  <p>Completed</p>
                </div>
                <div>
                  <p className="font-light text-slate-700">Price:</p>
                  <p>20 MATIC</p>
                </div>
              </div>
            </div>
          ) : category === profileNFTs.OnSale ? (
            nfts && nfts.length ? (
              nfts.map((nft: MarketItem, index) => (
                <>
                  {nft.seller ===
                  "0xa8F5e4d1c612f0d36B7FB3f63F7e864da28d9FfA" ? (
                    <NFT
                      key={index}
                      itemId={nft.itemId}
                      price={nft.price}
                      sold={nft.sold}
                    />
                  ) : (
                    ""
                  )}
                </>
              ))
            ) : (
              ""
            )
          ) : (
            "No NFTS for sale"
          )}
        </section>
      </section>
    </main>
  );
}
