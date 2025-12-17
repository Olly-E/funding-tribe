import Image from "next/image";

import aboutHero from "../../../../public/aboutHero.webp";
import about2Img from "../../../../public/about2Img.webp";
import about3Img from "../../../../public/about3Img.webp";

const page = () => {
  return (
    <div>
      <section className="pt-20 lg:pt-[60px] px-6 sm:px-[50px]">
        <div className="flex gap-10 justify-between items-start">
          <div className="lg:w-[630px]">
            <h1 className="uppercase ">
              Funding Tribe was created to make funding simple and faiR
            </h1>
            <p className="text-[32px]">
              We saw how traditional lenders operate
            </p>
          </div>
          <div className="relative rounded-l-[120px] h-[391px] w-[559px] overflow-x-hidden">
            <Image src={aboutHero} fill alt="stairs" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="mt-[131px] px-6 sm:px-[50px]">
        <div className="flex gap-10 justify-between items-center">
          <div className="relative rounded-l-[120px] h-[257px] w-[559px] overflow-x-hidden">
            <Image src={about2Img} fill alt="stairs" className="object-cover" />
          </div>

          <p className="text-[20px] lg:w-[504px]">
            <strong>They charge interest no matter what happens.</strong> <br />
            <br />
            We wanted something better. A model built on partnership, not
            pressure. That’s how Funding Tribe began — a place where real people
            collaborate to bring projects to life without loans, without red
            tape, and without the heavy weight of interest.
          </p>
        </div>
      </section>
      <div className="border-t-black border-t mt-[90px]" />
      <section className="pt-[86px] px-6 sm:px-[50px]">
        <div className="flex items-center gap-2.5">
          <div className="size-[15px] min-w-[15px] bg-black" />
          <p className="text-left w-full whitespace-nowrap">OUR PHILOSOPHY</p>
        </div>
        <div className="">
          <p className="w-[383px] pt-[92px]">
            We believe that success should be shared, not owned by a bank, but
            by the people who made it possible. If you have the time, why not be
            part of the uplift? Rather than only earning from a land sale, you
            could share in the added value created through development.
          </p>
          <div className="relative rounded-l-[120px] h-[391px] w-[559px] overflow-x-hidden">
            <Image src={about3Img} fill alt="stairs" className="object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
