import axios from "axios";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("/api/v1/recipes/allrecipes");
        setRecipes(res.data);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <ul className="list-inside">
            <li className="list-disc">{recipe.serves}</li>
          </ul>
          <h2 className="list-inside">
            {recipe.name} {console.log(recipe.instructions)}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        </div>
      ))}
    </div>
  );
};

export default Test;
