"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { useAllAdminProjects } from "@/app/features/projects/api/useAllAdminProjects";
import { FullPageLoader } from "@/app/components/FullPageLoader";
import LetConnect from "@/app/components/LetConnect";
import { PROJECTS } from "@/app/utils/data";

import projectImg from "../../../../public/projectImg.webp";

const Page = () => {
  const { data, isPending } = useAllAdminProjects();

  const projectData = data?.data || [];
  return (
    <div>
      <section className="flex flex-col sm:flex-row gap-10">
        <div className="pt-[120px] lg:pt-[60px] pl-6 sm:pl-[50px] text-center sm:text-start pr-6 sm:pr-0 top-0 relative">
          <div className="sticky top-[120px] lg:top-12 pb-10">
            <h1 className="lg:w-[477px] max-w-[331px] sm:max-w-[477px] mx-auto sm:mx-0">
              OUR FUNDED PROJECTS
            </h1>
            <p className="text-[24px] lg:text-[32px] mt-6 leading-[124%] lg:w-[621px]">
              Each project we fund tells a story of collaboration and shared
              success.
            </p>
          </div>
        </div>
        <div className="border-t-black border-t block sm:hidden" />
        <div className="flex w-full">
          <div className="h-full border-r border-r-black" />
          {isPending ? (
            <div className="w-full justify-center">
              <FullPageLoader className="h-[50vh]! justify-center! flex" />
            </div>
          ) : (
            <div className="w-full">
              {projectData.map((type, index) => {
                return (
                  <Link
                    href={`/projects/${type.slug}`}
                    key={type._id}
                    className="group"
                  >
                    <div className="pl-6 flex transition-colors duration-500 group-hover:text-white justify-between items-center sm:pl-[50px] pr-6 sm:pr-[50px] py-[60px] relative">
                      <div
                        className={clsx(
                          "absolute h-0 w-full group-hover:h-full bg-black transition-all duration-200 top-[50%] translate-y-[-50%] left-0 -z-1 self-center"
                        )}
                      />
                      <div className="">
                        <div className="flex items-center gap-2.5">
                          <div className="size-[15px] group-hover:bg-white min-w-[15px] bg-black transition-colors duration-500" />
                          <p className="text-left w-full whitespace-nowrap">
                            {`0.0${index + 1}`}
                          </p>
                        </div>
                        <h3 className="text-[24px] mt-2 max-w-[390px] sm:max-w-[450px]">
                          {type.title}
                        </h3>
                      </div>
                      <div className="size-10 overflow-hidden centered">
                        <ArrowRight
                          size={24}
                          className="text-black duration-500 -translate-x-10 transition-all group-hover:translate-x-0"
                        />
                      </div>
                    </div>
                    {index < PROJECTS.length - 1 && (
                      <div className="border-t-black border-t" />
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <div className="border-t-black border-t" />
      <section className="px-6 sm:px-[50px] py-[66px] sm:py-[121px] gap-10 flex flex-col lg:flex-row justify-between items-start">
        <p className="text-base sm:text-[24px] max-w-[491px] flex justify-between gap-10 w-full">
          From landowners unlocking value through development to investors
          earning strong returns on completion — every partnership reflects what
          Funding Tribe stands for: simplicity, transparency, and trust. <br />
          <br /> We’ve helped turn ideas into completed developments, ensuring
          our investors were paid their agreed profits and our partners achieved
          their goals.
        </p>
        <div className="sm:self-end lg:self-auto w-full sm:w-auto">
          <div className="max-h-[321px] h-[321px] w-full sm:w-[504px] relative rounded-tl-[120px] overflow-hidden">
            <Image
              src={projectImg}
              alt="stairs"
              fill
              className="object-cover w-[204px] sm:w-[214.52px] h-auto mx-auto"
            />
          </div>
          <p className="text-[24px] sm:text-[32px] sm:w-[491px] mt-[102px] sm:mt-[121px] sm:text-end lg:text-start">
            These projects are more than builds — they’re proof that when the
            right people come together, funding becomes simple and success is
            shared.
          </p>
        </div>
      </section>
      <div className="border-t-black border-t" />
      <LetConnect />
    </div>
  );
};

export default Page;
