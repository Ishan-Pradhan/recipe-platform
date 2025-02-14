import React, { useEffect, useState } from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import Recipe from "../../components/Recipe";
import api from "../../utils/api";

const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await api.get(
          `/recipes/savedrecipes/${currentUser.data.user._id}`
        ); // ✅ No need to pass headers
        setSavedRecipes(res.data.savedRecipes);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch saved recipes", error);
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchSavedRecipes();
    }
  }, [currentUser]);

  return (
    <>
      <Header />
      <section className="container mx-auto mb-10">
        <div className="mx-4 flex flex-col justify-center gap-[40px] ">
          <h1 className="text-center font-[800] text-[24px] uppercase">
            Saved Recipes
          </h1>

          {loading ? (
            <div className="flex flex-col md:flex-row gap-20 md:my-20">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : savedRecipes.length === 0 ? (
            <div className="h-48 flex justify-center items-center">
              <h3>You have not saved any Recipes yet.</h3>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {savedRecipes.map((recipe) => (
                <Recipe key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SavedRecipe;
