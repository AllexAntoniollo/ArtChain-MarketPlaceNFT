// carousel.tsx
"use client";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";

const Carousel = () => {
  const data = [
    { image: "/mountain.jpg" },
    { image: "/fantasyWhite.jpg" },
    { image: "/fantasy.jpg" },
  ];
  const [currentImg, setCurrentImg] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 });
  const carouselRef = useRef(null);

  useEffect(() => {
    let elem = carouselRef.current as unknown as HTMLDivElement;
    let { width, height } = elem.getBoundingClientRect();
    if (carouselRef.current) {
      setCarouselSize({
        width,
        height,
      });
    }
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentImg(index);
    setActiveImage(index);
  };
  const handlePrevClick = () => {
    setCurrentImg((prev) => Math.max(0, prev - 1));
    setActiveImage((prev) => Math.max(0, prev - 1));
  };

  const handleNextClick = () => {
    setCurrentImg((prev) => Math.min(data.length - 1, prev + 1));
    setActiveImage((prev) => Math.min(data.length - 1, prev + 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImg === data.length - 1) {
        setCurrentImg(0);
        setActiveImage(0);
      } else {
        handleNextClick();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImg, handleNextClick]);
  return (
    <>
      <section>
        <div
          style={{
            backgroundImage:
              currentImg === 2
                ? `url("/blueGradient.png")`
                : currentImg === 1
                ? `url("/pinkGradient.png")`
                : "",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className={`flex mx-9 sm:flex-col sm:items-center sm:px-7 bg-yellow-400 relative rounded-xl p-16`}
        >
          {" "}
          <div
            style={{ height: "500px" }}
            className="w-2/4 md:w-full  rounded-md overflow-hidden relative"
          >
            <div
              ref={carouselRef}
              style={{
                left: -currentImg * carouselSize.width,
              }}
              className="w-full h-full absolute flex transition-all duration-300"
            >
              {data.map((v, i) => (
                <div
                  key={i}
                  style={{
                    backgroundImage: `url(${
                      v.image || "https://random.imagecdn.app/500/500"
                    })`,
                  }}
                  className="bg-cover bg-center relative shrink-0 w-full h-full"
                >
                  <div className="pointer-events-none w-full" />
                </div>
              ))}
            </div>
          </div>
          {currentImg === 0 ? (
            <div className="ml-16 sm:ml-0 md:w-full w-2/4">
              <h1 className="text-4xl mt-24">
                The Art Chain Marketplace is LIVE
              </h1>
              <p className="mt-10 text-xl">
                The new and modern NFT marketplace on Polygon, powered by Allex
                Antoniollo. Buy, mint, and sell your Polygon NFTs today!
              </p>
              <div className="mt-12 sm:mt-5 items-center sm:flex sm:flex-col">
                <Link
                  href="/mint"
                  className="bg-gray-900 max-w-44 text-center ease-linear duration-150 hover:bg-black rounded-xl text-md text-white cursor-pointer px-7 py-3"
                >
                  MINT NFT
                </Link>
                <Link
                  href="/sell"
                  className="bg-yellow-500 max-w-44 text-center sm:ml-0 sm:mt-3 hover:bg-yellow-600 ease-linear duration-150  rounded-xl text-md cursor-pointer px-7 py-3 ml-6"
                >
                  SELL
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          {currentImg === 1 ? (
            <div className="ml-16 sm:ml-0 md:w-full w-2/4">
              <h1 className="text-4xl mt-24">
                ERC721 x ERC 1155 versions is here
              </h1>
              <p className="mt-10 text-xl">
                Embark on a journey into the world of decentralized digital
                assets with ArtChain Marketplace, where innovation meets
                artistry.
              </p>
              <div className="mt-12 sm:mt-5 items-center sm:flex sm:flex-col">
                <Link
                  href="/mint"
                  className="bg-gray-900 max-w-44 text-center ease-linear duration-150 hover:bg-black rounded-xl text-md text-white cursor-pointer px-7 py-3"
                >
                  MINT NFT
                </Link>
                <Link
                  href="/sell"
                  className="bg-gray-100 max-w-44 text-center sm:ml-0 sm:mt-3 opacity-90 ease-linear duration-150 hover:bg-gray-200 rounded-xl text-md cursor-pointer px-7 py-3 ml-6"
                >
                  SELL
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          {currentImg === 2 ? (
            <div className="ml-16 sm:ml-0 md:w-full w-2/4">
              <h1 className="text-4xl mt-24">The Mintle Marketplace</h1>
              <p className="mt-10 text-xl">
                At ArtChain, we empower artists to transform their creativity
                into unique and verifiable digital assets.
              </p>
              <div className="mt-12 sm:mt-5 items-center sm:flex sm:flex-col">
                <Link
                  href="/mint"
                  className="bg-gray-900 max-w-44 text-center ease-linear duration-150 hover:bg-black rounded-xl text-md text-white cursor-pointer px-7 py-3"
                >
                  MINT NFT
                </Link>
                <Link
                  href="/sell"
                  className="bg-blue-500 max-w-44 text-center sm:ml-0 sm:mt-3 ease-linear duration-150 hover:bg-blue-600 rounded-xl text-md cursor-pointer px-7 py-3 ml-6"
                >
                  SELL
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            onClick={handlePrevClick}
            className="absolute top-1/2 transform -translate-y-1/2 -left-6 p-3 dark:bg-neutral-800 dark:text-neutral-100 bg-white rounded-full shadow-md cursor-pointer"
          >
            <IoIosArrowBack
              className={`text-xl ${currentImg === 0 && "opacity-50"}`}
            />
          </div>
          <div
            onClick={handleNextClick}
            className="absolute dark:bg-neutral-800 dark:text-neutral-100 top-1/2 transform -translate-y-1/2 -right-6 p-3 bg-white rounded-full shadow-md cursor-pointer"
          >
            <IoIosArrowForward
              className={`text-xl ${
                currentImg === data.length - 1 && "opacity-50"
              }`}
            />
          </div>
        </div>
      </section>
      <section className="py-12 mx-9 flex justify-center">
        {data.map((_, i) => (
          <div
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-14 rounded h-1 mx-1 cursor-pointer ${
              activeImage === i ? "transition-bg" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </section>
    </>
  );
};

export default Carousel;
