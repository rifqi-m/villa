"use client";

import ButtonPrimary from "@/shared/ButtonPrimary";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { notification, Select } from "antd";
import { Route } from "next";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import SectionDateRange from "../../SectionDateRange";
import GuestsInput from "./../GuestsInput";
import StayDatesRangeInput from "./../StayDatesRangeInput";
import CommentListing from "@/components/CommentListing";
import StartRating from "@/components/StartRating";
import { filter, isEmpty, map, reduce, size } from "lodash";
import {
  useGetVillasById,
  useGetVillasReviewById,
  useReserveBooking,
  useCreateReview,
} from "./queries";
import { GuestsObject } from "@/app/(client-components)/type";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";
import ButtonCircle from "@/shared/ButtonCircle";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Input from "@/shared/Input";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import { PathName } from "@/routers/types";
import dayjs from "dayjs";

const { Option } = Select;

export interface ListingStayDetailPageProps {
  params: { id: string };
}

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({ params }) => {
  const route = useRouter();
  const { data, isLoading } = useGetVillasById(params.id);
  const { data: villaReviews, isLoading: isVillaReviewsLoading } =
    useGetVillasReviewById(params.id);
  const { mutate: createBooking, isPending: isBookingLoading } =
    useReserveBooking();
  const { mutate: createReview, isPending: isCreateReviewLoading } =
    useCreateReview();

  const [selectedRate, setSelectedRate] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [remainingPrice, setRemainingPrice] = useState(0);
  const [totaldays, setTotalDays] = useState(0);
  const [paymentType, setPaymentType] = useState<
    "full_payment" | "half_payment"
  >("full_payment");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [reviewInput, setReviewInput] = useState<string>("");
  const [point, setPoint] = useState<number>(0);

  const [guests, setGuests] = useState({
    adults: 2,
    child: 1,
    infants: 1,
  });

  const handlePoint = (value: number) => {
    setPoint(value);
  };

  const handleGuests = (value: {
    adults: number;
    child: number;
    infants: number;
  }) => {
    setGuests(value);
  };

  const thisPathname = usePathname();
  const router = useRouter();

  const handleTotalPrice = (value: number) => {
    setTotalPrice(value);
  };
  const handleStartDate = (value: Date | null) => {
    setStartDate(value);
  };
  const handleEndDate = (value: Date | null) => {
    setEndDate(value);
  };
  const handleRemainingPrice = (value: number) => {
    setRemainingPrice(value);
  };
  const handlePayment = (value: "full_payment" | "half_payment") => {
    setPaymentType(value);
  };
  const handleTotalDays = (value: number) => {
    setTotalDays(value);
  };
  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  const handleRateChange = (value: number) => {
    setSelectedRate(value);
  };

  const calculateAverageStars = (reviews: any) => {
    if (size(reviews) === 0) return 0;

    const totalStars = reduce(reviews, (sum, review) => sum + review.stars, 0);
    return totalStars / size(reviews);
  };

  const handleCreateReview = () => {
    const AUTH =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("auth") as string)
        : null;
    if (AUTH.user.role === "admin") {
      notification.error({ message: "Admin cannot post review" });
      return;
    }
    if (isEmpty(AUTH)) {
      router.push("/login" as PathName);
      return;
    }
    let value = {
      stars: Number(point),
      message: reviewInput,
      villa_id: Number(params.id),
      user_id: Number(AUTH.user.id),
    };

    createReview(value, {
      onSuccess: () => {
        notification.success({ message: "Review Added successfully" });
        setReviewInput("");
        setPoint(0);
        queryClient.invalidateQueries({ queryKey: ["review-villa-id"] });
      },
      onError: (error) => {
        displayErrorMessage(error);
      },
    });
  };

  const handleBooking = () => {
    const AUTH =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("auth") as string)
        : null;

    if (isEmpty(AUTH)) {
      router.push("/login" as PathName);
      return;
    }
    if (AUTH.user.role === "admin") {
      notification.error({ message: "Admin cannot reserve" });
      return;
    }

    let value = {
      property_id: Number(params.id),
      amount: totalPrice,
      start_date: dayjs(startDate).format("YYYY-MM-DD"),
      end_date: dayjs(endDate).format("YYYY-MM-DD"),
      pending_amount: remainingPrice,
      guests: guests,
      payment_type: paymentType,
      user_id: Number(AUTH?.user.id),
      is_paid_partially: paymentType === "full_payment" ? false : true,
      is_paid: false,
    };

    createBooking(value, {
      onSuccess: (data) => {
        route.push(data?.url);
        queryClient.invalidateQueries({ queryKey: ["booking"] });
      },
      onError: (error) => {
        displayErrorMessage(error);
      },
    });
  };

  useEffect(() => {
    handleTotalPrice(selectedRate * totaldays);
    if (paymentType === "full_payment") {
      handleRemainingPrice(0);
      handleTotalPrice(selectedRate * totaldays);
    } else {
      handleRemainingPrice((selectedRate * totaldays) / 2);
      handleTotalPrice((selectedRate * totaldays) / 2);
    }
  }, [selectedRate, totaldays, paymentType]);
  useEffect(() => {
    if (!isLoading) {
      handleRateChange(data?.room_rates[0]?.rates);
    }
  }, [data]);

  const renderSection1 = () => {
    if (isLoading || isVillaReviewsLoading) {
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
      <div className="listingSection__wrap !space-y-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {data?.title}
        </h2>

        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-3 ">
            <i className=" las la-user text-2xl "></i>
            <span className="">
              {data?.max_guest}{" "}
              <span className="hidden sm:inline-block">guests</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-bed text-2xl"></i>
            <span className=" ">
              {data?.beds}{" "}
              <span className="hidden sm:inline-block">bedrooms</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-bath text-2xl"></i>
            <span className=" ">
              {data?.baths}{" "}
              <span className="hidden sm:inline-block">bathrooms</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    if (isLoading || isVillaReviewsLoading) {
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
        <h2 className="text-2xl font-semibold">Stay information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          {data?.description}
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    if (isLoading || isVillaReviewsLoading) {
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
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {map(data?.facilities, (item) => (
            <div key={item.name} className="flex items-center space-x-3">
              <i className={`text-3xl las ${item.icon}`}></i>
              <span className=" ">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSection4 = () => {
    if (isLoading || isVillaReviewsLoading) {
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
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Room Rates </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            {map(data?.room_rates, (room, i) => (
              <div
                key={i}
                className={`p-4 ${
                  Number(i) % 2 === 0
                    ? "bg-neutral-100 dark:bg-neutral-800"
                    : ""
                } flex justify-between items-center space-x-4 rounded-lg`}
              >
                <span>{room.name}</span>
                <span>${room.rates}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSection6 = () => {
    if (isLoading || isVillaReviewsLoading) {
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
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">
          Reviews ({size(villaReviews)} reviews)
        </h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate
            point={point}
            handlePoint={handlePoint}
            iconClass="w-6 h-6"
            className="space-x-0.5"
          />
          <div className="relative">
            <Input
              fontClass=""
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />

            <ButtonCircle
              onClick={handleCreateReview}
              disabled={isCreateReviewLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {map(villaReviews, (item, index) => (
            <CommentListing key={index} className="py-8" data={item} />
          ))}
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    if (isLoading || isVillaReviewsLoading) {
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
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold flex items-center gap-1">
            ${selectedRate}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              <Select
                className="mt-4"
                value={selectedRate}
                placeholder="Select room rate"
                onChange={handleRateChange}
              >
                {data?.room_rates.map((rate) => (
                  <Option key={rate.name} value={rate.rates}>
                    {rate.name}
                  </Option>
                ))}
              </Select>
            </span>
          </span>
          <StartRating
            point={calculateAverageStars(villaReviews)}
            reviewCount={size(villaReviews)}
          />
        </div>

        {/* Content */}

        {/* FORM */}
        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <StayDatesRangeInput
            className="flex-1 z-[11]"
            startDate={startDate}
            endDate={endDate}
            handleStartDate={handleStartDate}
            handleEndDate={handleEndDate}
            handleTotalDays={handleTotalDays}
          />
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <GuestsInput className="flex-1" handleGuests={handleGuests} />
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <Select
            className="mt-4"
            value={paymentType}
            placeholder="Select payment type"
            onChange={handlePayment}
          >
            {[
              { name: "Full Payment", value: "full_payment" },
              { name: "Half Payment", value: "half_payment" },
            ].map((item) => (
              <Option key={item.name} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </form>

        {/* SUM */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>
              {selectedRate} x {totaldays}
            </span>
            <span>${selectedRate * totaldays}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Remaining</span>
            <span>${remainingPrice}</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary onClick={handleBooking} loading={isBookingLoading}>
          Reserve
        </ButtonPrimary>
      </div>
    );
  };

  return (
    <div className="nc-ListingStayDetailPage">
      {/*  HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          {isLoading ? (
            <div className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer h-[80vh] bg-gray-300 animate-pulse"></div>
          ) : (
            <div
              className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={handleOpenModalImageGallery}
            >
              <Image
                fill
                className="object-cover rounded-md sm:rounded-xl"
                src={data?.gallery[0].url}
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
          )}
          {isLoading || isVillaReviewsLoading
            ? [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="relative rounded-md sm:rounded-xl overflow-hidden bg-gray-300 animate-pulse aspect-w-4 aspect-h-3"
                ></div>
              ))
            : map(
                filter(data?.gallery, (_, i) => i >= 1 && i < 5),
                (item, index) => (
                  <div
                    key={index}
                    className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                      Number(index) >= 3 ? "hidden sm:block" : ""
                    }`}
                  >
                    <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                      <Image
                        fill
                        className="object-cover rounded-md sm:rounded-xl "
                        src={item.url || ""}
                        alt=""
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

          {isLoading || isVillaReviewsLoading ? null : (
            <button
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
              onClick={handleOpenModalImageGallery}
            >
              <Squares2X2Icon className="w-5 h-5" />
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </button>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSection4()}
          <SectionDateRange title={data?.title as string} id={params.id} />
          {renderSection6()}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
        <div className="w-full block lg:hidden lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSidebar()}
        </div>
      </main>
    </div>
  );
};

export default ListingStayDetailPage;
