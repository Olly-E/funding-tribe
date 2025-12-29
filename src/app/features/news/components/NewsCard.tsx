"use client";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

interface INewsCard {
  title: string;
  slug: string;
  img: string;
}
const NewsCard = ({ slug, title, img }: INewsCard) => {
  const route = useRouter();

  const handleDeleteNews = () => {};

  const handleEditNews = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    route.push(`/godmode/news/new?id=${slug}`);
  };
  return (
    <Link href={`/godmode/news/${slug}`} className="relative group">
      {img ? (
        <div className="relative h-[221px] w-full sm:w-[184px] rounded-[20px] overflow-hidden">
          <Image
            src={img}
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
        <div className="mt-2 items-center gap-2 w-fit rounded-md sm:hidden sm:group-hover:flex flex absolute top-2 left-2 z-1">
          <button
            type="button"
            onClick={handleDeleteNews}
            className="rounded-full bg-white centered size-[34px]"
          >
            <Trash2 className="size-4 text-red-state" />
          </button>
          <button
            type="button"
            onClick={handleEditNews}
            className="rounded-full bg-white centered size-[34px]"
          >
            <Pencil className="size-4 text-black" />
          </button>
        </div>
        <div className="border-r border-r-black h-[100px]" />
      </div>
    </Link>
  );
};

export default NewsCard;
