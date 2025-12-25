"use client";
import Image, { StaticImageData } from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Link from "next/link";
import { useDeleteProject } from "../api/useDeleteProject";
import { Loader } from "@/app/components/Loader";

interface IProjectCard {
  title: string;
  image: StaticImageData;
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
    <Link href={`/godmode/projects/${title}`} className="group relative">
      <Image
        alt="project-img"
        className="h-[221px] sm:w-[184px] object-cover rounded-[20px]"
        src={image}
      />
      <div className="pl-2.5 flex gap-10 mt-10">
        <p className="text-sm uppercase font-bold w-full md:w-[184px] h-full">
          {title}
        </p>
        <div className="border-r border-r-black h-[100px]" />
      </div>
      <div className="mt-2 items-center gap-2 w-fit rounded-md hidden group-hover:flex absolute top-2 left-2 z-10">
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
