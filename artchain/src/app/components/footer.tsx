import Image from "next/image";
import { FaDiscord } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <footer className="border-t p-16 pb-0 bg-purple-500">
        <div className="flex">
          <Image
            height={150}
            width={150}
            alt="Logo Marketplace"
            src="/logo.jpg"
            className="rounded cursor-pointer"
          ></Image>
          {""}
          <h1 className="ml-5 text-3xl text-white font-semibold">
            Art Chain Marketplace
          </h1>
        </div>
        <div className="flex mt-4 mb-8">
          <FaXTwitter className="cursor-pointer bg-purple-600 rounded hover:border-white p-2 mr-3 size-12 text-white "></FaXTwitter>
          <FaDiscord className="bg-purple-600 p-2 rounded hover:border-white cursor-pointer size-12 text-white"></FaDiscord>
        </div>
        <div className="border-t py-8">
          <h1 className="text-2xl text-white">Stay in the loop</h1>
          <p className="mt-3 max-w-lg text-white">
            Join our mailing list to stay in the loop with our newest feature
            releases, NFT drops, and tips and tricks for navigating ArtChain.
          </p>
          <div className="mt-4">
            <input
              type="email"
              className="outline-none w-1/2 ease-linear duration-100 shadow-sl hover:shadow-lg focus:border-2 rounded-lg border py-2 px-4 mr-3"
              placeholder="Your email address"
            />
            <button className="rounded-lg ease-linear duration-100 hover:bg-purple-600 font-semibold text-white bg-purple-400 px-6 py-2">
              Sign up
            </button>
          </div>
        </div>
        <div className="border-t py-2 flex justify-center items-center column">
          <p>Copyright Allex Antoniollo, 2024</p>
        </div>
      </footer>
    </>
  );
}
