"use client";
import React from "react";
import { useGetFaq } from "./queries";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionClientSay from "@/components/SectionClientSay";
import BackgroundSection from "@/components/BackgroundSection";
import { map } from "lodash";
import RenderSkeleton from "./FAQSkeleton";

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading } = useGetFaq();
  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      <div className="container relative space-y-24 mb-24 ">
        <div className="p-8">
          <div className="bg-white dark:bg-black p-4 rounded-lg shadow-xl py-8 mt-12">
            <h4 className="text-4xl font-bold text-primary-800 tracking-widest uppercase text-center">
              FAQ
            </h4>
            <p className="text-center text-gray-600 dark:text-white text-sm mt-2">
              Here are some of the frequently asked questions
            </p>
            <div className="space-y-12 px-2 xl:px-16 mt-12">
              {isLoading ? (
                <>
                  <RenderSkeleton />
                  <RenderSkeleton />
                  <RenderSkeleton />
                </>
              ) : (
                map(data, (item, index) => {
                  return (
                    <div className="mt-4 flex" key={index}>
                      <div>
                        <div className="flex items-center h-16 border-l-4 border-primary-800">
                          <span className="text-4xl text-primary-800 px-4">
                            Q.
                          </span>
                        </div>
                        <div className="flex items-center h-16 border-l-4 border-gray-400">
                          <span className="text-4xl text-gray-400 px-4">
                            A.
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center h-16">
                          <span className="text-lg text-primary-800 font-bold">
                            {item.question}
                          </span>
                        </div>
                        <div className="flex items-center py-2">
                          <span className="text-gray-500">{item.answer}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>
        <SectionSubscribe2 />
      </div>
    </main>
  );
};

export default FAQ;
