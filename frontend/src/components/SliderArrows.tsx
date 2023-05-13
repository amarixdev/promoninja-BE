import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import useSlider, { useMediaQuery } from "../utils/hooks";
import { RefObject } from "react";

const SliderArrows = ({
  sliderRef,
  scrollDistance,
}: {
  sliderRef: RefObject<HTMLDivElement>;
  scrollDistance: number;
}) => {
  const isBreakPoint = useMediaQuery(1023);
  const { showLeftArrow, showRightArrow, slideTopPicks } = useSlider(
    sliderRef.current,
    scrollDistance
  );
  if (isBreakPoint) return <></>;
  else
    return (
      <>
        <div
          className={`absolute left-0 ${
            showLeftArrow ? "hover:cursor-pointer" : "hover:cursor-auto"
          } group-hover:bg-[#00000026] opacity-100 hover:opacity-100 w-20 h-[300px] flex items-center z-10`}
          onClick={() => slideTopPicks("left")}
        >
          <MdChevronLeft
            color={"white"}
            className={` left-0 hidden rounded-full opacity-100 absolute cursor-pointer z-[11] ${
              showLeftArrow ? "group-hover:block" : "hidden"
            }`}
            size={80}
          />
        </div>
        <div
          className={`absolute right-0 ${
            showRightArrow ? "hover:cursor-pointer" : "hover:cursor-auto"
          }  hover:cursor-pointer group-hover:bg-[#00000026] opacity-100 hover:opacity-100 w-20 h-[300px] flex items-center z-10`}
          onClick={() => slideTopPicks("right")}
        >
          <MdChevronRight
            color={"white"}
            className={` right-0 hidden rounded-full opacity-100 absolute cursor-pointer z-[11] ${
              showRightArrow ? "group-hover:block" : "hidden"
            }`}
            size={80}
          />
        </div>
      </>
    );
};

export default SliderArrows;
