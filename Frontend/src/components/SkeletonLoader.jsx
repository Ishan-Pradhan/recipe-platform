import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col md:w-full h-full animate-pulse">
      <div className="bg-gray-300 h-full md:h-64 w-full rounded-t-[16px]"></div>
      <div className="flex flex-col justify-between gap-[40px] bg-light p-[24px] rounded-b-[16px] relative h-full">
        <div className="flex flex-col justify-between gap-[12px] h-full">
          <div className="bg-gray-300 h-[21px] w-3/4 rounded"></div>
          <div className="bg-gray-300 h-[14px] w-5/6 rounded"></div>
          <div className="bg-gray-300 h-[14px] w-2/3 rounded mt-2"></div>
        </div>
        <div className="flex flex-col gap-[16px] md:flex-row md:justify-between md:items-center">
          <div className="bg-gray-300 h-[12px] w-1/2 rounded"></div>
          <div className="bg-gray-300 h-[40px] w-32 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
