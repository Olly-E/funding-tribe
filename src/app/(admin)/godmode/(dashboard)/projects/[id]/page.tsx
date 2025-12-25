"use client";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { useProjectDetails } from "@/app/features/projects/api/useProjectDetails";
import { FullPageLoader } from "@/app/components/FullPageLoader";
import ProjectImgView from "@/app/components/ProjectImgView";

const Page = () => {
  const id = useParams()?.id;
  const { data: details, isPending } = useProjectDetails((id as string) || "");
  const { title, description, imgUrls } = details?.data || {};
  const imgFiles = imgUrls?.map((img) => img.url);

  return (
    <div>
      {isPending ? (
        <FullPageLoader className="h-[80vh]!" />
      ) : (
        <section className="flex pt-10 md:pt-0 flex-col-reverse justify-between w-full md:flex-row">
          <div className="w-full lg:min-w-[641px]">
            <div className="hidden md:block pt-[120px] lg:pt-[60px] pb-15 pl-6 sm:pl-[50px] text-center sm:text-start pr-6 sm:pr-0">
              <Link
                href="/godmode/projects"
                className="hover:bg-black size-9 mb-4 centered rounded-full group group-hover:bg-black transition-colors"
              >
                <ArrowLeft
                  size={24}
                  className="text-black group-hover:text-white"
                />
              </Link>
              <h1 className="lg:max-w-[567px] mx-auto sm:mx-0 ">
                {title || ""}
              </h1>
            </div>
            <div className="border-t-black border-t block" />
            <div className="py-8 md:pt-[60px] px-6 sm:px-[50px] md:pb-[200px]">
              <div
                dangerouslySetInnerHTML={{
                  __html: description || "",
                }}
              />{" "}
              <Link
                href={`/godmode/projects/`}
                className="mt-10 md:mt-20 inline-block sm:text-[24px] group relative underline-offset-2"
              >
                <p className="whitespace-nowrap underline md:no-underline">
                  Back to all
                </p>
                <div className="border-t-black hidden md:block w-0 border-t-2 mt-[90px] group-hover:w-full duration-500 transition-all bottom-0 absolute" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row w-full justify-between ">
            <div className="hidden md:block md:border-l-black md:border-l h-full" />
            <ProjectImgView
              imgFiles={
                imgFiles || [
                  "https://cdn-icons-png.flaticon.com/512/685/685669.png",
                ]
              }
            />
            <div className="border-t border-t-black md:border-l-black md:border-l h-full block" />

            <h1 className="pb-12 pt-6 px-6 lg:max-w-[567px] mx-auto sm:mx-0 md:hidden">
              {title || ""}
            </h1>
            <Link
              href="/godmode/projects"
              className="hover:bg-black ml-6 flex size-9 md:hidden items-center justify-center rounded-full group group-hover:bg-black transition-colors"
            >
              <ArrowLeft
                size={24}
                className="text-black group-hover:text-white"
              />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;
