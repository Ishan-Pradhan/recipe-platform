import React, { useEffect, useRef, useState } from "react";
// import FeatureProduct from "./Product";
import Recipe from "../Recipe";
// import featuredProducts from "../../data/featured";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import { URL } from "../../constants/constants";
import SkeletonLoader from "./../SkeletonLoader";

const FeaturedSection = () => {
  const splideRef = useRef(null);

  const goToPrev = () => {
    if (splideRef.current) {
      splideRef.current.go("<");
    }
  };

  const goToNext = () => {
    if (splideRef.current) {
      splideRef.current.go(">");
    }
  };
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${URL}/api/v1/recipes/allrecipes`);
        console.log("api response :", res.data);
        setRecipes(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <section className="container mx-auto mb-10" data-aos="fade-up">
      <div className="mx-4 flex flex-col gap-[40px] border border-dark border-opacity-20 rounded-[24px] py-8 px-4 md:gap-4 md:rounded-[32px]">
        <div className="flex flex-col gap-[24px] md:flex-row md:justify-between">
          <h3 className="uppercase text-2xl font-bold">featured recipes</h3>
          <div className="flex gap-4">
            <div
              className="border border-dark h-10 w-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-primaryRed hover:text-light transition-all duration-300 ease-in-out"
              onClick={goToPrev}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div
              className="border border-dark h-10 w-10 flex justify-center items-center rounded-full cursor-pointer  hover:bg-primaryRed hover:text-light transition-all duration-300 ease-in-out"
              onClick={goToNext}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>

        <Splide
          ref={splideRef}
          options={{
            arrows: false,
            perPage: 2,
            pagination: false,
            gap: "16px",
            breakpoints: {
              769: {
                perPage: 1,
              },
            },
          }}
          className="flex flex-col md:flex-row md:w-full justify-between gap-[16px]"
        >
          {loading ? (
            [...Array(2)].map((_, i) => (
              <SplideSlide key={i} className="flex flex-col">
                <SkeletonLoader />
              </SplideSlide>
            ))
          ) : recipes.length === 0 ? (
            // Show "No Recipes Available" when no data is fetched
            <div className="text-center text-xl flex justify-center items-center h-96 font-semibold text-gray-600">
              No recipes available yet.
            </div>
          ) : (
            recipes.map(
              (recipe) =>
                recipe.featured && (
                  <SplideSlide key={recipe._id} className="flex flex-col">
                    <Recipe recipe={recipe} />
                  </SplideSlide>
                )
            )
          )}
        </Splide>
      </div>
    </section>
  );
};

export default FeaturedSection;
