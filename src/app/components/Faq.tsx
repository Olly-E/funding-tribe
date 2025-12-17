"use client";

import { ArrowDown } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

import { Button } from "./Button";

interface faqDataProps {
  faqData: {
    title: string;
    answer: string;
    id: string;
  }[];
}
export const Faq = ({ faqData }: faqDataProps) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<null | number>(0);

  const handleChangeFaQ = (index: number | null) => {
    setActiveFaqIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="lg:gap-[50px] lg:justify-between items-center relative">
      {faqData.map((question, index) => {
        const isActive = activeFaqIndex === index;
        return (
          <button
            type="button"
            key={index}
            onClick={() => handleChangeFaQ(index)}
            className={clsx(
              "text-left w-full gap-10 py-8 sm:py-10 group pr-4 sm:pr-[50px]",
              index < faqData.length - 1 && "border-b border-b-black",
              ""
            )}
          >
            <div className="flex items-start gap-10 flex-1 justify-between w-full">
              <div className="flex items-start gap-[30px]">
                <p className="mt-1">{`0.0${question.id}`}</p>
                <p
                  className={clsx(
                    "text-base sm:text-[24px] text-black uppercase transition-colors"
                  )}
                >
                  {question.title}
                </p>
              </div>
              <div className="rounded-br-[21px] sm:rounded-br-[30px] border border-black centered h-10 w-10 min-w-10 sm:h-[50px] sm:min-h-[50px] sm:min-w-[50px] group-hover:bg-black transition-colors duration-500">
                <div className="size-[30px] min-w-[30px] overflow-hidden">
                  <ArrowDown
                    size={18}
                    className={clsx(
                      "flex gap-3 mx-auto -translate-y-4 group-hover:translate-y-1.5 min-w-[18px] transition-all duration-500 text-black group-hover:text-white",
                      isActive ? "rotate-180" : "rotate-0"
                    )}
                  />
                  <ArrowDown
                    size={18}
                    className={clsx(
                      "flex gap-3 mx-auto group-hover:translate-y-4 -translate-y-3 transition-all duration-500 min-w-[18px] text-black group-hover:text-white",
                      isActive ? "rotate-180" : "rotate-0"
                    )}
                  />
                  {/*  the initial arrow is down */}
                </div>
              </div>
            </div>
            <div
              className={clsx(
                "overflow-hidden transition-all duration-500",
                isActive ? "max-h-[300px]" : "max-h-0 py-0"
              )}
            >
              <div className="mt-4 text-black w-[80%] md:w-[500px] text-sm sm:text-base">
                {question.answer}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
