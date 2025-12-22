import Image from "next/image";
import React from "react";

import newsImg from "../../../../../../../public/newsImg.png";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const page = () => {
  return (
    <div className="">
      <section className="grid grid-cols-1 sm:grid-cols-2">
        <div className=" md:pr-[50px] xl:pr-[99px] pl-6 sm:pb-[60px] sm:pt-16 sm:pl-[50px]">
          <Link
            href="/godmode/news"
            className="hover:bg-black size-9 mt-6 sm:mt-0 sm:mb-4 centered rounded-full group group-hover:bg-black transition-colors"
          >
            <ArrowLeft
              size={24}
              className="text-black group-hover:text-white"
            />
          </Link>
          <div className="top-[100px] lg:top-[50px] w-full sm:h-[497px] rounded-br-[120px] hidden sm:block sm:sticky overflow-hidden relative h-[255px]">
            <Image src={newsImg} fill alt="stairs" className="object-cover" />
          </div>
        </div>
        <div className="flex justify-between mt-4 md:mt-10 w-full flex-col sm:flex-row pb-20">
          <div className="w-full xl:min-w-[641px] xl:pl-[50px] sm:pr-[50px] pr-6 pl-6">
            <h1 className="lg:max-w-[567px] text-center sm:text-left mx-auto sm:mx-0 sm:pt-[100px] lg:pt-[50px]">
              Bexley Road, Northumberland Heath
            </h1>
            <div className=" w-full mt-10 rounded-br-[120px] sm:hidden overflow-hidden relative h-[255px]">
              <Image src={newsImg} fill alt="stairs" className="object-cover" />
            </div>
            <div className="flex items-center justify-between gap-10 mt-15 text-xs ">
              <p>27.10.2025</p>
              <p>FUNDING</p>
            </div>

            <h2 className="font-bold sm:text-[20px] leading-[124%] mt-6 sm:mt-10">
              Project Summary:
            </h2>
            <p className="mt-4 sm:mt-10 sm:text-[20px] leading-[124%]">
              Funding Tribe partnered with the developer to deliver a
              three-storey redevelopment of two detached houses into nine modern
              two-bed apartments, each with parking and private amenity space.
            </p>
            <h2 className="font-bold sm:text-[20px] mt-6 sm:mt-10 leading-[124%]">
              Our Role:
            </h2>
            <ul className="list-disc list-outside pl-5 sm:text-[20px] mt-4 sm:mt-8 leading-[124%]">
              <li className="">
                Raised and structured the full development funding.
              </li>
              <li>
                Supported the developer through acquisition, demolition, and
                construction.
              </li>
              <li>Managed investor confidence throughout the build period.</li>
            </ul>
            <h2 className="font-bold sm:text-[20px] mt-6 sm:mt-10 leading-[124%]">
              Outcome:
            </h2>
            <p className="mt-4 sm:mt-10 sm:text-[20px] leading-[124%]">
              The development was successfully completed. The developer
              refinanced the building, retained all nine units as long-term
              rentals, and all Funding Tribe investors were fully repaid on
              refinance.
              <br />
              <br />A strong example of Funding Tribe enabling developers to
              unlock capital, complete projects, and hold assets for ongoing
              income.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
