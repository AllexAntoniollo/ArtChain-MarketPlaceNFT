"use client";
import Link from "next/link";
import React, { useState } from "react";

const HoverDiv = (props: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`container  ${isHovered ? "hovered" : ""}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Link
        href={"/details/" + props.itemId}
        className={
          "hiddenDiv hover:bg-gray-950 dark:bg-neutral-200 dark:text-neutral-700 dark:hover:bg-white transition-all duration-300 bg-gray-900"
        }
      >
        View Details
      </Link>
    </div>
  );
};

export default HoverDiv;
