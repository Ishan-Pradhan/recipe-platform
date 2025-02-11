import React from "react";

const SkeletonLoader = () => {
  return (
    <div class="flex h-full w-full animate-pulse flex-col md:w-96">
      <div class="h-full w-full rounded-t-[16px] bg-gray-300 md:h-64"></div>
      <div class="bg-gray-100 relative flex h-full flex-col justify-between gap-[40px] rounded-b-[16px] p-[24px]">
        <div class="gap-[12px flex h-full flex-col justify-between">
          <div class="h-[21px] w-3/4 rounded bg-gray-300"></div>
          <div class="h-[14px] w-5/6 rounded bg-gray-300"></div>
          <div class="mt-2 h-[14px] w-2/3 rounded bg-gray-300"></div>
        </div>
        <div class="flex flex-col gap-[16px] md:flex-row md:items-center md:justify-between">
          <div class="h-[12px] w-1/2 rounded bg-gray-300"></div>
          <div class="h-[40px] w-32 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
