import ButtonPrimary from "@/shared/ButtonPrimary";
import { map } from "lodash";
import { FC } from "react";
import GallerySlider from "./GallerySlider";

type villaType = {
  id?: string;
  title: string;
  about: string;
  gallery: {
    url: string;
    index: string;
  }[];
  description: string;
  summary: string;
  facilities: Array<any>;
  room_rates: Array<any>;
  baths: number;
  beds: number;
  max_guest: number;
};
export interface StayCardProps {
  className?: string;
  data: villaType;
  size?: "default" | "small";
}

const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data,
}) => {
  const {
    gallery,
    room_rates,
    about,
    title,

    id,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={map(gallery, (item) => item.url)}
          href={`/listing-villa-detail/${id}` as any}
          galleryClass={size === "default" ? undefined : ""}
        />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-1"}>
        <div className={size === "default" ? "space-y-2" : "space-y-1"}>
          <div className="flex items-center space-x-2">
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === "default" ? "text-base" : "text-base"
              }`}
            >
              <span>{title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm h-[10vh] space-x-1.5">
            <span className="">{about}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center ">
          <span className="text-base font-semibold">
            ${room_rates[0].rates}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /night
              </span>
            )}
          </span>
          {/* {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )} */}
          <span className="text-sm">
            <ButtonPrimary
              className="text-xs"
              href={`/listing-villa-detail/${id}` as any}
            >
              Checkout
            </ButtonPrimary>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 ${
        size === "default"
          ? "border border-neutral-100 dark:border-neutral-800 "
          : ""
      } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      {renderContent()}
    </div>
  );
};

export default StayCard;
