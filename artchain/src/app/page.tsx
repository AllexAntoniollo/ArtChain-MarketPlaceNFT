import HoverDiv from "../components/hoverDiv";
import Carousel from "@/components/carousel";
export default function Home() {
  return (
    <>
      <Carousel></Carousel>

      <section className="rounded-md mx-9 border p-8">
        <h1 className="border-b text-3xl font-medium pb-3">Latest NFTs</h1>
        <div className="flex flex-wrap justify-around mt-6">
          <div className="max-w-xs w-80 mr-4 mt-5 rounded-2xl border ease-linear duration-200 relative p-2 hover:bottom-3 hover:border-2 hover:shadow">
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
          <div className="max-w-xs w-80 mr-4 mt-5 rounded-2xl border ease-linear duration-200 relative p-2 hover:bottom-3 hover:border-2 hover:shadow">
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
          <div className="max-w-xs w-80 mr-4 mt-5 rounded-2xl border ease-linear duration-200 relative p-2 hover:bottom-3 hover:border-2 hover:shadow">
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
          <div className="max-w-xs w-80 mr-4 mt-5 rounded-2xl border ease-linear duration-200 relative p-2 hover:bottom-3 hover:border-2 hover:shadow">
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
