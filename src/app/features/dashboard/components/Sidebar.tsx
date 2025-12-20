"use client";

import { Contact, Home, Newspaper, Tickets } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import clsx from "clsx";

import logo from "../../../../../public/logo.svg";

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

  return (
    <div
      className={clsx(
        "h-screen hidden w-[264px] lg:flex bg-[#FFFFFF] relative flex-col justify-between border-r transition-[width,padding] duration-500 ease-in-out z-2 px-[11px] border-r-black"
      )}
    >
      <div
        className={clsx(
          "w-full h-full flex flex-col justify-between transition-opacity duration-300"
        )}
      >
        <div className="w-full relative z-4">
          <div className="mt-[100px]">
            {DASHBOARD_LINK.map((link) => {
              const isActive = pathname.startsWith(link.link);
              return (
                <Link
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
  );
};

export default Sidebar;
