"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useAllAdminProjects } from "../features/projects/api/useAllAdminProjects";
import { useResponsiveVisibility } from "../hooks/useResponsiveVisibility";
import { FullPageLoader } from "./FullPageLoader";
import Link from "next/link";

// 1. Define the shape of your data
interface ImageData {
  src: string;
  alt: string;
  title: string;
  slug: string;
}

const RandomBorderCard = ({ src, alt, title, slug }: ImageData) => {
  const [borderRadius, setBorderRadius] = useState<string>("");
  const smallScreen = useResponsiveVisibility(640, "max");

  useEffect(() => {
    const corners = ["0px", "0px", "0px", "0px"];
    const radiusValue = smallScreen ? "56px" : "120px";

    const countToRound = Math.floor(Math.random() * 3) + 1;
    const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);

    for (let i = 0; i < countToRound; i++) {
      corners[indices[i]] = radiusValue;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBorderRadius(corners.join(" "));
  }, [smallScreen]);

  return (
    <Link
      href={`/projects/${slug}`}
      className="flex flex-col items-center group min-w-[150.3px] sm:min-w-[313px]"
    >
      <div
        className="relative overflow-hidden w-full bg-gray-200 transition-all duration-700 ease-in-out shadow-xl h-[180.1px] sm:h-[400px]"
        style={{
          borderRadius,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="sm:w-[313px] flex mt-10">
        <h3 className="text-sm pr-6 sm:pr-0 sm:text-[24px] sm:ml-[30px] font-semibold uppercase text-gray-800">
          {title}
        </h3>
        <div className="border-l border-l-black min-h-[120px] sm:min-h-[200px]" />
      </div>
    </Link>
  );
};

const RandomBorderGallery = () => {
  const { data, isPending } = useAllAdminProjects();

  const projectData = data?.data || [];

  if (isPending) {
    <FullPageLoader className="h-[30vh]! justify-center! flex" />;
  }
  return (
    <div className="flex overflow-scroll gap-6 sm:gap-[50px] px-6 sm:px-[50px] scrollbar-hide">
      {projectData &&
        projectData?.map((item, index) => (
          <RandomBorderCard
            key={index}
            src={item?.imgUrls?.[0]?.url || ""}
            alt={item.title}
            title={item.title}
            slug={item.slug}
          />
        ))}
    </div>
  );
};

export default RandomBorderGallery;
