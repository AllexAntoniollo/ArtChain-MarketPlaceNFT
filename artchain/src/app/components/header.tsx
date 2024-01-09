"use client";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import DarkModeButton from "./darkModeButton";
export default function Header() {
  return (
    <header className="shadow-sl border-b-2 border-gray-200 flex items-center justify-evenly w-full py-4 px-2 ">
      <Link href="/">
        <Image
          height={55}
          width={55}
          alt="Logo Marketplace"
          src="/logo.jpg"
          className="rounded cursor-pointer"
        ></Image>
      </Link>

      <h3 className="flex items-center cursor-pointer">
        All Categories <IoIosArrowDown className="ml-1"></IoIosArrowDown>
      </h3>
      <div className="relative">
        <input
          className="ease-linear duration-150 rounded-xl border p-2 pl-8 outline-none focus:border-purple-900 shadow-sl hover:shadow-lg"
          placeholder="Search for NFTs..."
          type="text"
        />

        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
          <CiSearch />
        </div>
      </div>
      <Link className="text-xl font-medium tracking-looser" href="/mint">
        MINT
      </Link>
      <Link className="text-xl font-medium tracking-looser" href="/shop">
        SHOP
      </Link>
      <DarkModeButton></DarkModeButton>
      <button className="ease-linear duration-150 flex items-center border-1 border border-purple-900 justify-center rounded bg-white px-3 py-2 hover:bg-purple-900 hover:text-white hover:shadow-md ">
        <p>Connect Wallet</p>
      </button>
    </header>
  );
}
