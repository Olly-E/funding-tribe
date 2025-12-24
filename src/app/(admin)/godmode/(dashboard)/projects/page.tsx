"use client";
import { Search } from "lucide-react";

import { useAllAdminProjects } from "@/app/features/projects/api/useAllAdminProjects";
import ProjectCard from "@/app/features/projects/components/ProjectCard";
import { FullPageLoader } from "@/app/components/FullPageLoader";
import { Button } from "@/app/components/Button";

import projectCImg1 from "../../../../../../public/projectCImg1.webp";

const ProjectPage = () => {
  const { data, isPending } = useAllAdminProjects();
  

  const projectData = data?.data || [];
  return (
    <div className="pb-10 mt-[31px]">
      <div className="px-6 md:px-[62px] mb-[25px] flex flex-col md:flex-row gap-10 items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-[15px] min-w-[15px] bg-black" />
          <p className="text-left w-full whitespace-nowrap">FUNDED PROJECTS</p>
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
            href="/godmode/projects/new"
          >
            ADD<span className="hidden sm:inline"> NEW</span> PROJECT +
          </Button>
        </div>
      </div>
      {isPending ? (
        <div>
          <FullPageLoader className="h-[60vh]!" />
        </div>
      ) : (
        <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-10 xl:gap-20 pl-6 sm:pl-[50px] xl:pl-10 pr-6 sm:pr-[50px] xl:justify-items-end">
          {projectData.map((project) => {
            return (
              <ProjectCard
                key={project.slug}
                title={project.title}
                image={projectCImg1}
                slug={project.slug}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
