import React from "react";
import Button from "./../Button";

const SiteDescription = () => {
  return (
    <section data-aos="fade-up" className="container mx-auto mb-20">
      <div className="flex flex-col items-start gap-[16px] mb-20 mx-4  md:flex-row md:items-end md:justify-between ">
        <h2 className="uppercase text-[38px] leading-9 mt-20  font-[800] md:text-[80px] md:leading-[80px] md:w-1/2 ">
          welcome to <br />
          my culinary <br />
          heaven!
        </h2>
        <div className="flex flex-col md:justify-center md:items-center md:w-1/2 md:h-full">
          <div className="flex flex-col items-start gap-[40px]">
            <p className="leading-[22.4px] text-dark text-opacity-60 md:leading-[29.4px] md:text-[21px] font-roboto">
              Bonjour and welcome to the heart of my kitchen! I'm Isabella
              Russo, the culinary enthusiast behind this haven of flavors, Cooks
              Delight. Join me on a gastronomic journey where each dish carries
              a story, and every recipe is a crafted symphony of taste.
            </p>
            <Button
              color="primaryOrange"
              cases="uppercase"
              content="explore recipes"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteDescription;
