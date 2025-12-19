import Link from "next/link";

import ProjectImgView from "@/app/components/ProjectImgView";
import LetConnect from "@/app/components/LetConnect";

const ProjectDetailsPage = () => {
  return (
    <div>
      <section className="flex justify-between w-full flex-col sm:flex-row">
        <div className="w-full lg:min-w-[641px]">
          <div className="pt-[120px] lg:pt-[60px] pb-15 pl-6 sm:pl-[50px] text-center sm:text-start pr-6 sm:pr-0">
            <h1 className="lg:max-w-[567px] mx-auto sm:mx-0">
              Bexley Road, Northumberland Heath
            </h1>
          </div>
          <div className="border-t-black border-t block" />
          <div className="pt-[60px] px-[50px] pb-[200px]">
            <h2 className="font-bold text-[20px] leading-[124%]">
              Project Summary:
            </h2>
            <p className="mt-10 text-[20px] leading-[124%]">
              Funding Tribe partnered with the developer to deliver a
              three-storey redevelopment of two detached houses into nine modern
              two-bed apartments, each with parking and private amenity space.
            </p>
            <h2 className="font-bold text-[20px] mt-10 leading-[124%]">
              Our Role:
            </h2>
            <ul className="list-disc list-inside text-[20px] mt-8 leading-[124%]">
              <li>Raised and structured the full development funding.</li>
              <li>
                Supported the developer through acquisition, demolition, and
                construction.
              </li>
              <li>Managed investor confidence throughout the build period.</li>
            </ul>
            <h2 className="font-bold text-[20px] mt-10 leading-[124%]">
              Outcome:
            </h2>
            <p className="mt-10 text-[20px] leading-[124%]">
              The development was successfully completed. The developer
              refinanced the building, retained all nine units as long-term
              rentals, and all Funding Tribe investors were fully repaid on
              refinance.
              <br />
              <br />A strong example of Funding Tribe enabling developers to
              unlock capital, complete projects, and hold assets for ongoing
              income.
            </p>
            <Link
              href="#sticky"
              className="mt-20 inline-block text-[24px] group relative underline-offset-2"
            >
              <p className="whitespace-nowrap">Back to all</p>
              <div className="border-t-black w-0 border-t-2 mt-[90px] group-hover:w-full duration-500 transition-all bottom-0 absolute" />
            </Link>
          </div>
        </div>
        <div className="flex w-full justify-between ">
          <div className="border-l-black border-l h-full block" />
          <ProjectImgView />
        </div>
      </section>
      <div className="border-t-black border-t" />
      <LetConnect />
    </div>
  );
};

export default ProjectDetailsPage;
