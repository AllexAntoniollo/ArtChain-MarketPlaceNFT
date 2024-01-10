export default function Sell() {
  return (
    <main className="">
      <section className="align justify-center py-10 flex">
        <form className="flex px-10 flex-col w-1/2 items-center py-4 bg-white border">
          <h1 className="text-2xl">Sell Your NFT</h1>

          <input
            type="text"
            className="outline-none border rounded pl-2 py-2 w-full mt-4"
            placeholder="Contract Address"
          />
          <input
            className="outline-none border rounded pl-2 py-2 w-full mt-4"
            type="number"
            placeholder="NFT ID"
          />
          <input
            type="number"
            placeholder="Price in MATIC"
            className="outline-none border rounded pl-2 py-2 w-full mt-4"
          />
          <button className="px-6 py-3 rounded hover:bg-slate-600 text-white bg-slate-500 w-2/3 mt-4">
            SELL
          </button>
        </form>
      </section>
    </main>
  );
}
