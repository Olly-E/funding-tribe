import Image from "next/image";

import LetConnect from "@/app/components/LetConnect";
import { PROJECTS } from "@/app/utils/data";

import projectImg from "../../../../public/projectImg.webp";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <section className="flex flex-col sm:flex-row gap-10">
        <div className="pt-[120px] lg:pt-[60px] pl-6 sm:pl-[50px] text-center sm:text-start pr-6 sm:pr-0">
          <h1 className="lg:w-[477px] max-w-[331px] sm:max-w-[477px] mx-auto sm:mx-0">
            OUR FUNDED PROJECTS
          </h1>
          <p className="text-[24px] lg:text-[32px] mt-6 leading-[124%] lg:w-[621px]">
            Each project we fund tells a story of collaboration and shared
            success.
          </p>
        </div>
        <div className="border-t-black border-t block sm:hidden" />
        <div className="flex w-full">
          <div className="h-full border-r border-r-black" />
          <div className="w-full">
            {PROJECTS.map((type, index) => {
              return (
                <Link href={`/projects/${type.id}`} key={type.id}>
                  <div className="pl-6 sm:pl-[50px] pr-6 sm:pr-[50px] py-[60px]">
                    <div className="flex items-center gap-2.5">
                      <div className="size-[15px] min-w-[15px] bg-black" />
                      <p className="text-left w-full whitespace-nowrap">
                        {type.id}
                      </p>
                    </div>
                    <h3 className="text-[24px] mt-2 max-w-[390px] sm:max-w-[450px]">
                      {type.title}
                    </h3>
                  </div>
                  {index < PROJECTS.length - 1 && (
                    <div className="border-t-black border-t" />
                  )}{" "}
                </Link>
              );
            })}
          </div>
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

export default page;
