import { MarketItem } from "@/services/Web3Service";
import HoverDiv from "../components/hoverDiv";
import { ethers } from "ethers";
export function NFT(props: MarketItem) {
  return (
    <div className="max-w-xs w-80 mr-4 mt-5 rounded-2xl border dark:border-neutral-600 p-2 content shadow  hover:shadow-md">
      <div
        style={{
          backgroundImage: `url(/pinata/getImage?uri=${props.image})`,
          backgroundSize: "100%",
        }}
        className="w-full bg-no-repeat bg-center rounded-lg h-64  "
      >
        <HoverDiv itemId={props.itemId}></HoverDiv>
      </div>
      <div className="mx-3 text-slate-700 dark:text-neutral-400">
        <div className="flex justify-between">
          <p className="font-light   text-sm mt-2">by: {props.author}</p>
        </div>{" "}
        <p className="text-xl mt-2">{props.name}</p>
      </div>
      <div className="flex justify-evenly rounded bg-gray-100 dark:bg-neutral-800 mt-3 text-sm">
        <div className="dark:text-neutral-200">
          <p className="font-light dark:text-neutral-400 text-slate-700">
            Status:
          </p>
          <p>{props.sold ? "Completed" : "For Sale"}</p>
        </div>
        <div className="dark:text-neutral-200">
          <p className="font-light dark:text-neutral-400 text-slate-700">
            Price:
          </p>
          <p>
            {props.price ? ethers.formatEther(String(props.price)) : "N/A"}{" "}
            MATIC
          </p>
        </div>
      </div>
    </div>
  );
}
