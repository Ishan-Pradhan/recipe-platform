import React from "react";
import Button from "../Button";

const CulinarySection = () => {
  return (
    <section
      className="container mx-auto mb-10"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-delay="200"
    >
      <div className="mx-4   flex flex-col gap-[40px] border border-dark border-opacity-20 rounded-[24px] py-4 px-4  md:gap-4 md:rounded-[32px]">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-[14px]">
          <div className="col-span-1 md:col-span-2 gap-[14px] md:row-span-1 flex flex-col md:flex-row md:justify-between md:items-end md:h-96">
            <div className="flex flex-col items-start md:justify-start md:items-start gap-[8px] md:gap-[20px] md:w-[50%]">
              <span className="uppercase py-1 px-3 rounded-full bg-primaryRed text-light font-semibold">
                about us
              </span>
              <h2 className="uppercase leading-[26px] text-[26px] font-[700] md:text-[40px] md:leading-[40px] ">
                our culinary <br /> chronicle
              </h2>
              <p className="text-[14px] leading-[19.6px] text-dark text-opacity-80 md:text-[16px] md:leading-[22.4px]">
                Our journey is crafted with dedication, creativity, and an
                unrelenting commitment to delivering delightful culinary
                experiences. Join us in savoring the essence of every dish and
                the stories that unfold.
              </p>
              <Button
                color="background"
                cases="uppercase"
                content="read more"
                border="true"
              />
            </div>
            <img
              src="images/c1.jpeg"
              className="h-80 md:h-full md:w-96 object-cover rounded-[24px]"
              alt=""
            />
          </div>
          <img
            src="images/c3.jpeg"
            className="col-span-1 row-span-1 h-80 w-full  md:col-span-1 md:row-span-2 md:h-full object-cover rounded-[24px]"
            alt=""
          />
          <img
            src="images/c2.png"
            className="col-span-1 row-span-1 h-80 w-full md:col-span-2 md:row-span-1 md:h-96 md:w-full object-cover rounded-[24px]"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default CulinarySection;
