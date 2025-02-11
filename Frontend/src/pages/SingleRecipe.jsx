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

  return (
    <>
      <Header />
      {loading ? (
        <div className="flex justify-center items-center h-44">
          <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
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
