"use client";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { useComponentVisible } from "../hooks/useComponentVisible";
import HamburgerMenu from "../components/HamburgerMenu";

import logo from "../../../public/logo.svg";

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
    <div className="">
      <div className="h-[50px] bg-white min-h-[30px] lg:h-auto xl:h-[30px] flex w-full pr-6 sm:pr-[50px] lg:pr-0 justify-between lg:justify-normal relative z-2">
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
                className="flex items-center duration-500 transition-color group relative w-full justify-between pr-[7px] h-full"
                key={link.id}
              >
                <div className="border-l h-full border-l-black mr-[7px]" />
                <p className="group-hover:text-white duration-500 transition-color text-xs text-left w-full">
                  {link.name}
                </p>
                <div className="size-[7px] group-hover:bg-white bg-black duration-500 transition-color" />
                <div className="absolute h-0 w-full group-hover:h-full bg-black transition-all duration-200 left-0 -z-1" />
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
      <div className="border-b-black border-b relative z-2" />
      <div
        ref={ref}
        className={clsx(
          "fixed h-screen top-0 w-[300px] pt-[50px] overflow-hidden lg:hidden bg-white border-r border-r-black left-0 transition-[width,padding] duration-500 ease-in-out z-1"
        )}
        style={{
          clipPath: isComponentVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 300ms ease-in-out",
        }}
      >
        {NAV_LINKS.map((link) => {
          return (
            <Link
              href={link.href}
              className="group relative w-full h-[69px] inline-block"
              key={link.id}
            >
              <div className="flex items-center pl px-6 h-full">
                <p className="group-hover:text-white duration-500 transition-color text-sm text-left w-full">
                  {link.name}
                </p>
                <div className="size-[7px] group-hover:bg-white bg-black duration-500 transition-color" />
                <div className="absolute h-0 w-full group-hover:h-full bg-black transition-all duration-200 left-0 -z-1" />
              </div>
              <div className="border-b border-b-black" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
