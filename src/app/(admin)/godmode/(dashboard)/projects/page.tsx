import { PROJECT_DATA } from "@/app/utils/data";
import Image from "next/image";

import projectCImg1 from "../../../../../../public/projectCImg1.webp";
import { Search } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="px-[62px] mb-[25px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-[15px] min-w-[15px] bg-black" />
          <p className="text-left w-full whitespace-nowrap">FUNDED PROJECTS</p>
        </div>
        <div className="w-[395px] h-[38px] border border-black-2 rounded-[5px] flex items-center px-3">
          <Search size={16} color="#000000" className="min-w-4" />
          <input
            type="text"
            placeholder="Search project"
            className="w-full h-full px-2 py-2 text-sm text-black border-none bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-10 xl:gap-20 pl-6 sm:pl-[50px] xl:pl-10 pr-6 sm:pr-[50px] xl:justify-items-end">
        {PROJECT_DATA.map((project, index) => {
          return (
            <div key={index}>
              <Image
                alt="project-img"
                className="h-[221px] sm:w-[184px] object-cover rounded-[20px]"
                src={projectCImg1}
              />
              <div className="pl-2.5 flex gap-10 mt-10">
                <p className="text-sm uppercase font-bold w-full md:w-[184px] h-full">
                  {project.title}
                </p>
                <div className="border-r border-r-black h-[100px]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
