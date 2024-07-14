import React, { FC } from "react";
import Heading from "@/shared/Heading";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

const Local_Amenities: Statistic[] = [
  {
    id: "1",
    heading: "Local Restaurants",
    subHeading:
      "Enjoy exquisite dining options that showcase the flavors of Costa Rica.",
  },
  {
    id: "2",
    heading: "Nature",
    subHeading:
      "Enjoy exquisite dining options that showcase the flavors of Costa Rica.",
  },
  {
    id: "3",
    heading: "Art and Culture",
    subHeading:
      "Immerse yourself in the rich artistic and cultural heritage of the island.",
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading desc="Discover the vibrant local amenities that make your stay at Villas Kandulu unforgettable. From delightful restaurants to serene nature spots, and rich cultural experiences, there's something for everyone.">
        Local Amenities
      </Heading>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
        {Local_Amenities.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <div className="flex items-center justify-start">
              <i className="las la-bookmark text-4xl text-primary-500"></i>
              <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
                {item.heading}
              </h3>
            </div>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
