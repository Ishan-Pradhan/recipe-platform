import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Recipe from "../components/Recipe";
import axios from "axios";
import { URL } from "../constants/constants";
import SkeletonLoader from "../components/SkeletonLoader";
import { scrollToTop } from "../utils/scrollToTop";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);

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
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) => recipe.category === filter)
      );
    }
    // Reset to the first page whenever the filter is changed
    setCurrentPage(1);
  }, [filter, recipes]);

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // Change page
  const paginate = (pageNumber) => {
    scrollToTop();
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredRecipes.length / recipesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

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
              className={`px-6 py-3 border border-dark rounded-full uppercase text-[14px] ${
                filter === category ? "bg-primaryGreen text-dark" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col md:flex-row gap-20 md:my-20">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        ) : filteredRecipes.length === 0 ? (
          // Show "No Recipes Available" when no data is fetched
          <div className="text-center text-xl flex justify-center items-center h-96 font-semibold text-gray-600">
            No recipes available yet.
          </div>
        ) : (
          // Show recipes if available
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentRecipes.map((recipe) => (
              <Recipe key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <ul className="flex gap-4">
            {pageNumbers.map((number) => (
              <li className="list-none" key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-full border border-dark ${
                    currentPage === number
                      ? "bg-primaryGreen text-dark"
                      : "text-dark"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Recipes;
