"use client";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { useAllAdminNews } from "@/app/features/news/api/useAllAdminNews";
import { FullPageLoader } from "@/app/components/FullPageLoader";
import { FUNDED_TYPE, NEWS_DATA } from "@/app/utils/data";
import LetConnect from "@/app/components/LetConnect";

import newsImg from "../../../../public/newsImg.png";
import { getFormattedDayMonthYear } from "@/app/utils/utils";
import React from "react";

const Page = () => {
  const { data, isPending } = useAllAdminNews();
  const [activeHover, setActiveHover] = React.useState<string | null>(null);

  if (isPending) {
    return (
      <div className="w-full justify-center">
        <FullPageLoader className="h-[50vh]! justify-center! flex" />
      </div>
    );
  }
  return (
    <div>
      <section className="pt-[149px] lg:pt-[60px] pb-[119px] sm:pb-[141px] px-6 sm:px-[50px] ">
        <h1 className="text-center">NEWS & INSIGHTS</h1>
        <p className="md:w-[785px] text-center mx-auto text-[24px] md:text-[32px] leading-[100%] mt-[50px]">
          Welcome to Funding Tribe News — short updates, <br /> real stories,
          and honest insights from our journey <br /> of building and funding
          better together.
        </p>
      </section>
      <div className="border-t-black border-t" />
      <section className="grid sm:grid-cols-2">
        <div className="hidden sm:block pr-[50px] lg:pr-[99px] pl-6 py-[60px] sm:pl-[50px]">
          <div className="top-[100px] lg:top-[70px] w-full h-[497px] rounded-br-[120px] overflow-hidden sticky">
            <Image
              src={activeHover || newsImg}
              fill
              alt="stairs"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex">
          <div className="h-full border-r border-r-black" />
          <div className="w-full">
            {data &&
              data?.data?.map((data, index) => {
                return (
                  <Link
                    onMouseEnter={() => setActiveHover(data?.imgUrl.url || "")}
                    onMouseLeave={() => setActiveHover(null)}
                    href={`/news/${data.slug}`}
                    key={data.slug}
                    className="relative block group"
                  >
                    <div className="pl-6  sm:pl-6 lg:pl-10 pr-6 group sm:pr-[50px] py-[30px] flex flex-col xl:flex-row xl:item-start gap-6 justify-between">
                      <p className="text-[24px] capitalize group-hover:text-white max-w-[345px] sm:max-w-[450px]">
                        {data.title}
                      </p>
                      <div className="flex items-center gap-6">
                        <p className="tex-xs group-hover:text-white">
                          {getFormattedDayMonthYear(data?.createdAt as Date)}
                        </p>
                        <p className="tex-xs min-w-[150px] truncate group-hover:text-white">
                          {data.category}
                        </p>
                      </div>
                    </div>

                    <div
                      className={clsx(
                        "absolute h-0 w-full group-hover:h-full bg-black transition-all duration-200 top-[50%] translate-y-[-50%] left-0 -z-1 self-center"
                      )}
                    />
                    {index < FUNDED_TYPE.length && (
                      <div className="border-t-black border-t" />
                    )}
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
      <div className="border-t-black border-t" />
      <LetConnect />
    </div>
  );
};

export default Page;
