import React, { FC } from "react";
import aboutUs from "../../public/caribe-y-comida/IMG_3562.jpeg";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Logo from "@/shared/Logo";
import Image from "next/image";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = aboutUs,
}) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-1/2">
        <Logo className="w-24" />
        <h2 className="font-semibold text-md sm:text-md mt-6 sm:mt-11 text-primary-500">
          About us
        </h2>
        <h2 className="font-bold text-xl sm:text-4xl mt-1 sm:mt-4">
          Tailored services and unique holiday experiences
        </h2>
        <h2 className="font-normal text-lg sm:text-lg mt-1 sm:mt-4">
          Experience unparalleled comfort and personalized service at Villas
          Kandulu.
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Our villas offer a serene escape amidst the natural beauty of Puerto
          Viejo, Limón, Costa Rica. Enjoy the perfect blend of luxury and
          tranquility, with our dedicated staff ensuring every moment of your
          stay is memorable.
        </span>
        <p className="font-normal text-lg sm:text-lg mt-1 sm:mt-4">
          <em>Anjelika...the Owner</em>
        </p>
      </div>
      <div className="flex-grow ">
        <Image alt="" src={rightImg} className="rounded-md" />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
