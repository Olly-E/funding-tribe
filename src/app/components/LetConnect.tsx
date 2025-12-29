import { ArrowUp } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const LetConnect = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-5 group my-20 sm:my-[165px] justify-center nx-auto w-fit mx-auto">
      <Link
        href="/contact-us"
        className="text-black group whitespace-nowrap inline-block font-bold text-[32px] sm:text-[64px] underline"
      >
        LET&apos;S CONNECT
      </Link>
      <div className="size-10 min-w-10 sm:size-[86px] sm:min-w-[86px] overflow-hidden">
        <ArrowUp
          className={clsx(
            "flex size-9 sm:size-[78px] gap-3 mx-auto sm:translate-y-[10%] sm:translate-x-[10%] group-hover:translate-x-[80%]  group-active:translate-x-[80%] group-active:translate-y-[-80%] group-hover:translate-y-[-80%] min-w-[18px] transition-all duration-500 rotate-45"
          )}
        />
        <ArrowUp
          className={clsx(
            "flex gap-3 size-9 sm:size-[78px] mx-auto group-hover:-translate-y-[90%] group-active:-translate-y-[90%] group-hover:translate-x-[5%] group-active:translate-x-[5%] translate-x-[-82%] sm:translate-x-[-72%] -translate-y-2 sm:-translate-y-2 transition-all duration-500 min-w-[18px] rotate-45"
          )}
        />
      </div>
    </div>
  );
};

export default LetConnect;
