"use client";
import clsx from "clsx";

interface IHamburgerMenu {
  handleClick: () => void;
  isOpen: boolean;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}
const HamburgerMenu = ({ handleClick, isOpen, buttonRef }: IHamburgerMenu) => {
  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="group relative h-12 w-12 rounded-lg transition-all focus:outline-none"
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div
        className={clsx(
          "absolute left-1/2  h-0.5 w-6 -translate-x-1/2 bg-black z-10 transition-all duration-300 ease-in-out",
          "group-hover:translate-y-0",
          isOpen ? "rotate-45 translate-y-0" : "-translate-y-[5px]"
        )}
      ></div>

      <div
        className={clsx(
          "absolute left-1/2 h-0.5 w-6 -translate-x-1/2 z-10 bg-black transition-all duration-300 ease-in-out",
          "group-hover:translate-y-0",
          isOpen ? "-rotate-45 translate-y-0" : "translate-y-[5px]"
        )}
      ></div>
    </button>
  );
};

export default HamburgerMenu;
