"use client";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useNewsDetails } from "@/app/features/news/api/useAdminNewsDetails";
import { FullPageLoader } from "@/app/components/FullPageLoader";
import { getFormattedDayMonthYear } from "@/app/utils/utils";

const NewsDetailsPage = () => {
  const id = useParams()?.id;
  const { data: details, isPending } = useNewsDetails((id as string) || "");
  const { title, description, imgUrl, category, createdAt } =
    details?.data || {};

  if (isPending) {
    return <FullPageLoader className="h-[80vh]!" />;
  }
  return (
    <div className="">
      <section className="grid grid-cols-1 sm:grid-cols-2 pt-10">
        <div className=" md:pr-[50px] xl:pr-[99px] pl-6 sm:pb-[60px] sm:pl-[50px]">
          <Link
            href="/godmode/news"
            className="hover:bg-black size-9 md:mt-6 sm:mt-0 sm:mb-4 centered rounded-full group group-hover:bg-black transition-colors"
          >
            <ArrowLeft
              size={24}
              className="text-black group-hover:text-white"
            />
          </Link>
          <div className="top-[100px] lg:top-[50px] w-full sm:h-[497px] rounded-br-[120px] hidden sm:block sm:sticky overflow-hidden relative h-[255px]">
            {imgUrl ? (
              <Image
                src={imgUrl?.url}
                fill
                alt="stairs"
                className="object-cover"
              />
            ) : (
              <div className="mt-20">No Image Uploaded</div>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-4 w-full flex-col sm:flex-row pb-20">
          <div className="w-full xl:min-w-[641px] xl:pl-[50px] sm:pr-[50px] pr-6 pl-6">
            <h1 className="lg:max-w-[567px] text-center sm:text-left mx-auto sm:mx-0 sm:pt-[40px] lg:pt-[50px]">
              {title || ""}
            </h1>
            {imgUrl ? (
              <div className=" w-full mt-10 rounded-br-[120px] sm:hidden overflow-hidden relative h-[255px]">
                <Image
                  src={imgUrl?.url}
                  fill
                  alt="stairs"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="mt-20">No Image Uploaded</div>
            )}
            <div className="flex items-center justify-between gap-10 mt-15 text-xs ">
              <p>{getFormattedDayMonthYear(createdAt as Date)}</p>
              <p>{category || ""}</p>
            </div>

            <div className="mt-6 sm:mt-10">
              <div
                dangerouslySetInnerHTML={{
                  __html: description || "",
                }}
              />
              <Link
                href={`/godmode/news`}
                className="mt-10 md:mt-20 inline-block sm:text-[24px] group relative underline-offset-2"
              >
                <p className="whitespace-nowrap underline md:no-underline">
                  Back to all
                </p>
                <div className="border-t-black hidden md:block w-0 border-t-2 mt-[90px] group-hover:w-full duration-500 transition-all bottom-0 absolute" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailsPage;
