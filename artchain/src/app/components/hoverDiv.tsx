"use client";
import React, { useState } from "react";

const HoverDiv = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`container ${isHovered ? "hovered" : ""}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className={"hiddenDiv"}>View Details</div>
    </div>
  );
};

export default HoverDiv;
