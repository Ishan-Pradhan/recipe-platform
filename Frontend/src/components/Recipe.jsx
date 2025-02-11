import React, { useEffect, useState } from "react";
import VeganStamp from "./VeganStamp";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scrollToTop";
import SkeletonLoader from "./SkeletonLoader";

const Recipe = ({ recipe }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (recipe) {
      setLoading(false);
    }
  }, [recipe]);

  return (
    <>
      <div className="flex flex-col md:w-full h-full" key={recipe._id}>
        <img
          src={recipe.image}
          className="object-cover h-full  md:h-64 w-full rounded-t-[16px]"
          alt=""
        />
        <div className="flex flex-col justify-between gap-[40px] bg-light p-[24px] rounded-b-[16px] relative h-full">
          <div className="flex flex-col justify-between  gap-[12px] h-full">
            <h3 className="text-[21px]  2xl:text-[21px] leading-[25.2px] tracking-[-1%] uppercase font-bold ">
              {recipe.name}
            </h3>
            <p className="font-[300] text-[14px] leading-[19.6px] text-dark text-opacity-90 tracking-[-1%] line-clamp-3">
              {recipe.smallIntro}
            </p>
          </div>
          <div className="flex flex-col gap-[16px] md:flex-row md:justify-between md:items-center">
            <span className="uppercase font-[500] md:text-[10px] 2xl:text-[12px] leading-[14.4px] tracking-[-1%] ">
              {recipe.prepTime} - {recipe.prepLevel} PREP - {recipe.serves}{" "}
              serves
            </span>
            {/* <Button
            color="background"
            border="true"
            cases="uppercase"
            content="view recipe"
          /> */}

            <Link
              to={`/recipe/${recipe._id}`}
              onClick={scrollToTop}
              className="relative bg-none border px-6 py-3 md:text-[10px] 2xl:text-[16px] rounded-full transition-all duration-100 ease-in-out uppercase font-semibold text-center hover:bg-primaryRed hover:text-light"
            >
              view recipe
            </Link>
          </div>
          <div className="absolute -top-10 right-10">
            {recipe.vegan ? <VeganStamp /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;
