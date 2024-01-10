import Image from "next/image";
import HoverDiv from "../components/hoverDiv";
import BootstrapCarousel from "./carousel/page";

export default function Home() {
  return (
    <>
      <BootstrapCarousel></BootstrapCarousel>

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
