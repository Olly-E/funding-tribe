"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { useComponentVisible } from "../hooks/useComponentVisible";
import HamburgerMenu from "../components/HamburgerMenu";
import CustomCursor from "../components/CustomCursor";
import { email, phone } from "../utils/utils";

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
    setIsComponentVisible,
    dropDownButtonRef,
    handleClickOnDropDownButton,
  } = useComponentVisible();
  const pathname = usePathname();

  return (
    <div className="">
      <CustomCursor isModalOpen={isComponentVisible} />
      <div className="h-[50px] fixed bg-white min-h-[30px] lg:h-auto xl:h-[30px] flex w-full pr-6 sm:pr-[50px] lg:pr-0 justify-between lg:justify-normal lg:relative z-40">
        <Link
          href="/"
          className="pl-6 sm:px-[50px] self-center flex items-center w-fit h-full"
        >
          <Image src={logo} alt="trailing-arrow" className="min-w-[158.45px]" />
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
                <p
                  className={clsx(
                    "group-hover:text-white duration-500 transition-color text-xs text-left w-full",
                    pathname.startsWith(link.href) ? "text-white" : "text-black"
                  )}
                >
                  {link.name}
                </p>
                <div
                  className={clsx(
                    "size-[7px] group-hover:bg-white bg-black duration-500 transition-color",
                    pathname.startsWith(link.href) ? "bg-white" : "bg-black"
                  )}
                />
                <div
                  className={clsx(
                    "absolute h-0 w-full group-hover:h-full bg-black transition-all duration-200 left-0 -z-1",
                    pathname.startsWith(link.href) ? "h-full" : "h-0"
                  )}
                />
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
      <div className="border-b-black border-b fixed top-[50px] lg:top-0 w-full lg:relative z-2" />
      <div
        ref={ref}
        className={clsx(
          "fixed flex modal flex-col justify-between h-screen top-0 w-[300px] pt-[50px] overflow-hidden lg:hidden bg-white border-r border-r-black left-0 transition-[width,padding] duration-500 ease-in-out z-10"
        )}
        style={{
          clipPath: isComponentVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 300ms ease-in-out",
        }}
      >
        <div className="">
          {NAV_LINKS.map((link) => {
            return (
              <Link
                onClick={() => setIsComponentVisible(false)}
                href={link.href}
                className="group relative w-full h-[69px] inline-block"
                key={link.id}
              >
                <div className="flex items-center pl px-6 h-full">
                  <p
                    className={clsx(
                      "group-hover:text-white duration-500 transition-color text-sm text-left w-full",
                      pathname.startsWith(link.href)
                        ? "text-white"
                        : "text-black"
                    )}
                  >
                    {link.name}
                  </p>
                  <div
                    className={clsx(
                      "size-[7px] group-hover:bg-white duration-500 transition-color",
                      pathname.startsWith(link.href) ? "bg-white" : "bg-black"
                    )}
                  />
                  <div
                    className={clsx(
                      "absolute w-full group-hover:h-full bg-black transition-all duration-200 left-0 -z-1",
                      pathname.startsWith(link.href) ? "h-full" : "h-0"
                    )}
                  />
                </div>
                <div className="border-b border-b-black" />
              </Link>
            );
          })}
        </div>
        <div className="">
          <div className="border-b border-b-black" />
          <a
            href={`mailto:${email}`}
            target="_blank"
            className="text-xs uppercase py-4 pl-6"
          >
            info@fundingtribe.co.uk
          </a>
          <div className="border-b border-b-black" />
          <p className="text-xs uppercase py-4 pl-6">
            Level 33, 25 Canada Square, Canary Wharf, London, E14 5LB 
          </p>
          <div className="border-b border-b-black" />
          <a
            target="_blank"
            href={`tel:${phone}`}
            className="text-xs uppercase py-4 pl-6"
          >
            +44(0) 20 39047188{" "}
          </a>
          <div className="border-b border-b-black" />
          <p className="text-xs uppercase py-4 pl-6">© 2025 FUNDING TRIBE</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
