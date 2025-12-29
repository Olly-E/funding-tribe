import Image from "next/image";
import Link from "next/link";

import AnimatedArrow from "../components/AnimatedArrow";

import whiteLogo from "../../../public/whiteLogo.svg";
import { mapAddress } from "../utils/utils";

const Footer = () => {
  const SOCIALS = [
    {
      title: "INSTAGRAM",
      link: "",
    },
    {
      title: "LINKEDIN",
      link: "",
    },
    {
      title: "FACEBOOK",
      link: "",
    },
    {
      title: "EMAIL",
      link: " ",
    },
  ];

  const WEB_LINKS = [
    {
      title: "ABOUT US",
      link: "/about-us",
    },
    {
      title: "WHO WE WORK WITH",
      link: "/who-we-work-with",
    },
    {
      title: "PROJECTS",
      link: "/projects",
    },
    {
      title: "NEWS",
      link: "/news",
    },
    {
      title: "CONTACT US",
      link: "/contact-us",
    },
  ];

  const emailUser = "contact";
  const emailDomain = "fundingtribe";
  const emailTld = "co.uk";
  const phoneParts = ["+44", "20", "3904", "7188"];
  const phone = phoneParts.join("");
  const email = `${emailUser}@${emailDomain}.${emailTld}`;
  return (
    <footer className="bg-black">
      <div className="md:pl-[50px] grid grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col md:flex-row justify-between col-span-2 md:col-span-1 h-[171px] md:h-auto">
          <Link
            href="/"
            className="md:pr-[50px] pt-[30px] mx-auto md:mx-0 md:pt-[52px] flex items-start w-fit h-full"
          >
            <Image
              src={whiteLogo}
              alt="trailing-arrow"
              className="min-w-[101px] h-auto"
            />
          </Link>
          <div className="border-t border-t-white md:border-r md:border-r-white" />
        </div>
        <div className="text-white flex justify-between">
          <div className="pt-[50.75px] pb-[52.5px] px-6 sm:px-[50px] space-y-5">
            {WEB_LINKS.map((link) => {
              return (
                <Link
                  href={link.link}
                  className="flex items-center gap-2.5 group"
                  key={link.title}
                >
                  <div className="size-[7px] min-w-[7px] group-hover:translate-x-0.5 transition-all duration-500 bg-white" />
                  <p className="text-xs group-hover:translate-x-0.5 transition-all duration-500">
                    {link.title}
                  </p>
                </Link>
              );
            })}
          </div>
          <div className="border-r border-r-white" />
        </div>
        <div className="text-white flex justify-between pr-6 sm:pr-[50px]">
          <div className="pt-[45px] sm:pt-[50.75px] pb-[52.5px] px-6 sm:px-[50px] space-y-2 sm:space-y-5">
            {SOCIALS.map((link) => {
              return (
                <Link
                  href={link.link}
                  className="flex items-center gap-2.5 group"
                  key={link.title}
                >
                  <AnimatedArrow className="text-white" />
                  <p className="group-hover:translate-x-0.5 transition-all duration-500 text-xs">
                    {link.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-t-white" />
      <div className="sm:h-[102px] xs:space-y-0 space-y-10 py-10 sm:py-0 gap-4 gap-y-10 xs:grid xs:grid-cols-2 sm:grid-cols-3 text-xs items-center pl-6 sm:pl-[50px] text-white">
        <a
          href={`mailto:${email}`}
          target="_blank"
          className="pl-0.5 uppercase inline-block"
        >
          info@fundingtribe.co.uk
        </a>
        <a
          target="_blank"
          href={`tel:${phone}`}
          className="xs:pl-6 block sm:pl-[53px]"
        >
          +44(0) 20 39047188
        </a>
        <a
          href={mapAddress}
          className="max-w-[169px] inline-block sm:max-w-[273px] sm:mt-0 sm:pl-[50.5px] uppercase col-span-2 sm:col-span-1"
        >
          Level 33, 25 Canada Square, Canary Wharf, London, E14 5LB 
        </a>
      </div>
      <div className="border-t border-t-white" />
      <div className="sm:h-[102px] grid grid-cols-2 sm:grid-cols-3 text-xs items-center sm:pl-[50px] text-white">
        <div className="flex flex-col-reverse sm:flex-row order-3 sm:order-1 justify-between items-center h-full col-span-2 sm:col-span-1">
          <p className="pl-0.5 text-center sm:text-start w-full h-[74px] pt-7">
            © 2025 FUNDING TRIBE
          </p>
          <div className="border-t border-t-white w-full sm:w-auto sm:border-r sm:border-r-white h-0 sm:h-full" />
        </div>
        <div className="flex justify-between h-[76px] sm:h-full items-center order-2">
          <Link href="" className="pl-6 sm:pl-[53px]">
            PRIVACY POLICY
          </Link>
          <div className="sm:border-r sm:border-r-white h-full" />
        </div>
        <div className="flex max-w-[273px] pl-6 sm:pl-[50.5px] w-full order-1 sm:order-3 justify-between h-full items-center">
          <Link href="" className="">
            TERMS & CONDITIONS{" "}
          </Link>
          <div className="border-r border-r-white sm:border-r-0 h-full" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
