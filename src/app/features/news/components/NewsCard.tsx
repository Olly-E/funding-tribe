'use client'
import Image, { StaticImageData } from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Link from "next/link";

interface INewsCard {
  title: string;
  slug: string;
  img: StaticImageData;
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
      <Image
        alt="news-img"
        className="h-[221px] sm:w-[184px] object-cover rounded-[20px]"
        src={img}
      />
      <div className="pl-2.5 flex gap-10 mt-10">
        <p className="text-sm uppercase font-bold w-full md:w-[184px] h-full">
          {title}
        </p>
        <div className="mt-2 items-center gap-2 w-fit rounded-md hidden group-hover:flex absolute top-2 left-2 z-10">
          <button
            type="button"
            onClick={handleDeleteNews}
            className="rounded-full bg-white centered size-[34px]"
          >
            <Trash2 className="size-4 text-red-state" />
          </button>
          <button type="button" onClick={handleEditNews} className="rounded-full bg-white centered size-[34px]">
            <Pencil className="size-4 text-black" />
          </button>
        </div>
        <div className="border-r border-r-black h-[100px]" />
      </div>
    </Link>
  );
};

export default NewsCard;
