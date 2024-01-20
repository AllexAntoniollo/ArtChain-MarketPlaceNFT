"use client";
import { NewNFT, uploadAndCreate } from "@/services/Web3Service";
import { ChangeEvent, useState } from "react";
import { NewMessage, Message } from "@/components/message";

export default function Mint1155() {
  const [nft, setNft] = useState<NewNFT>({} as NewNFT);
  const [message, setMessage] = useState<NewMessage>({} as NewMessage);

  function onInputChange(
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setNft((prevState) => ({
      ...prevState,
      [evt.target.id]: evt.target.value,
    }));
  }
  function onFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target.files && evt.target.files.length) {
      const file = evt.target.files[0];
      setNft((prevState) => ({ ...prevState, image: file }));
    }
  }

  async function mint() {
    if (!nft || !nft.image) {
      setMessage({
        message: "Please upload an image before minting.",
        type: "rejected",
      });
      return;
    }
    setMessage({ message: "Connecting MetaMask...wait...", type: "load" });
    await uploadAndCreate(nft)
      .then((tokenId) => {
        setMessage({
          message: "NFT created successfully!",
          type: "successfully",
        });
      })
      .catch((err) => setMessage({ message: err.msg, type: "rejected" }));
  }
  return (
    <main>
      <section className="flex justify-center relative bg-custom pb-24">
        <div className="grow max-w-xs mr-4 mt-5 rounded-2xl dark:text-neutral-100 dark:bg-neutral-700 dark:border-neutral-400 bg-white border ease-linear duration-200 relative p-2">
          <h1 className="text-center py-3 text-2xl">Your NFT</h1>

          <div
            style={{
              backgroundImage: `url(${
                nft.image ? URL.createObjectURL(nft.image) : ""
              })`,
              backgroundSize: "100%",
            }}
            className="w-full bg-no-repeat bg-center bg rounded-lg h-64  bg-gray-800 dark:bg-gray-300"
          ></div>
          <div className="ml-3">
            <div className="flex justify-between">
              <p className="font-light text-slate-700 dark:text-neutral-300 text-sm mt-2">
                by: {nft.author || "Author"}
              </p>
              <p className="font-light text-slate-700 dark:text-neutral-300 text-sm mt-2 ">
                1 of {nft.quantity}
              </p>
            </div>
            <p className="text-xl mt-2">{nft.name || "NFT name"}</p>
            <p className="text-mg mt-2">{nft.description || "Description"}</p>
          </div>
        </div>
      </section>
      <section className="align px-6 justify-center py-10 bg-green-400 dark:bg-green-800 flex">
        <div className="flex px-10 md:w-full flex-col w-1/2 rounded items-center py-4 dark:bg-neutral-700 dark:border-neutral-400 bg-white relative bottom-20 border">
          <h1 className="text-2xl dark:text-neutral-200">Create Your NFT</h1>
          <input
            onChange={onInputChange}
            type="text"
            placeholder="Name"
            id="name"
            value={nft.name}
            className="outline-none dark:bg-slate-100 border rounded dark:border-neutral-400 pl-2 py-2 w-full mt-4"
          />
          <input
            onChange={onInputChange}
            type="text"
            id="author"
            value={nft.author}
            className="outline-none dark:bg-slate-100 border rounded dark:border-neutral-400 pl-2 py-2 w-full mt-4"
            placeholder="Author"
          />
          <input
            onChange={onInputChange}
            type="number"
            id="quantity"
            value={nft.quantity}
            className="outline-none border dark:text-black dark:bg-slate-100 rounded dark:border-neutral-400 pl-2 py-2 w-full mt-4"
            placeholder="Amount/Supply"
          />
          <textarea
            onChange={onInputChange}
            placeholder="Description"
            id="description"
            value={nft.description}
            className="outline-none border dark:text-black dark:bg-slate-100 rounded dark:border-neutral-400 pl-2 py-2 w-full mt-4"
          />
          <input
            onChange={onFileChange}
            className="outline-none border  dark:text-neutral-200 rounded dark:border-neutral-400 pl-2 py-2 w-full mt-4"
            type="file"
            id="file"
          />
          <button
            onClick={mint}
            className="px-6 py-3 rounded ease-linear  duration-100 dark:bg-indigo-700 dark:hover:bg-indigo-800 bg-indigo-400 hover:bg-indigo-500 text-white w-2/3 mt-4"
          >
            MINT NOW
          </button>
          {message.message ? <Message {...message} /> : ""}
        </div>
      </section>
    </main>
  );
}
