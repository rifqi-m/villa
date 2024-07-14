import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import imagePng from "../../../public/events.jpg";

export interface SectionHero3Props {
  className?: string;
  smallText?: string;
  headText?: string;
  image?: StaticImageData;
}

const SectionHero3: FC<SectionHero3Props> = ({
  className = "",
  smallText = " LUXURY VACATION EXPERIENCE",
  headText = " NEWS AND EVENTS",
  image = imagePng,
}) => {
  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="absolute z-10 inset-x-0 top-[40%] sm:top-[40%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-5 xl:space-y-8">
        <span className="sm:text-lg md:text-xl font-semibold text-primary-400">
          {smallText}
        </span>
        <h2 className="font-bold text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl !leading-[115%] ">
          {headText}
        </h2>
      </div>
      <div className="relative aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8 ">
        <Image
          className="absolute inset-0 object-cover rounded-xl"
          src={image}
          alt="hero"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
      </div>
    </div>
  );
};

export default SectionHero3;
