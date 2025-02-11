import React from "react";
import Header from "../../components/Header";
import CreateRecipeSection from "../../components/admin/createRecipeSection";
import Footer from "../../components/Footer";

const createRecipe = () => {
  return (
    <>
      <Header />
      <CreateRecipeSection />
      <Footer />
    </>
  );
};

export default createRecipe;
