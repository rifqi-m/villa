"use client";

import { useGetAmenities } from "@/app/queries";
import CardCategory4 from "@/components/CardCategory4";
import Heading from "@/shared/Heading";
import { variants } from "@/utils/animationVariants";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { map, size } from "lodash";
import { FC, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useWindowSize } from "react-use";
import SkeletonCardCategory4 from "./SkeletonCard";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5 | 3;
  sliderStyle?: "style1" | "style2";
  beforeHeading?: string;
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  beforeHeading = "VILLAS KANDULU",
  heading = "Our Villas",
  subHeading = "Experience unparalleled comfort and personalized service in the heart of Puerto Viejo.",
  className = "",
  itemClassName = "",
  itemPerRow = 5,
  categoryCardType = "card3",
  sliderStyle = "style1",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfitem] = useState(0);
  const { data, isLoading } = useGetAmenities();

  const windowWidth = useWindowSize().width;

  useEffect(() => {
    if (windowWidth < 768) {
      setNumberOfitem(1);
    } else if (windowWidth < 1024) {
      setNumberOfitem(itemPerRow - 2);
    } else if (windowWidth < 1280) {
      setNumberOfitem(itemPerRow - 1);
    } else {
      setNumberOfitem(itemPerRow);
    }
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < size(data) - 1) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

  const renderCard = (item: {
    image: string;
    title: string;
    description: string;
    path: string;
  }) => {
    return <CardCategory4 taxonomy={item} />;
  };

  if (!numberOfItems) return null;

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <h2 className="font-semibold mb-2 text-sm sm:text-sm mt-6 sm:mt-11 text-primary-500">
        {beforeHeading}
      </h2>
      <Heading desc={subHeading} isCenter={sliderStyle === "style2"}>
        {heading}
      </Heading>
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className={`relative flow-root`} {...handlers}>
          <div className={`flow-root overflow-hidden rounded-xl`}>
            <motion.ul initial={false} className="relative -mx-2 xl:-mx-4">
              <AnimatePresence initial={false} custom={direction}>
                {isLoading ? (
                  <>
                    <motion.li
                      className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                      custom={direction}
                      initial={{
                        x: `${currentIndex * -100}%`,
                      }}
                      animate={{
                        x: `${currentIndex * -100}%`,
                      }}
                      variants={variants(200, 1)}
                      style={{
                        width: `calc(100% / ${numberOfItems})`,
                      }}
                    >
                      <SkeletonCardCategory4 />
                    </motion.li>
                    <motion.li
                      className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                      custom={direction}
                      initial={{
                        x: `${currentIndex * -100}%`,
                      }}
                      animate={{
                        x: `${currentIndex * -100}%`,
                      }}
                      variants={variants(200, 1)}
                      style={{
                        width: `calc(100% / ${numberOfItems})`,
                      }}
                    >
                      <SkeletonCardCategory4 />
                    </motion.li>
                    <motion.li
                      className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                      custom={direction}
                      initial={{
                        x: `${currentIndex * -100}%`,
                      }}
                      animate={{
                        x: `${currentIndex * -100}%`,
                      }}
                      variants={variants(200, 1)}
                      style={{
                        width: `calc(100% / ${numberOfItems})`,
                      }}
                    >
                      <SkeletonCardCategory4 />
                    </motion.li>
                  </>
                ) : (
                  map(data, (item, indx) => (
                    <motion.li
                      className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                      custom={direction}
                      initial={{
                        x: `${currentIndex * -100}%`,
                      }}
                      animate={{
                        x: `${currentIndex * -100}%`,
                      }}
                      variants={variants(200, 1)}
                      key={indx}
                      style={{
                        width: `calc(100% / ${numberOfItems})`,
                      }}
                    >
                      {renderCard(item)}
                    </motion.li>
                  ))
                )}
              </AnimatePresence>
            </motion.ul>
          </div>
        </div>
      </MotionConfig>
    </div>
  );
};

export default SectionSliderNewCategories;
