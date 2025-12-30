import Image from "next/image";

import LetConnect from "@/app/components/LetConnect";

import investImg1 from "../../../../public/investImg1.webp";
import investImg2 from "../../../../public/investImg2.webp";

const page = () => {
  return (
    <div>
      <section className="pt-[149px] lg:pt-[60px] pb-[119px] sm:pb-[141px] px-6 sm:px-[50px] ">
        <h1 className="text-center">WHO WE WORK WITH</h1>
        <p className="md:w-[621px] text-center mx-auto text-[24px] md:text-[32px] leading-[100%] mt-[50px]">
          We keep investment simple. <br /> Each opportunity is tied to one
          project — clear, transparent, and direct.
        </p>
      </section>
      <div className="border-t-black border-t" />
      <section className=" px-6 sm:px-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center">
          <div className="py-10">
            <div className="flex items-center gap-2.5">
              <div className="size-[15px] min-w-[15px] bg-black" />
              <p className="text-left w-full whitespace-nowrap">
                WHY CHOOSE US
              </p>
            </div>
            <p className=" lg:text-[24px] max-w-[504px] mt-10 leading-[124%] sm:pr-[50px]">
              You see the site, the cost, and the resale or refinance value.
              Once we agree your share, you invest in that project alone. <br />
              <br /> When the project sells or refinances, all costs are
              deducted, and your share is paid. <br />
              <br /> Many of our investors first came to us for funding. After
              seeing their profits and how smooth the process was, they chose to
              reinvest as project investors..
            </p>
          </div>
          <div className="flex flex-col md:flex-row w-full justify-between h-full">
            <div className="border-t border-t-black md:h-full md:border-r md:border-r-black w-[calc(100vw-10px)] md:w-auto -translate-x-6 sm:translate-x-[-50px] md:translate-x-0" />
            <div className="sm:pl-[50px] lg:pl-[100px] w-full py-[60px]">
              <div className="relative rounded-l-[80px] sm:rounded-l-[120px] h-[341px] md:max-h-[497px] sm:w-full overflow-x-hidden translate-x-6 sm:translate-x-[50px] md:translate-x-0">
                <Image
                  src={investImg1}
                  fill
                  alt="stairs"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="border-t-black border-t" />
      <section className=" px-6 sm:px-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between md:items-center">
          <div className="flex flex-col order-2 md:order-1 md:flex-row w-full justify-between h-full">
            <div className="sm:pr-[50px] lg:pr-[100px] w-full py-[60px]">
              <div className="relative rounded-r-[80px] sm:rounded-r-[120px] h-[341px] md:max-h-[497px] -translate-x-6 sm:translate-x-[-100px] md:translate-x-0 sm:w-full overflow-x-hidden">
                <Image
                  src={investImg2}
                  fill
                  alt="stairs"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="border-t border-t-black md:h-full md:border-r md:border-r-black md:w-auto translate-x-px hidden md:block" />
          </div>

          <div className="sm:pl-[50px] lg:pl-[100px] order-1 md:order-2 mt-[50px] md:mt-0">
            <p className="text-base lg:text-[24px] max-w-[504px] leading-[124%]">
              For now, we only work with partners who’ve completed a project
              with us and understand our process. A typical project runs for
              about 12 months — nine to build, three to sell or refinance.{" "}
              <br />
              <br /> We’ll open new opportunities in time, but today, we focus
              on those who’ve already built with us — those who’ve become part
              of the Tribe. <br />
              <br />
              <strong className="">Welcome to the Funding Tribe —</strong> where
              we provide the funds, solve the problems, and share the reward
            </p>
            <div className="border-t border-t-black md:h-full md:border-r md:border-r-black w-[calc(100vw-10px)] md:w-auto -translate-x-6 sm:translate-x-[-100px] md:translate-x-0 block md:hidden mt-[50px]" />
          </div>
        </div>
      </section>
      <div className="border-t-black border-t" />
      <LetConnect />
    </div>
  );
};

export default page;
