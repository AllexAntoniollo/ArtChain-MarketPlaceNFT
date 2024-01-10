export default function Sell() {
  return (
    <main>
      <section className="align bg-custom justify-center py-10 flex">
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
          <button
            style={{
              backgroundColor: "#6D57FC",
            }}
            className="px-6 py-3 rounded text-white w-2/3 mt-4"
          >
            SELL
          </button>
        </form>
      </section>
    </main>
  );
}
