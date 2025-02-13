import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import SingleRecipeSection from "../components/singleRecipe components/SingleRecipeSection";
import { useParams } from "react-router-dom";
import FeaturedSection from "./../components/Home Components/FeaturedSection";
import SubscribeSection from "../components/Home Components/SubscribeSection";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../constants/constants";
const SingleRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${URL}/api/v1/recipes/recipe/${id}`);
        setRecipe(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const RecipeSkeleton = () => {
    return (
      <section className="container mx-auto mb-10 animate-pulse">
        <div className="mx-4 flex flex-col items-center gap-[40px] border border-dark border-opacity-20 rounded-[24px] py-4 px-4 md:gap-[40px] md:rounded-[32px]">
          <div className="flex flex-col items-center gap-[12px] w-full">
            <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
            <div className="w-2/3 h-10 bg-gray-300 rounded"></div>
            <div className="w-2/3 h-6 bg-gray-300 rounded"></div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 w-full">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="w-24 h-6 bg-gray-300 rounded"></div>
            ))}
          </div>

          <div className="w-full h-[300px] md:h-[700px] bg-gray-300 rounded-[16px]"></div>

          <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-[56px] w-full">
            <div className="flex flex-col gap-4 w-full md:gap-[40px]">
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full h-24 bg-gray-300 rounded"></div>
              </div>

              <div className="flex gap-[58px] self-start p-4 border-2 border-gray-300 rounded-[24px]"></div>

              <div className="flex flex-col gap-4 md:flex-row border-b border-gray-300 pb-10">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-gray-300 rounded-[12px]"></div>
                <div className="flex flex-col gap-4 md:gap-7 w-full">
                  <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
                  <div className="w-full h-16 bg-gray-300 rounded"></div>
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                </div>
              </div>

              <div className="flex flex-col mt-8">
                <div className="w-40 h-8 bg-gray-300 rounded mb-4"></div>
                <div className="w-full h-24 bg-gray-300 rounded"></div>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:w-3/6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="px-6 py-4 rounded-[24px] bg-gray-300 h-24"
                ></div>
              ))}
              <div className="w-2/3 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Header />
      {loading ? (
        <RecipeSkeleton />
      ) : !recipe ? (
        <div className="flex justify-center items-center text-xl h-96">
          No recipes found.
        </div>
      ) : (
        <SingleRecipeSection recipe={recipe} />
      )}
      <FeaturedSection />
      <SubscribeSection />
      <Footer />
    </>
  );
};

export default SingleRecipe;
