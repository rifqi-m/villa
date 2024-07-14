"use client";
import Avatar from "@/shared/Avatar";
import SocialsList from "@/shared/SocialsList";
import dayjs from "dayjs";
import Image from "next/image";
import { useGetNewsById } from "./queries";

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useGetNewsById(params.id);
  const renderHeader = () => {
    if (isLoading) {
      return (
        <header className="container rounded-xl animate-pulse">
          <div className="max-w-screen-md mx-auto space-y-5">
            <div className="h-8 bg-gray-300 rounded-md w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
            <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="flex flex-col items-baseline sm:flex-row sm:justify-between">
              <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
                <div className="w-11 h-11 bg-gray-300 rounded-full"></div>
                <div className="ml-3">
                  <div className="h-4 bg-gray-300 rounded-md w-24"></div>
                  <div className="h-3 bg-gray-300 rounded-md w-16 mt-[6px]"></div>
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <div className="w-32 h-8 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>
        </header>
      );
    }
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <h1
            className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
            title="Quiet ingenuity: 120,000 lunches and counting"
          >
            {data?.title}
          </h1>
          <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
            {data?.subtitle}
          </span>

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col items-baseline sm:flex-row sm:justify-between">
            <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
              <Avatar
                containerClassName="flex-shrink-0"
                sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <a className="block font-semibold" href="/">
                    {data?.user?.name}
                  </a>
                </div>
                <div className="text-xs mt-[6px]">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {dayjs(data?.createdAt).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <SocialsList />
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark my-5 animate-pulse">
          <div className="h-4 bg-gray-300 rounded-md w-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded-md w-5/6 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded-md w-4/5 mb-4"></div>
        </div>
      );
    }
    return (
      <div
        id="single-entry-content"
        className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark my-5"
        dangerouslySetInnerHTML={{ __html: data?.content }}
      ></div>
    );
  };

  return (
    <div className="nc-PageSingle pt-8 lg:pt-16 ">
      {renderHeader()}
      <div className="container my-10 sm:my-12 ">
        {isLoading ? (
          <div className="w-full h-64 bg-gray-300 rounded-xl animate-pulse"></div>
        ) : (
          <Image
            className="w-full rounded-xl"
            src={data?.main_image}
            width={300}
            height={300}
            alt=""
          />
        )}
      </div>

      <div className="nc-SingleContent container space-y-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default Page;
