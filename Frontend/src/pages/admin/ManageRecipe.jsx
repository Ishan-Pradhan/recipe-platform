import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import AdminRecipes from "../../components/admin/AdminRecipes";
import axios from "axios";
import Footer from "../../components/Footer";
import { URL } from "../../constants/constants";

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${URL}/api/v1/recipes/allrecipes`);
        console.log(res.data);
        setRecipes(res.data);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      }
    };

    fetchRecipes();
  }, []);
  return (
    <>
      <Header />
      <section className="container mx-auto mb-10">
        <div className="mx-4 flex flex-col justify-center gap-[40px] mt-10">
          <h1 className="text-center font-[800] text-[24px] uppercase">
            Manage Recipes
          </h1>
          <div className="grid md:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <AdminRecipes recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ManageRecipe;
