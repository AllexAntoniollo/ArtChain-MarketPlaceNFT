import HoverDiv from "../components/hoverDiv";
import { ethers } from "ethers";
export function NFT(props: any) {
  return (
    <div className="max-w-xs w-80 mr-4 mt-5 rounded-2xl border p-2 content shadow  hover:shadow-md">
      <div className="w-full rounded-lg h-64  bg-red-800">
        <HoverDiv itemId={props.itemId}></HoverDiv>
      </div>
      <div className="mx-3">
        <div className="flex justify-between">
          <p className="font-light text-slate-700 text-sm mt-2">by: Author</p>
          <p className="font-light text-slate-700 text-sm mt-2 ">1 of 1</p>
        </div>{" "}
        <p className="text-xl mt-2">Shiba Smile</p>
      </div>
      <div className="flex justify-evenly rounded bg-gray-100 mt-3 text-sm">
        <div>
          <p className="font-light text-slate-700">Status:</p>
          <p>{props.sold ? "Completed" : "For Sale"}</p>
        </div>
        <div>
          <p className="font-light text-slate-700">Price:</p>
          <p>
            {props.price ? ethers.formatEther(String(props.price)) : "N/A"}{" "}
            MATIC
          </p>
        </div>
      </div>
    </div>
  );
}
