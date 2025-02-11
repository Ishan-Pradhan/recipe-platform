import React from "react";
import Button from "../Button";
import VeganStamp from "../VeganStamp";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="flex flex-col md:w-full" key={product.id}>
      <img
        src={product.image}
        className="object-cover h-full  md:h-64 w-full rounded-t-[16px]"
        alt=""
      />
      <div className="flex flex-col gap-[40px] bg-light p-[24px] rounded-b-[16px] relative">
        <div className="flex flex-col gap-[12px] ">
          <h3 className="text-[21px]  2xl:text-[21px] leading-[25.2px] tracking-[-1%] uppercase font-bold">
            {product.name}
          </h3>
          <p className="font-[300] text-[14px] leading-[19.6px] text-dark text-opacity-80 tracking-[-1%]">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col gap-[16px] md:flex-row md:justify-between md:items-center">
          <span className="uppercase font-[500] md:text-[10px] 2xl:text-[12px] leading-[14.4px] tracking-[-1%] ">
            {product.prepInfo}
          </span>
          {/* <Button
            color="background"
            border="true"
            cases="uppercase"
            content="view recipe"
          /> */}

          <Link
            to={`/recipe/${product.id}`}
            className="bg-none border px-6 py-3 md:text-[10px] 2xl:text-[16px] rounded-full uppercase font-semibold"
          >
            view recipe
          </Link>
        </div>
        <div className="absolute -top-10 right-10">
          {product.vegan ? <VeganStamp /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Product;
