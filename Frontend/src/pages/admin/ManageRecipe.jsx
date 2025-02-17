import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import AdminRecipes from "../../components/admin/AdminRecipes";
import axios from "axios";
import Footer from "../../components/Footer";
import { URL } from "../../constants/constants";
import SkeletonLoader from "../../components/SkeletonLoader";
import { useNavigate } from "react-router-dom";

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/dashboard/admin/adminsearch?name=${encodeURIComponent(searchInput)}`
    );
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${URL}/api/v1/recipes/allrecipes`);
        setRecipes(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch recipes", error);
      }
    };

    fetchRecipes();
  }, [recipes]);
  return (
    <>
      <Header />
      <section className="container mx-auto mb-10">
        <div className="mx-4 flex flex-col justify-center gap-[40px] mt-10">
          <div className="flex justify-between items-center">
            <h1 className="text-center font-[800] text-[24px] uppercase">
              Manage Recipes
            </h1>
            <form
              action=""
              className="flex items-center gap-6 justify-center"
              onSubmit={handleSearch}
            >
              <label htmlFor="search" className="uppercase text-gray-500">
                Search Recipes
              </label>
              <input
                id="search"
                type="search"
                className="px-4 border border-dark border-opacity-25 rounded-full md:rounded-sm bg-light focus:none h-10 md:h-auto w-full md:w-auto"
                value={searchInput}
                placeholder="chicken"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          </div>
          {loading ? (
            <div className="flex flex-col md:flex-row gap-20">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <AdminRecipes recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ManageRecipe;
