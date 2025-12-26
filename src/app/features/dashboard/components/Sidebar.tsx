"use client";

import { Home, Newspaper } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import { useComponentVisible } from "@/app/hooks/useComponentVisible";
import HamburgerMenu from "@/app/components/HamburgerMenu";

const Sidebar = () => {
  const pathname = usePathname();

  const DASHBOARD_LINK = [
    {
      name: "Projects",
      link: "/godmode/projects",
      id: "home",
      subLinks: null,
      icon: Home,
    },
    {
      name: "News",
      link: "/godmode/news",
      id: "events",
      subLinks: null,
      icon: Newspaper,
    },
  ];

  const DETAILS = ["/godmode/projects/", "/godmode/news/"];
  const isDetailLink = DETAILS.some((path) => pathname.startsWith(path));

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
    dropDownButtonRef,
    handleClickOnDropDownButton,
  } = useComponentVisible();

  return (
    <div className="">
      <HamburgerMenu
        isOpen={isComponentVisible}
        handleClick={handleClickOnDropDownButton}
        buttonRef={dropDownButtonRef}
        className="z-10 fixed! lg:hidden"
      />

      <div
        ref={ref}
        className={clsx(
          isDetailLink
            ? "w-0 p-0 h-0"
            : isComponentVisible
              ? "w-[237px] px-[11px] fixed lg:relative"
              : "w-0 lg:w-[237px] px-0 lg:px-[11px] fixed lg:relative",
          "h-screen overflow-hidden lg:flex bg-[#FFFFFF] flex-col justify-between border-r transition-[width,padding] duration-500 ease-in-out z-2 border-r-black"
        )}
      >
        <div
          className={clsx(
            "w-full lg:h-full flex flex-col justify-between transition-opacity duration-300"
          )}
        >
          <div className="w-full relative z-4">
            <div className="mt-[100px]">
              {DASHBOARD_LINK.map((link) => {
                const isActive = pathname.startsWith(link.link);
                return (
                  <Link
                    onClick={() => setIsComponentVisible(false)}
                    href={link.link}
                    className={clsx(
                      "flex items-center gap-5 h-12 mt-2 px-3 rounded-[10px] hover:bg-black group transition-colors",
                      isActive && "bg-black"
                    )}
                    key={link.id}
                  >
                    <link.icon
                      size={24}
                      className={clsx(
                        "text-black group-hover:text-[#FFFFFF]",
                        isActive && "text-white"
                      )}
                    />
                    <p
                      className={clsx(
                        "text-black group-hover:text-[#FFFFFF]",
                        isActive && "text-white"
                      )}
                    >
                      {link.name}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
