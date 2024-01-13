"use client";
import { sellNFT, SellNewNFT } from "@/services/Web3Service";
import { useState } from "react";
import { ChangeEvent } from "react";

export default function Sell() {
  const [nft, setNft] = useState<SellNewNFT>({});
  const [message, setMessage] = useState<string>("");

  function onInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setNft((prevState) => ({
      ...prevState,
      [evt.target.id]: evt.target.value,
    }));
  }

  async function sell() {
    setMessage("nft");
    console.log(message);

    if (!nft) {
      return;
    }
    setMessage("Connecting MetaMask...wait...");
    await sellNFT(nft)
      .then((itemId) => {
        setMessage("NFT has been added on marketplace!");
        // window.location.href = "/details/" + itemId;
      })
      .catch((err) => setMessage(err.msg));
  }
  return (
    <main>
      <section className="align bg-custom justify-center py-10 flex">
        <div className="flex px-10 flex-col w-1/2 items-center py-4 bg-white border">
          <h1 className="text-2xl">Sell Your NFT</h1>

          <input
            type="text"
            id="address"
            value={nft.address}
            onChange={onInputChange}
            className="outline-none border rounded pl-2 py-2 w-full mt-4"
            placeholder="Contract Address"
          />
          <input
            id="id"
            value={nft.tokenId}
            onChange={onInputChange}
            className="outline-none border rounded pl-2 py-2 w-full mt-4"
            type="number"
            placeholder="NFT ID"
          />
          <input
            id="price"
            onChange={onInputChange}
            type="number"
            value={nft.price}
            placeholder="Price in MATIC"
            className="outline-none border rounded pl-2 py-2 w-full mt-4"
          />
          <button
            onClick={sell}
            style={{
              backgroundColor: "#6D57FC",
            }}
            className="px-6 py-3 rounded text-white w-2/3 mt-4"
          >
            SELL
          </button>
          {!message ? (
            <div className=" bg-neutral-600 px-6 py-3 rounded text-white border mt-12">
              {message}
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </main>
  );
}
