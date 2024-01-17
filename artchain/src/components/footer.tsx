import Image from "next/image";
import { FaDiscord } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <footer style={{ backgroundColor: "#1968B7" }} className="p-16 pb-0 ">
        <div className="flex">
          <Image
            height={150}
            width={150}
            alt="Logo Marketplace"
            src="/logo.jpg"
            className="rounded cursor-pointer"
          ></Image>
          {""}
          <h1 className="ml-5 text-3xl text-white dark:text-neutral-900 font-semibold">
            Art Chain Marketplace
          </h1>
        </div>
        <div className="flex mt-4 mb-8 dark:text-neutral-900 text-white">
          <FaXTwitter className="cursor-pointer ease-linear  duration-100 rounded dark:bg-blue-800 bg-blue-500 hover:bg-blue-600 hover:border-white p-2 mr-3 size-12 "></FaXTwitter>
          <FaDiscord className=" p-2 rounded ease-linear  duration-100 bg-blue-500 dark:bg-blue-800 hover:bg-blue-600 hover:border-white cursor-pointer size-12 "></FaDiscord>
        </div>
        <div className="border-t dark:border-neutral-800 py-8 dark:text-neutral-900 text-white ">
          <h1 className="text-2xl  ">Stay in the loop</h1>
          <p className="mt-3 max-w-lg ">
            Join our mailing list to stay in the loop with our newest feature
            releases, NFT drops, and tips and tricks for navigating ArtChain.
          </p>
          <div className="mt-4">
            <input
              type="email"
              className="outline-none w-1/2 ease-linear duration-100 shadow-sl hover:shadow-lg focus:border-2 rounded-lg border py-2 px-4 mr-3"
              placeholder="Your email address"
            />
            <button className="rounded-lg ease-linear  duration-100 bg-blue-500 hover:bg-blue-600 font-semibold text-white px-6 py-2">
              Sign up
            </button>
          </div>
        </div>
        <div className="border-t dark:border-neutral-800 py-2 flex text-white dark:text-neutral-900 justify-center items-center column">
          <p>Copyright Allex Antoniollo, 2024</p>
        </div>
      </footer>
    </>
  );
}
