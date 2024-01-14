"use client";
import Link from "next/link";
import React, { useState } from "react";

const HoverDiv = (props: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`container ${isHovered ? "hovered" : ""}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Link href={"/details/" + props.itemId} className={"hiddenDiv"}>
        View Details
      </Link>
    </div>
  );
};

export default HoverDiv;
