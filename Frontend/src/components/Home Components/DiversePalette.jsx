import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";

const DiversePalette = () => {
  return (
    <section className="container mx-auto mb-10 " data-aos="fade-up">
      <div className="flex flex-col gap-[64px]  mx-4  bg-primaryBlue rounded-[24px] py-[40px] px-[24px] md:flex-row md:gap-[230px] md:rounded-[32px]">
        <div className="flex flex-col justify-start items-start gap-[40px] md:justify-end md:w-1/2">
          <div className="flex flex-col justify-start items-start gap-[8px] md:gap-[16px]">
            <span className="uppercase py-1 px-3 rounded-full bg-primaryRed text-light font-semibold">
              explore
            </span>
            <h2 className="uppercase leading-[26px] text-[26px] font-[700] md:text-[40px] md:leading-[40px] ">
              our diverse <br /> palette
            </h2>
            <p className="text-[14px] leading-[19.6px] text-dark text-opacity-80 md:text-[16px] md:leading-[22.4px]">
              If you are a breakfast enthusiast, a connoisseur of savory
              delights, or on the lookout for irresistible desserts, our curated
              selection has something to satisfy every palate.
            </p>
          </div>
          <Link
            to="recipesection"
            smooth={true}
            className="bg-primaryBlue rounded-full uppercase font-semibold border-2 border-dark px-6 py-3 "
          >
            see more
          </Link>
        </div>
        <ul className="flex flex-col font-semibold gap-[16px] md:w-1/2">
          <li className="flex justify-between items-center border-b border-dark border-opacity-40 py-4">
            <img
              src="images/palette/palette1.svg
            "
              alt=""
            />
            <span className="text-dark uppercase">Breakfast</span>
          </li>
          <li className="flex justify-between items-center border-b border-dark border-opacity-40 py-4">
            <img
              src="images/palette/palette2.svg
            "
              alt=""
            />{" "}
            <span className="text-dark uppercase">lunch</span>
          </li>
          <li className="flex justify-between items-center border-b border-dark border-opacity-40 py-4">
            <img
              src="images/palette/palette3.svg
            "
              alt=""
            />{" "}
            <span className="text-dark uppercase">dinner</span>
          </li>
          <li className="flex justify-between items-center border-b border-dark border-opacity-40 py-4">
            <img
              src="images/palette/palette4.svg
            "
              alt=""
            />{" "}
            <span className="text-dark uppercase">dessert</span>
          </li>
          <li className="flex justify-between items-center border-b border-dark border-opacity-40 py-4">
            <img
              src="images/palette/palette5.svg
            "
              alt=""
            />{" "}
            <span className="text-dark uppercase">quick bite!</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DiversePalette;
