// carousel.tsx
"use client";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Carousel = () => {
  const data = [
    { image: "https://picsum.photos/seed/random101/500/500" },
    { image: "https://picsum.photos/seed/random102/500/500" },
    { image: "https://picsum.photos/seed/random103/500/500" },
  ];
  const [currentImg, setCurrentImg] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 });
  const carouselRef = useRef(null);

  // useEffect to get the initial carousel size
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
          className={`flex mx-9 bg-yellow-400 relative rounded-xl p-16`}
        >
          {" "}
          {/* Carousel container */}
          <div
            style={{ height: "500px" }}
            className="w-2/4  rounded-md overflow-hidden relative"
          >
            {/* Image container */}
            <div
              ref={carouselRef}
              style={{
                left: -currentImg * carouselSize.width,
              }}
              className="w-full h-full absolute flex transition-all duration-300"
            >
              {/* Map through data to render images */}
              {data.map((v, i) => (
                <div key={i} className="relative shrink-0 w-full h-full">
                  <Image
                    className="pointer-events-none"
                    alt={`carousel-image-${i}`}
                    fill
                    src={v.image || "https://random.imagecdn.app/500/500"}
                  />
                </div>
              ))}
            </div>
          </div>
          {currentImg === 0 ? (
            <div className="ml-16 w-2/4">
              <h1 className="text-4xl mt-24">
                The Art Chain Marketplace is LIVE
              </h1>
              <p className="mt-10 text-xl">
                The new and modern NFT marketplace on Polygon, powered by Allex
                Antoniollo. Buy, mint, and sell your Polygon NFTs today!
              </p>
              <div className="mt-12">
                <Link
                  href="/mint"
                  className="bg-gray-900 ease-linear duration-150 hover:bg-black rounded-xl text-md text-white cursor-pointer px-7 py-3"
                >
                  MINT NFT
                </Link>
                <Link
                  href="/sell"
                  className="bg-yellow-500 hover:bg-yellow-600 ease-linear duration-150  rounded-xl text-md cursor-pointer px-7 py-3 ml-6"
                >
                  SELL
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          {currentImg === 1 ? (
            <div className="ml-16 w-2/4">
              <h1 className="text-4xl mt-24">
                ERC721 x ERC 1155 versions is here
              </h1>
              <p className="mt-10 text-xl">
                Embark on a journey into the world of decentralized digital
                assets with ArtChain Marketplace, where innovation meets
                artistry.
              </p>
              <div className="mt-12">
                <Link
                  href="/mint"
                  className="bg-gray-900 ease-linear duration-150 hover:bg-black rounded-xl text-md text-white cursor-pointer px-7 py-3"
                >
                  MINT NFT
                </Link>
                <Link
                  href="/sell"
                  className="bg-gray-100 opacity-90 ease-linear duration-150 hover:bg-gray-200 rounded-xl text-md cursor-pointer px-7 py-3 ml-6"
                >
                  SELL
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          {currentImg === 2 ? (
            <div className="ml-16 w-2/4">
              <h1 className="text-4xl mt-24">The Mintle Marketplace</h1>
              <p className="mt-10 text-xl">
                At ArtChain, we empower artists to transform their creativity
                into unique and verifiable digital assets.
              </p>
              <div className="mt-12">
                <Link
                  href="/mint"
                  className="bg-gray-900 ease-linear duration-150 hover:bg-black rounded-xl text-md text-white cursor-pointer px-7 py-3"
                >
                  MINT NFT
                </Link>
                <Link
                  href="/sell"
                  className="bg-blue-500 ease-linear duration-150 hover:bg-blue-600 rounded-xl text-md cursor-pointer px-7 py-3 ml-6"
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
            className="absolute top-1/2 transform -translate-y-1/2 -left-6 p-3 bg-white rounded-full shadow-md cursor-pointer"
          >
            <IoIosArrowBack
              className={`text-xl ${currentImg === 0 && "opacity-50"}`}
            />
          </div>
          <div
            onClick={handleNextClick}
            className="absolute top-1/2 transform -translate-y-1/2 -right-6 p-3 bg-white rounded-full shadow-md cursor-pointer"
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
        {/* Map through data to render divs */}
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
