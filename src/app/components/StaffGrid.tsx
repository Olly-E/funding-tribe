"use client";
import Image from "next/image";
import React from "react";
import clsx from "clsx";

import { STAFF_DATA } from "../utils/data";

const StaffGrid = () => {
  const [active, setActive] = React.useState<number | null>(null);
  const handleActive = (index: number) => {
    if (active === index) {
      setActive(null);
      return;
    }
    setActive(index);
  };
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 mt-[70px]">
      {STAFF_DATA.map((data, index) => {
        return (
          <button
            type="button"
            onClick={() => handleActive(index)}
            key={data.id}
            className="min-h-[197px] text-left sm:min-h-[432px] border border-black overflow-hidden relative group"
          >
            <Image
              src={data.img}
              alt={data.name}
              fill
              className="object-cover"
            />
            <div
              className={clsx(
                " text-start  border-t border-t-black absolute bottom-0 pt-2 w-full left-0 bg-white z-1 transition-all duration-1000",
                active === index
                  ? "max-h-[300px]"
                  : "lg:max-h-[60px] max-h-[50px] group-hover:max-h-[300px]"
              )}
            >
              <div className="flex gap-2 sm:gap-3 items-center px-2 md:px-5 py-2 text-[10px] md:text-xs lg:text-base">
                <strong className="whitespace-nowrap">{data.name}</strong>{" "}
                {data.position && (
                  <span className="text-[4px] sm:text-[10px]">&#9679;</span>
                )}
                <span className="whitespace-nowrap">{data.position}</span>
              </div>
              <p className="mt-2 px-2 md:px-5 pb-4 text-[10px] md:text-xs lg:text-base">
                {data.history}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default StaffGrid;
