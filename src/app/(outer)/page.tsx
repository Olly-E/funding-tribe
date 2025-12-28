"use client";
import Image from "next/image";
import Link from "next/link";

import RandomBorderGallery from "../components/RandomBorderImage";
import { FAQ_DATA, PROJECT_DATA } from "../utils/data";
import { Button } from "../components/Button";
import { Faq } from "../components/Faq";

import trailingArrow from "../../../public/trailingArrow.svg";
import aboutImg from "../../../public/aboutImg.png";
import heroImg from "../../../public/heroImg.png";

export default function Home() {
  return (
    <div>
      <section className="pt-20 lg:pt-[60px] pl-6 sm:pl-[50px]">
        <div className="">
          <h1 className="uppercase lg:w-[780px]">
            When ideas worth building stop short because of Time, Funding, or
            experience.
          </h1>
          <p className="text-[24px] md:text-[32px] font-bold mt-[30px] sm:mt-15">
            WE STEP IN
          </p>
          <Link
            href="#about-us"
            className="mt-[60px] hover:translate-y-2 duration-1000 transition-all inline-block px-4 ml-10 md:ml-16"
          >
            <Image
              src={trailingArrow}
              alt="trailing-arrow"
              className="h-[68px] sm:h-[107px]"
            />
          </Link>
        </div>
        <Image
          src={heroImg}
          alt="trailing-arrow"
          className="lg:max-w-[1041px] h-auto ml-auto xl:-mt-[450px]"
        />
      </section>
      <div className="border-t-black border-t" />
      <section className="pr-6 sm:pr-[50px] pt-[88px]" id="about-us">
        <div className="flex flex-col xl:flex-row items-start pl-6 sm:pl-[50px] gap-[53px]">
          <div className="flex items-center gap-2.5">
            <div className="size-[15px] min-w-[15px] bg-black" />
            <p className="text-left w-full whitespace-nowrap">ABOUT US</p>
          </div>
          <p className="lg:w-[786px] text-[24px] sm:text-[48px] leading-[120%] text-start lg:text-right lg:ml-auto">
            We share the risk and reward to <br className="hidden lg:block" />{" "}
            turn stalled ideas into successful{" "}
            <br className="hidden lg:block" /> developments through simple,{" "}
            <br className="hidden lg:block" />
            <span className="font-bold">human collaboration.</span>
          </p>
          <Button
            className="mb-[31px] lg:mb-30 group block xl:hidden lg:ml-auto"
            showArrow={true}
          >
            Learn More
          </Button>
        </div>
        <div className="flex items-end justify-between gap-10">
          <Image
            src={aboutImg}
            alt="trailing-arrow"
            className="xl:max-w-[1041px] h-auto md:-mt-5"
          />
          <Button className="mb-30 group hidden xl:flex" showArrow={true}>
            Learn More
          </Button>
        </div>
      </section>
      <div className="border-t-black border-t" />
      <section className="pt-[89.5px] px-6 sm:px-[50px] pb-[50px]">
        <div className="flex items-center gap-2.5">
          <div className="size-[15px] min-w-[15px] bg-black" />
          <p className="text-left w-full whitespace-nowrap">WE FUND</p>
        </div>
        <Faq faqData={FAQ_DATA} />
      </section>
      <div className="border-t-black border-t" />
      <section className="mt-[68px]">
        <div className="flex items-center gap-2.5 pl-6 sm:pl-[50px] mb-10 sm:mb-[88px]">
          <div className="size-[15px] min-w-[15px] bg-black" />
          <p className="text-left w-full">FUNDED PROJECTS</p>
        </div>
        <RandomBorderGallery />
      </section>
    </div>
  );
}
