import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import Recipe from "../components/Recipe";
import { URL } from "../constants/constants";
import SkeletonLoader from "../components/SkeletonLoader";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${URL}/api/v1/recipes/allrecipes`);
        const filteredResults = res.data.filter((recipe) =>
          recipe.name.toLowerCase().includes(name.toLowerCase())
        );
        setSearchResults(filteredResults);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch recipes", error);
      }
    };

    if (name) {
      fetchRecipes();
    }
  }, [name]);

  return (
    <div>
      <Header />
      <section className="container mx-auto mb-10">
        <div className="mx-4 flex flex-col justify-center gap-[40px] ">
          <h1 className=" font-[800] text-[24px] uppercase">
            Search Results: {name}
          </h1>
          {loading ? (
            <div className="flex flex-col md:flex-row gap-20 md:my-20">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : searchResults.length === 0 ? (
            // Show "No Recipes Available" when no data is fetched
            <div className="text-center text-xl flex justify-center items-center h-96 font-semibold text-gray-600">
              No recipes found.
            </div>
          ) : (
            // Show recipes if available
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((recipe) => (
                <Recipe recipe={recipe} key={recipe._id} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SearchPage;
