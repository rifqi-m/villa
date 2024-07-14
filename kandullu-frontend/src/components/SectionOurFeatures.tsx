import rightImgPng from "@/images/our-features.png";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <Image src={rightImg} alt="" />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          VILLAS KANDULU
        </span>
        <h2 className="font-semibold text-4xl mt-5">Main Facilities</h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <MakiParkingGarage />
            <span className="block text-xl font-semibold">Private Parking</span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Secure and convenient private parking available for all guests.
            </span>
          </li>
          <li className="space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#978667" // Set the stroke color
              width="36" // Set the width
              height="36" // Set the height
              className="icon" // Optional: Custom class for additional styling
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
              />
            </svg>

            <span className="block text-xl font-semibold">High-Speed Wifi</span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Stay connected with our complimentary high-speed internet access.
            </span>
          </li>
          <li className="space-y-4">
            <GuidanceBar />
            <span className="block text-xl font-semibold">
              Bar & Restaurant
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Enjoy delicious local and international cuisine at our on-site
              restaurant and bar.
            </span>
          </li>
          <li className="space-y-4">
            <FluentSwimmingPool48Regular />

            <span className="block text-xl font-semibold">Swimming Pool</span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Relax and unwind in our luxurious swimming pool, perfect for a
              refreshing dip.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;

export const FluentSwimmingPool48Regular = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      fill="#978667"
      d="M9 10.75a3.25 3.25 0 0 1 6.5 0v13.402c.8.075 1.634.204 2.5.397V21h15.5v8.058a17.217 17.217 0 0 0 2.5-.264V10.75a5.75 5.75 0 0 0-11.5 0v1a1.25 1.25 0 1 0 2.5 0v-1a3.25 3.25 0 0 1 6.5 0v7.75H18v-7.75a5.75 5.75 0 0 0-11.5 0v1a1.25 1.25 0 1 0 2.5 0v-1Zm13.054 20.003c-9.48-4.866-14.726-.355-14.964-.15l-.002.001c-.51.458-1.3.418-1.76-.09a1.238 1.238 0 0 1 .08-1.75c.27-.25 6.689-5.941 17.806-.23c9.928 5.105 17.586.757 17.906.568c.59-.349 1.36-.15 1.71.438c.349.587.16 1.353-.44 1.701c-.23.14-3.9 2.259-9.438 2.259c-3.837-.103-7.472-.983-10.898-2.747ZM7.09 39.603c.238-.205 5.485-4.716 14.964.15c3.426 1.764 7.06 2.644 10.898 2.747c5.538 0 9.207-2.12 9.437-2.259c.6-.348.79-1.114.44-1.702a1.256 1.256 0 0 0-1.71-.437c-.32.189-7.977 4.537-17.905-.567c-11.117-5.712-17.535-.02-17.805.228a1.238 1.238 0 0 0-.08 1.752c.46.507 1.25.547 1.76.09v-.002Z"
    ></path>
  </svg>
);

export const GuidanceBar = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      stroke="#978667"
      d="M10 19v4.5m0-4.5c0-4 3.167-9.806 7.063-13.053L18.5 4.75V4.5h-4.973M10 19c0-4-3.167-9.806-7.063-13.053L1.5 4.75V4.5h12.027M10 23.5H5m5 0h5m-9.5-15h9m3.5 1a4.5 4.5 0 1 0-4.473-5"
    ></path>
  </svg>
);

export const MakiParkingGarage = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 15 15"
    {...props}
  >
    <path
      fill="#978667"
      d="M10.5 10.14a3.53 3.53 0 0 1-2.29.66h-1.9V14h-1.9V5h3.92a3.2 3.2 0 0 1 2.16.69a2.69 2.69 0 0 1 .81 2.15a2.76 2.76 0 0 1-.8 2.3zM9 6.9a1.56 1.56 0 0 0-1-.3H6.31v2.65H8a1.48 1.48 0 0 0 1-.32a1.31 1.31 0 0 0 .36-1A1.23 1.23 0 0 0 9 6.9zm5.41-2.69a.5.5 0 0 0-.24-.66L7.5.45L.79 3.55a.501.501 0 1 0 .42.91L7.5 1.55l6.29 2.9a.5.5 0 0 0 .66-.24h-.04z"
    ></path>
  </svg>
);
