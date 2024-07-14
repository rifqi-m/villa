"use client";
import { useGetVillas } from "@/app/queries";
import { map } from "lodash";
import { FC, ReactNode } from "react";
import HeaderFilter from "./HeaderFilter";
import SkeletonCardCategory4 from "./SkeletonCard";
import StayCard from "./StayCard";

//
export interface SectionGridFeaturePlacesProps {
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  gridClass = "",
  heading = "Our Villas",
  subHeading = "Experience unparalleled comfort and personalized service in the heart of Puerto Viejo",

  tabs = ["New York", "Tokyo", "Paris", "London"],
}) => {
  const { data, isLoading } = useGetVillas();
  const renderCard = (stay: any) => {
    let CardName = StayCard;

    return <CardName key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={"New York"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ${gridClass}`}
      >
        {isLoading ? (
          <>
            <SkeletonCardCategory4 />
            <SkeletonCardCategory4 />
            <SkeletonCardCategory4 />
          </>
        ) : (
          map(data, (stay) => renderCard(stay))
        )}
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
