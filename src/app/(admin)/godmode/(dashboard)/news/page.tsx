"use client";
import { Search } from "lucide-react";

import { useAllAdminNews } from "@/app/features/news/api/useAllAdminNews";
import NewsCard from "@/app/features/news/components/NewsCard";
import { Button } from "@/app/components/Button";
import { NEWS_DATA } from "@/app/utils/data";

import newsImg from "../../../../../../public/newsImg.png";
import { FullPageLoader } from "@/app/components/FullPageLoader";

const NewsPae = () => {
  const { data, isPending } = useAllAdminNews();
  const newsData = data?.data || [];

  console.log({ data });

  return (
    <div className="pb-10 mt-[31px]">
      <div className="px-6 md:px-[62px] mb-[25px] flex flex-col md:flex-row gap-10 items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-[15px] min-w-[15px] bg-black" />
          <p className="text-left w-full whitespace-nowrap">
            NEWS AND INSIGHTS
          </p>
        </div>
        <div className="w-full md:w-fit flex items-center gap-4">
          <div className="xl:w-[395px] w-full md:w-full h-[38px] border border-black-2 rounded-[5px] flex items-center px-3">
            <Search size={16} color="#000000" className="min-w-4" />
            <input
              type="text"
              placeholder="Search project"
              className="w-full h-full px-2 py-2 text-sm text-black border-none bg-transparent outline-none"
            />
          </div>
          <Button
            className="rounded-md! px-6!"
            variant="secondary"
            as="link"
            href="/godmode/news/new"
          >
            ADD NEWS +
          </Button>
        </div>
      </div>
      {isPending ? (
        <div>
          <FullPageLoader className="h-[60vh]!" />
        </div>
      ) : (
        <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-10 xl:gap-20 pl-6 sm:pl-[50px] xl:pl-10 pr-6 sm:pr-[50px] xl:justify-items-end">
          {newsData.map((news) => {
            return (
              <NewsCard
                img={news?.imgUrl?.url || ''}
                key={news.slug}
                slug={news.slug}
                title={news.title}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NewsPae;
