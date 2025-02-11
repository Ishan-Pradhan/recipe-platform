import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Product from "../components/Home Components/Product";
import products from "../data/featured.json";
import Recipe from "../components/Recipe";
import axios from "axios";
import { URL } from "../constants/constants";
import SkeletonLoader from "../components/SkeletonLoader";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Vegan",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Quick Bite",
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${URL}/api/v1/recipes/allrecipes`);
        setRecipes(res.data);
        setFilteredRecipes(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredRecipes(recipes.slice(0, 6));
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) => recipe.category === filter).slice(0, 6)
      );
    }
  }, [filter, recipes]);

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  return (
    <>
      <Header />

      <section className="container mb-10 mx-auto p-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold uppercase">Our Recipes</h3>
          <p className="text-dark text-opacity-70 text-base text-center">
            With our diverse collection of recipes we have something to satisfy
            every palate.
          </p>
        </div>

        <div className="flex flex-wrap md:justify-center md:items-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-6 py-3 border rounded-full uppercase text-[14px] ${
                filter === category ? "bg-primaryGreen text-white" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* {filteredRecipes.length === 0 && (
          <h2 className="text-center h-60 flex justify-center items-center">
            No recipes yet.
          </h2>
        )} */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) =>
            loading ? (
              <div className="flex gap-40 my-20">
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </div>
            ) : (
              <Recipe key={recipe._id} recipe={recipe} />
            )
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Recipes;
