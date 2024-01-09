import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Home() {
  return (
    <>
      <section className="p-16 rounded-xl bg-yellow-400 mx-9 flex relative">
        <div
          style={{ height: "500px" }}
          className="rounded bg-black w-2/4"
        ></div>
        <div className="ml-16 w-2/4">
          <h1 className="text-4xl mt-24">The Art Chain Marketplace is LIVE</h1>
          <p className="mt-10 text-xl">
            The new and modern NFT marketplace on Polygon, powered by Allex
            Antoniollo. Buy, mint, and sell your Polygon NFTs today!
          </p>
          <div className="mt-12">
            <button className="bg-gray-900 ease-linear duration-150 hover:bg-black rounded-xl text-md text-white cursor-pointer px-7 py-3">
              MINT NFT
            </button>
            <button className="bg-yellow-500 ease-linear duration-150 hover:bg-yellow-600 rounded-xl text-md cursor-pointer px-7 py-3 ml-6">
              SELL
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 -left-5 p-3 bg-white rounded-full shadow-md cursor-pointer">
          <IoIosArrowBack />
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 -right-5 p-3 bg-white rounded-full shadow-md cursor-pointer">
          <IoIosArrowForward />
        </div>
      </section>
      <section className="py-12 flex justify-center">
        <div className="w-14 rounded h-1 bg-gray-300 mx-1 cursor-pointer"></div>
        <div className="w-14 rounded h-1 bg-gray-300 mx-1 cursor-pointer"></div>
        <div className="w-14 rounded h-1 bg-gray-300 mx-1 cursor-pointer"></div>
        <div className="w-14 rounded h-1 bg-gray-300 mx-1 cursor-pointer"></div>
      </section>
      <h1>Collection NFTs</h1>
    </>
  );
}
