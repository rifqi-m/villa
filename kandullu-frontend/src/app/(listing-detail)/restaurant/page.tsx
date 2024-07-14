"use client";

import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { filter, keys, map } from "lodash";
import { Route } from "next";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { useGetRestaurant } from "./queries";

export interface ListingExperiencesDetailPageProps {}

const ListingExperiencesDetailPage: FC<
  ListingExperiencesDetailPageProps
> = ({}) => {
  const thisPathname = usePathname();
  const router = useRouter();
  const { data, isLoading } = useGetRestaurant();

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  const renderSection2 = () => {
    if (isLoading) {
      return (
        <div className="listingSection__wrap">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        </div>
      );
    }
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">{data && data[0]?.title}</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <h2 className="text-xl font-normal">{data && data[0]?.about}</h2>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <p>{data && data[0]?.description}</p>
        </div>
        <h2 className="text-xl font-normal">
          <em>{data && data[0]?.summary}</em>
        </h2>
      </div>
    );
  };

  const renderSidebar = () => {
    if (isLoading) {
      return (
        <div className="listingSectionSidebar__wrap shadow-xl">
          <div className="flex flex-col space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-6 bg-gray-300 rounded w-full animate-pulse"
              ></div>
            ))}
            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
          </div>
        </div>
      );
    }
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        <div className="flex flex-col space-y-4">
          {map(keys(data && data[0]?.timings), (timing, index) => (
            <div
              key={index}
              className="flex justify-between text-neutral-6000 dark:text-neutral-300"
            >
              <span className="font-semibold">
                {timing.toLocaleUpperCase()}
              </span>
              <span>{data && data[0]?.timings[timing]}</span>
            </div>
          ))}

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

          <a href={"tel:+50664259581"}>
            <div className="flex items-center justify-start gap-2">
              <i className="las la-phone text-4xl"></i>
              <div className="flex items-center justify-center flex-col">
                <span>Reservations</span>
                <span className="text-primary-800">+50664259581</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className={` nc-ListingExperiencesDetailPage `}>
      {/* SINGLE HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
          {isLoading ? (
            <div className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer h-[80vh] bg-gray-300 animate-pulse"></div>
          ) : (
            <div
              className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer h-[80vh]"
              onClick={handleOpenModalImageGallery}
            >
              <Image
                alt="photo 1"
                fill
                className="object-cover  rounded-md sm:rounded-xl"
                src={data && data[0]?.gallery[0].url}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
          )}
          {isLoading
            ? [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="relative rounded-md sm:rounded-xl overflow-hidden bg-gray-300 animate-pulse aspect-w-4 aspect-h-3"
                ></div>
              ))
            : map(
                filter(data && data[0]?.gallery, (_, i) => i >= 1 && i < 5),
                (item, index) => (
                  <div
                    key={index}
                    className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                      index >= 2 ? "block" : ""
                    }`}
                  >
                    <div className="aspect-w-4 aspect-h-3">
                      <Image
                        alt="photos"
                        fill
                        className="object-cover w-full h-full rounded-md sm:rounded-xl "
                        src={item.url || ""}
                        sizes="400px"
                      />
                    </div>

                    {/* OVERLAY */}
                    <div
                      className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={handleOpenModalImageGallery}
                    />
                  </div>
                )
              )}

          {isLoading ? null : (
            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={handleOpenModalImageGallery}
            >
              <Squares2X2Icon className="h-5 w-5" />
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          )}
        </div>
      </header>

      {/* MAIn */}
      <main className="relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection2()}
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSidebar()}
        </div>
      </main>
    </div>
  );
};

export default ListingExperiencesDetailPage;
