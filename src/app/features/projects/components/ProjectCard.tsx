"use client";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import { useDeleteProject } from "../api/useDeleteProject";
import { Loader } from "@/app/components/Loader";

interface IProjectCard {
  title: string;
  image: string;
  slug: string;
}
const ProjectCard = ({ image, title, slug }: IProjectCard) => {
  const route = useRouter();
  const { mutate, isPending: deletePending } = useDeleteProject(slug);

  const handleDeleteProject = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    mutate();
  };

  const handleEditProject = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    route.push(`/godmode/projects/new?id=${slug}`);
  };

  return (
    <Link href={`/godmode/projects/${slug}`} className="group relative">
      {image ? (
        <div className="relative h-[221px] w-full sm:w-[184px] rounded-[20px] overflow-hidden">
          <Image
            src={image}
            alt="project-img"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 184px"
          />
        </div>
      ) : (
        <div className="relative h-[221px] centered w-full sm:w-[184px] rounded-[20px] overflow-hidden bg-black/10">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/685/685669.png"
            alt="project-img"
            className="w-20 h-20 min-w-20"
            width={80}
            height={80}
          />
        </div>
      )}
      <div className="pl-2.5 flex gap-10 mt-10">
        <p className="text-sm uppercase font-bold w-full md:w-[184px] h-full">
          {title}
        </p>
        <div className="border-r border-r-black h-[100px]" />
      </div>
      <div className="mt-2 items-center gap-2 w-fit rounded-md flex sm:hidden sm:group-hover:flex absolute top-2 left-2 z-1">
        <button
          onClick={handleDeleteProject}
          disabled={deletePending}
          type="button"
          className="rounded-full bg-white centered size-[34px]"
        >
          {deletePending ? (
            <Loader />
          ) : (
            <Trash2 className="size-4 text-red-state" />
          )}
        </button>
        <button
          onClick={handleEditProject}
          type="button"
          className="rounded-full bg-white centered size-[34px]"
        >
          <Pencil className="size-4 text-black" />
        </button>
      </div>
    </Link>
  );
};

export default ProjectCard;
