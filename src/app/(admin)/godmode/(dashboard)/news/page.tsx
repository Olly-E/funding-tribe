import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { NEWS_DATA } from "@/app/utils/data";

import newsImg from "../../../../../../public/newsImg.png";

const NewsPae = () => {
  return (
    <div className="pb-10 mt-[31px]">
      <div className="px-6 md:px-[62px] mb-[25px] flex flex-col md:flex-row gap-10 items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-[15px] min-w-[15px] bg-black" />
          <p className="text-left w-full whitespace-nowrap">
            NEWS AND INSIGHTS
          </p>
        </div>
     
      </div>
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-10 xl:gap-20 pl-6 sm:pl-[50px] xl:pl-10 pr-6 sm:pr-[50px] xl:justify-items-end">
        {NEWS_DATA.map((news, index) => {
          return (
            <Link
              href={`/godmode/news/${news.id}`}
              key={index}
              className="relative group"
            >
              <Image
                alt="news-img"
                className="h-[221px] sm:w-[184px] object-cover rounded-[20px]"
                src={newsImg}
              />
              <div className="pl-2.5 flex gap-10 mt-10">
                <p className="text-sm uppercase font-bold w-full md:w-[184px] h-full">
                  {news.title}
                </p>
                <div className="mt-2 items-center gap-2 w-fit rounded-md hidden group-hover:flex absolute top-2 left-2 z-10">
                  <button className="rounded-full bg-white centered size-[34px]">
                    <Trash2 className="size-4 text-red-state" />
                  </button>
                  <button className="rounded-full bg-white centered size-[34px]">
                    <Pencil className="size-4 text-black" />
                  </button>
                </div>
                <div className="border-r border-r-black h-[100px]" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NewsPae;
