"use client";

import BackgroundSection from "@/components/BackgroundSection";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import { Route } from "next";

import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import { useGetVillasById } from "./listing-villa-detail/[id]/queries";
import Foods from "./restaurant/Foods";
import { useGetRestaurant } from "./restaurant/queries";

const DetailtLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const params = useParams();
  const thisPathname = usePathname();

  const { data, isLoading } = thisPathname?.includes("/restaurant")
    ? useGetRestaurant()
    : useGetVillasById(params.id as string);

  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };

  const getImageGalleryListing = () => {
    if (thisPathname?.includes("/listing-villa-detail")) {
      const listingData = data as {
        gallery: any[];
        facilities: any[];
        room_rates: any[];
        id?: string;
        title: string;
        about: string;
        description: string;
        summary: string;
        baths: number;
        beds: number;
        max_guest: number;
      };

      return listingData && listingData?.gallery;
    }
    if (thisPathname?.includes("/restaurant")) {
      // Ensure data is of the correct type before accessing gallery
      const restaurantData = data as {
        id: any;
        title: any;
        about: any;
        menu: any[];
        timings: any;
        gallery: any[];
        description: any;
        summary: any;
      }[];
      return restaurantData && restaurantData[0]?.gallery;
    }

    return [];
  };
  const getFeaturedListing = () => {
    if (thisPathname?.includes("/listing-villa-detail")) {
      return (
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black/20" />
          <SectionSliderNewCategories
            categoryCardType="card4"
            itemPerRow={3}
            heading="LOCAL AMENITIES"
            subHeading=""
            sliderStyle="style2"
          />
        </div>
      );
    }
    if (thisPathname?.includes("/restaurant")) {
      return <SectionGridFeaturePlaces cardType="card2" />;
    }

    return [];
  };

  return (
    <div className="ListingDetailPage">
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={getImageGalleryListing()}
      />

      <div className="container ListingDetailPage__content">{children}</div>

      {thisPathname?.includes("/restaurant") && <Foods />}
      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32">
        {getFeaturedListing()}
        <SectionSubscribe2 className="pt-24 lg:pt-32" />
      </div>
    </div>
  );
};

export default DetailtLayout;
