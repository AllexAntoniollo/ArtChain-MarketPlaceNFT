import Image from "next/image";
import { IoPencilSharp } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa6";
import HoverDiv from "@/components/hoverDiv";

export default function Details() {
  return (
    <main>
      <section className="bg-red-700 h-60"></section>
      <section>
        <div
          style={{ margin: "0 auto" }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 rounded w-96 h-96 bg-green-400 border"
        ></div>
        <div className="flex text-purple-950 p-40 flex-col mt-24 items-center">
          <h1 className="text-4xl font-bold">Shiba Suspicious #614</h1>
          <h1 className="p-2 mt-2 flex items-center bg-rose-50 cursor-pointer rounded">
            0xc59Dc14b04Fff99ED14Ca28eE3653799A256222A{" "}
            <FaRegCopy className="ml-4"></FaRegCopy>
          </h1>
          <p className="mt-5">Status: sold</p>
          <p className="mt-5">Price: 20</p>
          <p className="mt-5">I'm reaching for the random...</p>
          <form className="mt-8">
            <button className="p-4 min-w-48 ease-linear  duration-100 bg-slate-600 hover:bg-slate-700 border-white  rounded-lg text-white font-semibold">
              BUY NOW
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
