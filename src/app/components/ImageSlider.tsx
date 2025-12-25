"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";

interface IImageSlider {
  handleActiveImg: (index: number) => void;
  active: number;
  data: string[];
}

const ImageSlider = ({
  handleActiveImg,
  active,
  data: originalImages,
}: IImageSlider) => {
  const itemsVisible = 3;
  const totalOriginals = originalImages.length;

  const extendedImages = [
    ...originalImages.slice(-itemsVisible),
    ...originalImages,
    ...originalImages.slice(0, itemsVisible),
  ];

  const [currentIndex, setCurrentIndex] = useState(itemsVisible);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const getOriginalIndex = (extendedIdx: number) => {
    return (extendedIdx - itemsVisible + totalOriginals) % totalOriginals;
  };

  const nextSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (currentIndex === totalOriginals + itemsVisible) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(itemsVisible);
      }, 500);
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalOriginals);
      }, 500);
    }
  }, [currentIndex, totalOriginals]);

  useEffect(() => {
    if (!isTransitioning) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTransitioning(true);
    }
  }, [isTransitioning]);

  return (
    <div className="relative w-full xl:max-w-6xl mx-auto px-6 md:px-12 py-10">
      <div className="overflow-hidden rounded-xl">
        <div
          className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
          }}
        >
          {extendedImages.map((img, idx) => {
            const realIdx = getOriginalIndex(idx);
            const isActive = active === realIdx;

            return (
              <button
                type="button"
                onClick={() => handleActiveImg(realIdx)}
                key={idx}
                className="min-w-[33.333%] px-2 xl:px-4 py-2 box-border transition-transform active:scale-95"
              >
                <div
                  className={`relative h-[100px] xl:h-[172px] rounded-bl-[50px] xl:rounded-bl-[100px] w-full overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "ring-4 ring-black ring-offset-2 opacity-100"
                      : "opacity-60 hover:opacity-100"
                  } bg-gray-100`}
                >
                  <Image
                    src={img}
                    alt={`slide-${realIdx}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full  hover:bg-gray-100 bg-white transition-colors z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full  hover:bg-gray-100 bg-white transition-colors z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageSlider;
