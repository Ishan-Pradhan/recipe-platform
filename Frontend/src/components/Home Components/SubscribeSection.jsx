import React from "react";
import Button from "../Button";

const SubscribeSection = () => {
  return (
    <section
      className="container mx-auto mb-10 "
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-delay="200"
    >
      <div className="relative overflow-hidden  rounded-[24px] mx-4   flex flex-col gap-[48px] p-4 md:p-16 bg-primaryRed md:justify-center md:items-center">
        <div className="bg-[#FF6653] opacity-40 absolute top-[-10%] left-[-10%] h-[200px] w-[400px] md:h-[500px] md:w-full rounded-[50%] md:left-0 md:-top-80"></div>
        <div className="bg-[#ff6653] opacity-40 absolute bottom-[-10%] left-[-10%] h-[200px] w-[400px] rounded-[50%] md:h-[500px] md:w-full md:-bottom-80 md:left-0 "></div>
        <div className="flex flex-col justify-center items-center gap-[12px] z-10">
          <span className="uppercase text-base font-[500] leading-[16px] text-background text-opacity-70 text-center md:text-[18px]">
            subscribe
          </span>
          <h3 className="uppercase text-center font-[800] text-[38px] leading-[38px] md:text-[80px] md:leading-[110%] text-background">
            join the fun <br />
            subscribe now!
          </h3>
          <p className="text-background text-opacity-70 text-[16px] leading-[22.4px] text-center md:w-[60%]">
            Subscribe to our newsletter for a weekly serving of recipes, cooking
            tips, and exclusive insights straight to your inbox.
          </p>
        </div>

        <div className="flex flex-col gap-[14px] z-10 md:justify-center md:items-center md:flex-row md:gap-0  w-full md:bg-background md:rounded-full md:min-w-[200px] md:max-w-[24rem] ">
          <input
            type="text"
            placeholder="Email Address"
            className="py-4 rounded-full px-4 bg-background"
          />
          <button className="bg-dark text-light uppercase rounded-full py-4 md:py-2 md:px-6">
            subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
