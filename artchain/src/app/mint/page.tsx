import Link from "next/link";
import { CiGrid41 } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiImageThin } from "react-icons/pi";
import { TfiCloud } from "react-icons/tfi";

export default function Mint() {
  return (
    <main className="dark:bg-neutral-900">
      <section className="flex sm:flex-col">
        <form className="p-16 sm:p-8 dark:text-neutral-300 w-1/2 sm:w-full">
          <h1 className="text-5xl mb-14 font-medium">
            <TfiCloud className="mr-4 inline"></TfiCloud>Create your NFT
          </h1>
          <Link
            href="/mint721"
            className="border dark:border-neutral-500 content hover:shadow-md items-center rounded-lg shadow flex p-7 mb-8"
          >
            <div className="mr-8">
              <h3 className="text-xl font-semibold mb-4">
                <PiImageThin className="inline-block size-8 mr-4"></PiImageThin>
                Mint ERC721
              </h3>
              <p>In ERC721 each token is unique and indivisible.</p>
            </div>
            <div className="ml-6">
              <FaArrowRightLong></FaArrowRightLong>
            </div>
          </Link>
          <Link
            href="/mint1155"
            className="border dark:border-neutral-500 content hover:shadow-md items-center rounded-lg shadow flex p-7 mb-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">
                <CiGrid41 className="inline-block size-8 mr-4"></CiGrid41>Mint
                ERC1155
              </h3>
              <p>In ERC1155 the tokens can be unique or non-unique.</p>
            </div>
            <div className="ml-6">
              <FaArrowRightLong></FaArrowRightLong>
            </div>
          </Link>
        </form>
        <div
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2022/04/20/12/16/abstract-art-7145098_1280.jpg')",
          }}
          className="w-1/2 lg:bg-left bg-center"
        ></div>
      </section>
    </main>
  );
}
