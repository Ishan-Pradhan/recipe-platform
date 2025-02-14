import React from "react";
import Button from "../Button";

const HeroSection = () => {
  return (
    <section className=" container mx-auto mb-10">
      <div
        style={{
          backgroundImage:
            'linear-gradient(to bottom,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url("images/hero.png")',
        }}
        className="mx-4   bg-cover rounded-[24px] md:rounded-[42px] h-[80vh] md:h-[80vh] flex flex-col justify-center items-center gap-[40px] font-[800px] px-2"
      >
        <div className="flex flex-col justify-center items-center gap-[10px] md:w-2/3  text-center">
          <h1
            className="text-[38px] leading-[38px]  md:text-[74px] md:leading-[80px] text-light text-center font-bold uppercase"
            data-aos="fade-up"
          >
            Unleash Culinary Excellence
          </h1>
          <p
            className="text-center text-light text-[16px] leading-[22.4px] md:leading-[29.4px] md:w-[48%]"
            data-aos="fade-up"
          >
            Explore a world of flavors, discover handcrafted recipes, and let
            the aroma of our passion for cooking fill your kitchen
          </p>
        </div>
        {/* <button className="bg-primaryOrange px-6 py-3 rounded-full uppercase font-semibold">
          Explore Recipies
        </button> */}
        <Button
          dataAos="fade-up"
          color="primaryOrange"
          cases="uppercase"
          content="explore recipes"
          link="/recipes"
        />
      </div>
    </section>
  );
};

export default HeroSection;
