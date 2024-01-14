"use client";
import { sellNFT, SellNewNFT } from "@/services/Web3Service";
import { useState } from "react";
import { ChangeEvent } from "react";
import { NewMessage, Message } from "@/components/message";
export default function Sell() {
  const [nft, setNft] = useState<SellNewNFT>({});
  const [message, setMessage] = useState<NewMessage>({} as NewMessage);

  function onInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setNft((prevState) => ({
      ...prevState,
      [evt.target.id]: evt.target.value,
    }));
  }

  async function sell() {
    if (!nft) {
      return;
    }

    setMessage({ type: "load", message: "Connecting MetaMask...wait..." });
    await sellNFT(nft)
      .then((itemId) => {
        setMessage({
          type: "successfully",
          message: "NFT has been added on marketplace!",
        });

        window.location.href = "/details/" + itemId;
      })
      .catch((err) => setMessage({ message: err.msg, type: "rejected" }));
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
            id="tokenId"
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
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded text-white w-2/3 mt-4"
          >
            SELL
          </button>
          {message.message ? <Message {...message} /> : ""}
        </div>
      </section>
    </main>
  );
}
