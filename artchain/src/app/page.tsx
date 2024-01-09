import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import HoverDiv from "./components/hoverDiv";

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
      <section className="py-12 mx-9 flex justify-center">
        <div className="w-14 rounded h-1 bg-gray-300 mx-1 cursor-pointer"></div>
        <div className="w-14 rounded h-1 bg-gray-300 mx-1 cursor-pointer"></div>
        <div className="w-14 rounded h-1 bg-gray-300 mx-1 cursor-pointer"></div>
        <div className="w-14 rounded h-1 bg-gray-300 mx-1 cursor-pointer"></div>
      </section>
      <section className="rounded-md mx-9 border p-8">
        <h1 className="border-b text-3xl font-medium pb-3">Latest NFTs</h1>
        <div className="flex flex-wrap mt-6">
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
        </div>
      </section>
      <section className="mt-12"></section>
    </>
  );
}
