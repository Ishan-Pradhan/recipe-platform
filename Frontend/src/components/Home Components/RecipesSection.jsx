import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Recipe from "../Recipe";
import axios from "axios";
import { URL } from "../../constants/constants";

const RecipesSection = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState("All");

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
      } catch (error) {
        console.error("Failed to fetch recipes", error);
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
    <section
      className="container mb-10 mx-auto p-4"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-delay="200"
    >
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

      {filteredRecipes.length === 0 && (
        <h2 className="text-center h-48 flex justify-center items-center">
          no recipes yet.
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe) => (
          <Recipe key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default RecipesSection;
