import React, { useState } from "react";

import { Empty } from "antd";
import { filter, isEmpty, map } from "lodash";
import FoodItem from "./FoodItem";
import Skeleton from "./Skeleton";
import { useGetRestaurant } from "./queries";

const Foods = () => {
  const { data, isLoading } = useGetRestaurant();

  const [menuTab, setMenuTab] = useState("Breakfast");

  //food menu tab
  const handleMenuTabs = (type: React.SetStateAction<string>) => {
    setMenuTab(type);
  };

  return (
    <section className="my-12 max-w-screen-xl mx-auto px-6">
      {/* food Menu tab  */}
      <div className="flex items-center justify-center space-x-6">
        <p
          className={
            menuTab === "Breakfast"
              ? "bg-primary-500 text-white p-2 rounded-full cursor-pointer"
              : "text-neutral-500 dark:text-white cursor-pointer"
          }
          onClick={() => handleMenuTabs("Breakfast")}
        >
          Breakfast
        </p>
        <p
          className={
            menuTab === "Lunch"
              ? "bg-primary-500 text-white p-2 rounded-full cursor-pointer"
              : "text-neutral-500 dark:text-white cursor-pointer"
          }
          onClick={() => handleMenuTabs("Lunch")}
        >
          Lunch
        </p>
        <p
          className={
            menuTab === "Dinner"
              ? "bg-primary-500 text-white p-2 rounded-full cursor-pointer"
              : "text-neutral-500 dark:text-white cursor-pointer"
          }
          onClick={() => handleMenuTabs("Dinner")}
        >
          Dinner
        </p>
      </div>

      {/* all foods  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          data &&
          map(
            filter(
              data[0].menu,
              (item: any) => menuTab.toLowerCase() === item.foodType
            ),
            (item: any) =>
              isEmpty(item) ? (
                <Empty style={{ padding: "2rem auto" }} />
              ) : (
                <FoodItem key={item._id} {...item} />
              )
          )
        )}
      </div>
    </section>
  );
};

export default Foods;
