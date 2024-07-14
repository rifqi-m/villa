import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import Avatar from "@/shared/Avatar";
import dayjs from "dayjs";
import { forEach, times } from "lodash";

interface CommentListingDataType {
  name: string;
  avatar?: string;
  date: string;
  comment: string;
  starPoint: number;
}

export interface CommentListingProps {
  className?: string;
  data?: any;
  hasListingTitle?: boolean;
}

const DEMO_DATA: CommentListingDataType = {
  name: "Cody Fisher",
  date: "May 20, 2021",
  comment:
    "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
  starPoint: 5,
};

const CommentListing: FC<CommentListingProps> = ({
  className = "",
  data = DEMO_DATA,
  hasListingTitle,
}) => {
  const renderStars = (stars: number) => {
    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="flex items-center">
        {times(fullStars, (index) => (
          <StarIcon key={`full-${index}`} className="w-4 h-4 text-yellow-500" />
        ))}
        {halfStar === 1 && (
          <StarIcon key="half" className="w-4 h-4 text-yellow-500" />
        )}
        {times(emptyStars, (index) => (
          <StarIcon key={`empty-${index}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };
  return (
    <div
      className={`nc-CommentListing flex space-x-4 ${className}`}
      data-nc-id="CommentListing"
    >
      <div className="flex-grow">
        <div className="flex justify-between space-x-3">
          <div className="flex flex-col">
            {/* <div className="text-sm font-semibold">
              <span>{data.name}</span>
              {hasListingTitle && (
                <>
                  <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                    {` review in `}
                  </span>
                  <a href="/">The Lounge & Bar</a>
                </>
              )}
            </div> */}
            <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {dayjs(data.createdAt).format("DD-MM-YYYY")}
            </span>
          </div>
          <div className="flex text-yellow-500">{renderStars(data.stars)}</div>
        </div>
        <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
          {data.message}
        </span>
      </div>
    </div>
  );
};

export default CommentListing;
