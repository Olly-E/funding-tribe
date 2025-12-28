"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import newsImg from "../../../../../public/newsImg.png";

import { useNewsDetails } from "@/app/features/news/api/useAdminNewsDetails";
import { FullPageLoader } from "@/app/components/FullPageLoader";
import { getFormattedDayMonthYear } from "@/app/utils/utils";
import LetConnect from "@/app/components/LetConnect";

const NewsDetails = () => {
  const id = useParams()?.id;
  const { data: details, isPending } = useNewsDetails((id as string) || "");
  const { title, description, imgUrl, category, createdAt } =
    details?.data || {};

  if (isPending) {
    return <FullPageLoader className="h-[80vh]!" />;
  }
  return (
    <div className="">
      <section className="grid grid-cols-1 sm:grid-cols-2">
        <div className=" sm:pr-[50px] lg:pr-[99px] pl-6 sm:pb-[60px] sm:pt-16 sm:pl-[50px]">
          <div className="top-[100px] lg:top-[50px] w-full sm:h-[497px] rounded-br-[120px] hidden sm:block sm:sticky overflow-hidden relative h-[255px]">
            <Image src={newsImg} fill alt="stairs" className="object-cover" />
          </div>
        </div>
        <div className="flex justify-between w-full flex-col sm:flex-row pb-20">
          <div className="w-full xl:min-w-[641px] xl:pl-[50px] sm:pr-[50px] pr-6 pl-6">
            <h1 className="lg:max-w-[567px] text-center sm:text-left mx-auto sm:mx-0 pt-[100px] lg:pt-[50px]">
              {title || ""}
            </h1>
            <div className=" w-full mt-10 rounded-br-[120px] sm:hidden overflow-hidden relative h-[255px]">
              <Image
                src={imgUrl?.url || newsImg}
                fill
                alt="stairs"
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-10 mt-15 mb-10 text-xs ">
              <p>{getFormattedDayMonthYear(createdAt as Date)}</p>
              <p>{category}</p>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: description || "",
              }}
            />
            <Link
              href="#sticky"
              className="mt-20 inline-block text-[24px] group relative underline-offset-2"
            >
              <p className="whitespace-nowrap underline md:no-underline">
                Back to all
              </p>
              <div className="border-t-black hidden md:block w-0 border-t-2 mt-[90px] group-hover:w-full duration-500 transition-all bottom-0 absolute" />
            </Link>
          </div>
        </div>
      </section>
      <div className="border-t-black border-t" />
      <div className="border-t-black border-t" />
      <LetConnect />
    </div>
  );
};

export default NewsDetails;
