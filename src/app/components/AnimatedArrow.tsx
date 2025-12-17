import { ArrowUp } from "lucide-react";
import clsx from "clsx";

interface AnimatedArrowClassName {
  className?: string;
}
const AnimatedArrow = ({
  className = "text-black group-hover:text-white",
}: AnimatedArrowClassName) => {
  return (
    <div className="size-[30px] min-w-[30px] overflow-hidden">
      <ArrowUp
        size={18}
        className={clsx(
          "flex gap-3 mx-auto translate-y-6 -translate-x-5 group-hover:translate-x-0 group-hover:translate-y-1.5 min-w-[18px] transition-all duration-500 rotate-45",
          className
        )}
      />
      <ArrowUp
        size={18}
        className={clsx(
          "flex gap-3 mx-auto group-hover:-translate-y-8 group-hover:translate-x-5 -translate-y-3 transition-all duration-500 min-w-[18px] rotate-45",
          className
        )}
      />
      {/*  the initial arrow is down */}
    </div>
  );
};

export default AnimatedArrow;
