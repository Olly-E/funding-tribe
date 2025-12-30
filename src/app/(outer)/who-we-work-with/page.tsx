"use client";
import Image, { StaticImageData } from "next/image";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import clsx from "clsx";

import LetConnect from "@/app/components/LetConnect";
import { FUNDED_TYPE } from "@/app/utils/data";

import blackLogo from "../../../../public/blackLogo.svg";
import workImg from "../../../../public/workImg.webp";

const Page = () => {
  const [activeFunded, setActiveFunded] = React.useState<{
    title: string;
    description: string;
    img: StaticImageData;
  } | null>(null);

  return (
    <div className="">
      <section className="pt-20 lg:pt-[60px] px-6 sm:px-[50px] flex justify-between items-end">
        <div className="">
          <h1 className="md:w-[477px] ">WHO WE WORK WITH</h1>
          <p className="text-[24px] lg:text-[32px] mt-6 leading-[124%] md:w-[621px]">
            At Funding Tribe, every project is built on collaboration. We work
            with people who share our vision — turning potential into progress
            through trust, expertise, and partnership.
          </p>
        </div>
        <Link
          href="#sticky"
          className=" items-center gap-1 group relative hidden sm:flex"
        >
          <p className="whitespace-nowrap">Scroll Down</p>{" "}
          <div className="size-[30px] min-w-[30px] overflow-hidden">
            <ArrowDown
              size={18}
              className={clsx(
                "flex gap-3 mx-auto -translate-y-4 group-hover:translate-y-1.5 min-w-[18px] transition-all duration-500 text-black"
              )}
            />
            <ArrowDown
              size={18}
              className={clsx(
                "flex gap-3 mx-auto group-hover:translate-y-4 -translate-y-3 transition-all duration-500 min-w-[18px] text-black "
              )}
            />
          </div>
          <div className="border-t-black w-0 border-t mt-[90px] group-hover:w-[90%] duration-500 transition-all bottom-0 absolute" />
        </Link>
      </section>
      <div className="border-t-black border-t mt-[50px] sm:mt-[90px]" />
      <section className="grid sm:grid-cols-2">
        <div className="hidden sm:block pr-[50px] lg:pr-[99px] pl-6 py-[60px] sm:pl-[50px]">
          <div
            key={activeFunded?.title}
            className={clsx(
              "top-[100px] lg:top-[50px] grayscale w-full h-[497px] rounded-br-[120px] overflow-hidden sticky"
            )}
          >
            <Image
              src={activeFunded?.img || workImg}
              fill
              alt="funded type"
              className={clsx(
                "object-cover transition-all duration-700 ease-out",
                activeFunded ? "grayscale-0 scale-105" : "grayscale scale-100"
              )}
            />
          </div>
        </div>
        <div className="flex">
          <div className="h-full border-r border-r-black" />
          <div className="w-full">
            {FUNDED_TYPE.map((type, index) => {
              return (
                <div
                  onMouseEnter={() =>
                    setActiveFunded({
                      title: type.title,
                      description: type.description,
                      img: type.img,
                    })
                  }
                  onMouseLeave={() => setActiveFunded(null)}
                  key={type.id}
                  className=""
                >
                  <div className="pl-6 sm:pl-[50px] group transition-colors duration-500 text-black relative hover:text-white lg:pl-[108px] pr-6 sm:pr-[50px] py-[50px]">
                    <div className="flex items-center gap-2.5">
                      <div className="size-[15px] min-w-[15px] transition-colors duration-500 group-hover:bg-white bg-black" />
                      <p className="text-left w-full whitespace-nowrap">
                        {type.id}
                      </p>
                    </div>
                    <h3 className="text-[24px] sm:text-[32px] mt-2 max-w-[345px] sm:max-w-[450px]">
                      {type.title}
                    </h3>
                    <p className="text-base sm:text-[20px] leading-[120%] sm:max-w-[504px] mt-6 max-w-[338px]">
                      {type.description}
                    </p>
                    <div
                      className={clsx(
                        "absolute h-0 w-full group-hover:h-full bg-black transition-all duration-200 top-[50%] translate-y-[-50%] left-0 -z-1 self-center"
                      )}
                    />
                  </div>
                  {index < FUNDED_TYPE.length - 1 && (
                    <div className="border-t-black border-t" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="border-t-black border-t" />
      <section className="py-[70px] sm:py-[193px] px-6">
        <Image
          src={blackLogo}
          alt="stairs"
          className="object-cover w-[100px] sm:w-[107px] h-auto mx-auto"
        />
        <p className="md:w-[750px] text-center mx-auto text-[24px] sm:text-[32px] leading-[100%] mt-12">
          Funding Tribe exists for people who believe in{" "}
          <strong>collaboration</strong> over <strong>competition</strong>.
          Together, we fund, build, and share the reward.
        </p>
      </section>
      <div className="border-t-black border-t" />
      <LetConnect />
    </div>
  );
};

export default Page;
