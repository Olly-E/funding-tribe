import Image from "next/image";
import Link from "next/link";

import logo from "../../../../../public/logo.svg";

const Header = () => {
  return (
    <div className="px-6 sm:px-[62px] flex items-center h-[58px] fixed bg-[#FFFFFF] w-full top-0 left-0 z-10 justify-between border-b border-b-black">
      <Link href="/godmode/projects" className="ml-10 sm:ml-0" type="button">
        <Image
          src={logo}
          alt="popins-logo"
          style={{ width: "132px", height: "auto" }}
        />
      </Link>
      <button className="text-red-state">Logout</button>
    </div>
  );
};

export default Header;
