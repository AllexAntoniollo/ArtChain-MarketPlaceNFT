import Image from "next/image";
import { IoPencilSharp } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa6";
import HoverDiv from "@/components/hoverDiv";

export default function Profile() {
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
          <h1 className="p-2 mt-2 flex items-center bg-rose-50 cursor-pointer rounded">
            0xc59Dc14b04Fff99ED14Ca28eE3653799A256222A{" "}
            <FaRegCopy className="ml-4"></FaRegCopy>
          </h1>
          <p className="mt-5">I'm reaching for the random...</p>
        </div>
      </section>
      <section>
        <div className="flex mx-16 py-5">
          <h1 className="border-b cursor-pointer grow text-center text-gray-600 hover:border-purple-800 hover hover:text-purple-800 py-7">
            COLLECTIBLES
          </h1>
          <h1 className="grow cursor-pointer text-gray-600 hover:border-purple-800 hover hover:text-purple-800 border-b text-center py-7">
            CREATED
          </h1>
          <h1 className="grow cursor-pointer text-gray-600 hover:border-purple-800 hover hover:text-purple-800 border-b text-center py-7">
            ON SALE
          </h1>
        </div>
        <div className="mx-16 py-5">
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
    </main>
  );
}
