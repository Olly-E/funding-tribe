"use client";
import Image from "next/image";
import React from "react";

import ImageSlider from "./ImageSlider";

import projectCImg1 from "../../../public/projectCImg1.webp";
import projectCImg2 from "../../../public/projectCImg2.png";
import projectCImg3 from "../../../public/projectCImg3.png";

const ProjectImgView = () => {
  const PROJECT_IMG = [projectCImg1, projectCImg2, projectCImg3];
  const [active, setActive] = React.useState(1);
  const handleActiveImg = (index: number) => {
    setActive(index);
  };
  
  console.log({active})
  return (
    <div className="w-full">
      <div className="pt-[61px] pl-6 sm:pl-[50px] pr-6 sm:pr-[50px] w-full">
        <div className="h-[437px] sm:h-[807px] w-full relative rounded-bl-[120px] overflow-hidden">
          <Image
            src={PROJECT_IMG[active]}
            alt="stairs"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <ImageSlider
        handleActiveImg={handleActiveImg}
        active={active}
        data={PROJECT_IMG}
      />
    </div>
  );
};

export default ProjectImgView;
