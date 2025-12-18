import Image from "next/image";

import LetConnect from "@/app/components/LetConnect";
import StaffGrid from "@/app/components/StaffGrid";
import { Button } from "@/app/components/Button";

import aboutHero from "../../../../public/aboutHero.webp";
import about2Img from "../../../../public/about2Img.webp";
import about3Img from "../../../../public/about3Img.webp";

const page = () => {
  return (
    <div>
      <section className="pt-20 lg:pt-[60px] px-6 sm:px-[50px]">
        <div className="flex flex-col md:flex-row gap-10 justify-between md:items-start">
          <div className="sm:w-[450px] md:w-[630px]">
            <h1 className="uppercase ">
              Funding Tribe was created to make funding simple and faiR
            </h1>
            <p className="text-[24px] lg:text-[32px] mt-6">
              We saw how traditional lenders operate
            </p>
          </div>
          <div className="relative rounded-l-[80px] sm:rounded-l-[120px] h-[221px] sm:h-[391px] w-[90vw] sm:w-[559px] overflow-x-hidden self-end md:self-auto translate-x-6 sm:translate-x-[50px] md:translate-x-0">
            <Image src={aboutHero} fill alt="stairs" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="mt-[131px] px-6 sm:px-[50px]">
        <div className="flex gap-10 justify-between items-center">
          <div className="relative hidden md:block rounded-l-[120px] h-[257px] w-[559px] overflow-x-hidden">
            <Image src={about2Img} fill alt="stairs" className="object-cover" />
          </div>

          <p className="text-base sm:text-[20px] max-w-[504px]">
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
      <section className="pt-[86px] px-6 sm:px-[50px] pb-40">
        <div className="flex items-center gap-2.5">
          <div className="size-[15px] min-w-[15px] bg-black" />
          <p className="text-left w-full whitespace-nowrap">OUR PHILOSOPHY</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20 items-start justify-between">
          <p className="xs:w-[383px] pt-[92px] text-base sm:text-[20px]">
            We believe that success should be shared, not owned by a bank, but
            by the people who made it possible. <br /> <br /> If you have the
            time, why not be part of the uplift? Rather than only earning from a
            land sale, you could share in the added value created through
            development.
          </p>
          <div className="relative rounded-bl-[120px] h-[392px] md:h-[670px] self-center w-[278px] md:w-[475px] overflow-x-hidden">
            <Image src={about3Img} fill alt="stairs" className="object-cover" />
          </div>
          <div className="xs:w-[383px] self-end text-base sm:text-[20px]">
            <p className="">
              It’s like a farmer selling coffee beans for £5 a kilo, while cafés
              turn those same beans into £3 cups — hundreds of pounds in value.{" "}
              <br />
              <br />
              That’s what we help you do — stay part of the process, add value,
              and earn more from what you already own. At{" "}
              <span className="font-bold">Funding Tribe</span>, we fund, build,
              and share the reward — together.
            </p>
            <Button
              showArrow={true}
              className="group w-full justify-between! mt-[70px]"
            >
              Be A Part Of The Movement
            </Button>
          </div>
        </div>
      </section>
      <section className="">
        <div className="flex items-center gap-2.5 pl-6 sm:pl-[50px]">
          <div className="size-[15px] min-w-[15px] bg-black" />
          <p className="text-left w-full whitespace-nowrap">MEET OUR TEAM</p>
        </div>
        <StaffGrid />
        <div className="border-t-black border-t" />

        <LetConnect />
      </section>
    </div>
  );
};

export default page;
