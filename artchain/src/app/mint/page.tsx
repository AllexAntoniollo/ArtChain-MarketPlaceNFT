export default function Mint() {
  return (
    <main>
      <section className="flex justify-center relative bg-custom pb-24">
        <div className="grow max-w-xs mr-4 mt-5 rounded-2xl bg-white border ease-linear duration-200 relative p-2">
          <div className="w-full rounded-lg h-96  bg-red-800"></div>
          <div className="ml-3">
            <p className="font-light text-slate-700 text-sm mt-2">by: Allex</p>
            <p className="text-xl mt-2">Shiba Smile</p>
          </div>
        </div>
      </section>
      <section className="align justify-center py-10 bg-green-400 flex">
        <form className="flex px-10 flex-col w-1/2 items-center py-4 bg-white relative bottom-20 border">
          <h1 className="text-2xl">Create Your NFT</h1>
          <input
            type="text"
            placeholder="Name"
            className="outline-none border rounded pl-2 py-2 w-full mt-4"
          />
          <input
            type="text"
            className="outline-none border rounded pl-2 py-2 w-full mt-4"
            placeholder="Author"
          />
          <input
            className="outline-none border rounded pl-2 py-2 w-full mt-4"
            type="file"
          />
          <button
            style={{
              backgroundColor: "#6D57FC",
            }}
            className="px-6 py-3 rounded  text-white w-2/3 mt-4"
          >
            MINT
          </button>
        </form>
      </section>
    </main>
  );
}
