"use client";
import Image from "next/image";
import React from "react";

import logo from "../../../public/logo.svg";
import Link from "next/link";
import HamburgerMenu from "../components/HamburgerMenu";
import { useComponentVisible } from "../hooks/useComponentVisible";
import clsx from "clsx";

const Navbar = () => {
  const NAV_LINKS = [
    {
      name: "ABOUT US",
      id: "about-us",
      href: "/about-us",
    },
    {
      name: "WHO WE WORK WITH",
      id: "who-we-work-with",
      href: "/who-we-work-with",
    },
    {
      name: "INVEST",
      id: "invest",
      href: "/invest",
    },
    {
      name: "PROJECTS",
      id: "projects",
      href: "/projects",
    },
    {
      name: "NEWS",
      id: "news",
      href: "/news",
    },
    {
      name: "CONTACT US",
      id: "contact-us",
      href: "/contact-us",
    },
  ];
  const {
    ref,
    isComponentVisible,
    dropDownButtonRef,
    handleClickOnDropDownButton,
  } = useComponentVisible();
  return (
    <div className="border-t border-t-black ">
      <div className="h-[50px] min-h-[30px] lg:h-auto xl:h-[30px] flex w-full pr-6 sm:pr-[50px] lg:pr-0 justify-between lg:justify-normal">
        <Link
          href="/"
          className="pl-6 sm:px-[50px] self-center flex items-center w-fit h-full"
        >
          <Image src={logo} alt="trailing-arrow" className="min-w-[128.45px]" />
        </Link>
        <div className="w-full grid-cols-6 hidden lg:grid">
          {NAV_LINKS.map((link) => {
            return (
              <Link
                href={link.href}
                className="flex items-center duration-500 transition-color group hover:bg-black w-full justify-between pr-[7px] h-full"
                key={link.id}
              >
                <div className="border-l h-full border-l-black mr-[7px]" />
                <p className="group-hover:text-white duration-500 transition-color text-xs text-left w-full">
                  {link.name}
                </p>
                <div className="size-[7px] group-hover:bg-white bg-black duration-500 transition-color" />
              </Link>
            );
          })}
        </div>
        <div className="block lg:hidden">
          <HamburgerMenu
            isOpen={isComponentVisible}
            handleClick={handleClickOnDropDownButton}
            buttonRef={dropDownButtonRef}
          />
        </div>
      </div>
      <div className="border-b-black border-b" />
      <div
        ref={ref}
        className={clsx(
          "fixed h-screen top-0 pt-[60px] flex lg:hidden bg-white border-r border-r-black left-0 flex-col justify-between transition-[width,padding] duration-500 ease-in-out z-10",
          isComponentVisible ? "w-[300px] px-6 py-10" : "w-0 p-0 h-0"
        )}
      ></div>
    </div>
  );
};

export default Navbar;
