"use client";
import React, { FC } from "react";

import Card12 from "./Card12";
import Card13 from "./Card13";
import { useGetNews } from "./queries";
import { filter, map } from "lodash";

const SectionMagazine5 = () => {
  const { data, isLoading } = useGetNews();
  const renderLoadingSkeleton = () => {
    return (
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 animate-pulse">
        <div className="bg-gray-300 h-64 rounded-md"></div>
        <div className="grid gap-6 md:gap-8">
          <div className="bg-gray-300 h-40 rounded-md"></div>
          <div className="bg-gray-300 h-40 rounded-md"></div>
          <div className="bg-gray-300 h-40 rounded-md"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="nc-SectionMagazine5">
      {isLoading ? (
        renderLoadingSkeleton()
      ) : (
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {data && <Card12 news={data[0]} />}
          <div className="grid gap-6 md:gap-8">
            {map(
              filter(data, (_, i) => Number(i) > 0),
              (item, index) => (
                <Card13 key={index} news={item} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionMagazine5;
