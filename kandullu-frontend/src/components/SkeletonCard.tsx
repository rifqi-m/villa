import React from "react";

const SkeletonCardCategory4 = ({ className = "" }) => {
  return (
    <div
      className={`nc-CardCategory4 my-2 flex flex-col ${className}`}
      data-nc-id="SkeletonCardCategory4"
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden bg-gray-300 animate-pulse`}
      >
        <span className="opacity-0 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="flex flex-col items-center justify-between mt-4 px-2 text-center">
        <div className="w-full">
          <div className="h-6 bg-gray-300 rounded-md w-3/4 mx-auto animate-pulse"></div>
          <div className="mt-2 h-4 bg-gray-300 rounded-md w-full animate-pulse"></div>
          <div className="mt-1 h-4 bg-gray-300 rounded-md w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardCategory4;
