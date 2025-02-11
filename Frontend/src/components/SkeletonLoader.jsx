import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex h-full w-full animate-pulse flex-col md:w-96">
      <div className="h-full w-full rounded-t-[16px] bg-gray-300 md:h-64"></div>
      <div className="bg-gray-100 relative flex h-full flex-col justify-between gap-[40px] rounded-b-[16px] p-[24px]">
        <div className="gap-[12px flex h-full flex-col justify-between">
          <div className="h-[21px] w-3/4 rounded bg-gray-300"></div>
          <div className="h-[14px] w-5/6 rounded bg-gray-300"></div>
          <div className="mt-2 h-[14px] w-2/3 rounded bg-gray-300"></div>
        </div>
        <div className="flex flex-col gap-[16px] md:flex-row md:items-center md:justify-between">
          <div className="h-[12px] w-1/2 rounded bg-gray-300"></div>
          <div className="h-[40px] w-32 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
