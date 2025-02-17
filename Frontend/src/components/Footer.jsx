import React from "react";
import { Link } from "react-router";
import { scrollToTop } from "../utils/scrollToTop";

const Footer = () => {
  return (
    <footer className="container mx-auto mb-4">
      <div className="mx-4  bg-dark text-[#F0EBE1] px-4 py-[24px] md:px-[40px] rounded-[24px]">
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center gap-[24px] py-6 md:border-b">
          <div className="w-32">
            <img src="/logo/lightlogo.svg" className="h-full w-full" alt="" />
          </div>
          <ul className="flex flex-col w-full md:w-auto gap-[10px] md:gap-0   md:flex-row  md:justify-between md:items-center md:font-medium uppercase">
            <Link
              to="/"
              onClick={scrollToTop}
              className="border-b border-light border-opacity-55 md:border-opacity-20 md:border-b-0 md:border-r   uppercase py-4 md:p-0 md:px-4 md:py-0"
            >
              Home
            </Link>
            <Link
              onClick={scrollToTop}
              to="/recipes"
              className="border-b border-light border-opacity-55 md:border-opacity-20 md:border-b-0 md:border-r uppercase py-4 md:p-0 md:px-4 md:py-0"
            >
              recipes
            </Link>

            <Link
              onClick={scrollToTop}
              to="/aboutus"
              className=" uppercase py-4 md:px-4 md:py-0"
            >
              about us
            </Link>
          </ul>

          <div className="flex justify-center items-center gap-4 border-b border-light border-opacity-55 md:border-opacity-20 md:border-none pb-4 md:p-0  w-full md:w-auto">
            <i className="fa-brands fa-tiktok  text-[18px]"></i>
            <i className="fa-brands fa-facebook  text-[18px]"></i>
            <i className="fa-brands fa-instagram  text-[18px]"></i>
            <i className="fa-brands fa-youtube  text-[18px]"></i>
          </div>
        </div>
        <p className="uppercase text-[#F0EBE199] text-opacity-60 text-[12px] py-4  text-center">
          copyright: &copy; 2024 cooks delight.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
