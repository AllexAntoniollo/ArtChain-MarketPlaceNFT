import React, { useState } from "react";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";

export default function darkModeButton() {
  const [modoClaro, setModoClaro] = useState(false);

  const toggleModoClaro = () => {
    setModoClaro(!modoClaro);
  };

  return (
    <div
      className={`bg-purple-900 p-1 w-16 rounded-full cursor-pointer relative`}
      onClick={toggleModoClaro}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full relative ${
          modoClaro ? "animacaoLeft" : "animacaoRight"
        }
       `}
      ></div>
      <CiLight
        className={`absolute w-5 h-5 text-white left-2 top-1/2 transform -translate-y-1/2 transition-opacity ${
          modoClaro ? "opacity-100" : "opacity-0"
        }`}
      />
      <CiDark
        className={`absolute text-white right-2 w-5 h-5 top-1/2 transform -translate-y-1/2 transition-opacity ${
          modoClaro ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
