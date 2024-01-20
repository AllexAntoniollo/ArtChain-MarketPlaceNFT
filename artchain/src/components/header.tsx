"use client";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { doLogin } from "@/services/Web3Service";
import DarkModeButton from "./darkModeButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/contexts/WalletContext";
import { NewMessage, Message } from "../components/message";

export default function Header() {
  const { wallet, setWallet } = useGlobalContext();
  const router = useRouter();
  const [message, setMessage] = useState<NewMessage>({} as NewMessage);
  async function btnLoginClick() {
    try {
      const result = await doLogin();

      if (result !== null && result !== undefined) setWallet(result);
      else
        setMessage({ message: "Wallet not found/allowed.", type: "rejected" });
    } catch (err) {
      setMessage({ message: (err as Error).message, type: "rejected" });
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      redirectToSearch();
    }
  };

  const redirectToSearch = () => {
    const searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;

    if (searchInput) {
      const searchText = searchInput.value.trim();
      if (searchText) {
        router.push(`/?sentence=${searchText}#nfts`);
      }
    }
  };

  return (
    <header
      style={{ margin: "0" }}
      className="shadow-md sm:flex-col sm:items-center dark:bg-neutral-900 border-b dark:text-neutral-300 dark:border-gray-950 flex-row border-gray-200 flex items-center justify-evenly w-full py-4 px-2 "
    >
      <Link href="/">
        <Image
          height={55}
          width={55}
          alt="Logo Marketplace"
          src="/logo.jpg"
          className="rounded sm:size-16 cursor-pointer"
        ></Image>
      </Link>

      <h3 className="flex items-center sm:mt-3 cursor-pointer">
        All Categories <IoIosArrowDown className="ml-1"></IoIosArrowDown>
      </h3>
      <div className="relative sm:mt-3">
        <input
          id="searchInput"
          onKeyDown={handleKeyDown}
          className="ease-linear duration-150 dark:text-neutral-700 dark:bg-neutral-200 rounded-xl border p-2 pl-8 outline-none focus:border-purple-900 shadow-sl hover:shadow-lg"
          placeholder="Search for NFTs..."
          type="text"
        />

        <div
          onClick={redirectToSearch}
          className="absolute inset-y-0 dark:text-neutral-700 cursor-pointer left-0 flex items-center pl-2"
        >
          <CiSearch />
        </div>
      </div>
      <Link
        className="text-xl sm:mt-3 font-medium tracking-looser"
        href="/mint"
      >
        MINT
      </Link>
      <Link
        className="text-xl sm:mt-3 font-medium tracking-looser"
        href="/sell"
      >
        SELL
      </Link>
      <DarkModeButton></DarkModeButton>
      {!wallet ? (
        <button
          onClick={btnLoginClick}
          className="ease-linear sm:mt-3 dark:hover:bg-gray-900 duration-150 dark:bg-neutral-800 dark:border-purple-700 flex items-center border border-purple-900 justify-center rounded bg-white px-3 py-2 hover:bg-purple-900 hover:text-white hover:shadow-md "
        >
          <p>Connect Wallet</p>
        </button>
      ) : (
        <>
          <Link
            className="hover:bg-gray-50 dark:bg-zinc-950 transition-all duration-300 dark:hover:bg-zinc-800 flex bg-white rounded-xl items-center font-medium p-3"
            href="/profile"
          >
            <div className="mr-2 rounded-full bg-green-200 w-7 h-7"></div>
            <div>{wallet.slice(0, 6) + "..." + wallet.slice(-3)}</div>
          </Link>
        </>
      )}
      {message.message ? <Message {...message} /> : ""}
    </header>
  );
}
