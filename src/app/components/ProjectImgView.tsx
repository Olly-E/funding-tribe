"use client";
import Image from "next/image";
import React from "react";

import ImageSlider from "./ImageSlider";

interface IProjectImgView {
  imgFiles: string[];
}
const ProjectImgView = ({ imgFiles }: IProjectImgView) => {
  const [active, setActive] = React.useState(1);
  const handleActiveImg = (index: number) => {
    setActive(index);
  };

  console.log({ active });
  return (
    <div className="w-full">
      <div className="pt-12 sm:pt-[61px] pl-6 sm:pl-[50px] pr-6 sm:pr-[50px] w-full">
        <div className="h-[437px] sm:h-[807px] w-full relative rounded-bl-[120px] overflow-hidden">
          <Image
            src={
              imgFiles[active] ||
              "https://cdn-icons-png.flaticon.com/512/685/685669.png"
            }
            alt="stairs"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <ImageSlider
        handleActiveImg={handleActiveImg}
        active={active}
        data={imgFiles}
      />
    </div>
  );
};

export default ProjectImgView;
