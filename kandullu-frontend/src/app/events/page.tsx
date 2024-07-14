"use client";
import SectionHero3 from "@/app/(server-components)/SectionHero3";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import CardCategory6 from "@/components/CardCategory6";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import { map } from "lodash";
import { useGetEvent } from "./queries";

function PageHome3() {
  const { data, isLoading } = useGetEvent();
  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      <BgGlassmorphism />

      <div className="container px-1 sm:px-4 mb-24 ">
        <SectionHero3 className="" />
      </div>

      <div className="container relative space-y-24 mb-24 ">
        <div className="grid grid-cols-12 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="col-span-12 sm:col-span-6 lg:col-span-4 flex animate-pulse"
                >
                  <div className="w-full h-64 bg-gray-300 rounded-md"></div>
                </div>
              ))
            : map(data, (item, index) => (
                <div
                  key={index}
                  className="col-span-12 sm:col-span-6 lg:col-span-4 flex"
                >
                  <CardCategory6 taxonomy={item} />
                </div>
              ))}
        </div>

        <SectionSubscribe2 />
      </div>
    </main>
  );
}

export default PageHome3;
