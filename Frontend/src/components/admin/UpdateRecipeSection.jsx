import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // For rich text editor
import "../../index.css"; // Import css file
import "react-quill/dist/quill.snow.css"; // Import React Quill styles
import axios from "axios";
import Quill from "quill";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { URL } from "../../constants/constants";
import toast from "react-hot-toast";

const UpdateRecipeSection = () => {
  const FontAttributor = Quill.import("attributors/class/font");
  FontAttributor.whitelist = ["roboto", "Montserrat"];
  Quill.register(FontAttributor, true);

  const fontSizeArr = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "38px",
    "40px",
  ];
  var Size = Quill.import("attributors/style/size");
  Size.whitelist = fontSizeArr;
  Quill.register(Size, true);

  const modules = {
    toolbar: [
      [{ font: FontAttributor.whitelist }],
      [{ size: Size.whitelist }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: ["#EE6352", "#9FDC26", "#C4E5FC", "#F29C33", "#000000"] }],
      [
        {
          background: [
            "red",
            "green",
            "blue",
            "yellow",
            "orange",
            "purple",
            "pink",
            "brown",
            "gray",
          ],
        },
      ],
      ["link", "image", "video"],
      [{ align: [] }],

      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState({
    name: "",
    smallIntro: "",
    prepTime: "",
    prepLevel: "",
    serves: "",
    ingredients: [""],
    equipments: [""],
    nutrients: [{ name: "", value: "" }],
    instructions: "",
    image: null,
    featured: false,
    vegan: false,
    category: "",
  });

  const categories = [
    "Vegan",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Quick Bite",
  ];

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${URL}/api/v1/recipes/recipe/${id}`);
        const recipes = res.data;

        if (recipes) {
          setRecipe({
            name: recipes.name || "",
            smallIntro: recipes.smallIntro || "",
            prepTime: recipes.prepTime || "",
            prepLevel: recipes.prepLevel || "",
            serves: recipes.serves || "",
            ingredients: recipes.ingredients || "",
            equipments: recipes.equipments || "",
            nutrients: recipes.nutrients || [{ name: "", value: "" }],
            instructions: recipes.instructions || "",
            image: null,
            featured: recipes.featured || false,
            vegan: recipes.vegan || false,
            category: recipes.category || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e, field) => {
    const { value, dataset } = e.target;
    const index = dataset.index;
    const updatedArray = [...recipe[field]];
    updatedArray[index] = value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [field]: updatedArray,
    }));
  };

  const handleAddField = (field) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [field]: [...prevRecipe[field], ""],
    }));
  };

  const handleEditorChange = (value) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: value,
    }));
  };

  const handleImageUpload = (e) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      image: e.target.files[0],
    }));
  };

  const handleAddNutrient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      nutrients: [...prevRecipe.nutrients, { name: "", value: "" }],
    }));
  };

  const handleNutrientChange = (e, index) => {
    const { name, value } = e.target;
    const updatedNutrients = [...recipe.nutrients];
    updatedNutrients[index][name] = value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      nutrients: updatedNutrients,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const filteredIngredients = recipe.ingredients.filter(
      (ingredient) => ingredient.trim() !== ""
    );
    const filteredEquipments = recipe.equipments.filter(
      (equipment) => equipment.trim() !== ""
    );
    const filteredNutrients = recipe.nutrients.filter(
      (nutrient) => nutrient.name.trim() !== "" && nutrient.value.trim() !== ""
    );
    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("smallIntro", recipe.smallIntro);
    formData.append("prepTime", recipe.prepTime);
    formData.append("prepLevel", recipe.prepLevel);
    formData.append("serves", recipe.serves);
    formData.append("ingredients", JSON.stringify(filteredIngredients));
    formData.append("equipments", JSON.stringify(filteredEquipments));
    formData.append("nutrients", JSON.stringify(filteredNutrients));
    formData.append("instructions", recipe.instructions);
    formData.append("featured", recipe.featured);
    formData.append("vegan", recipe.vegan);
    formData.append("category", recipe.category);
    if (recipe.image) {
      formData.append("image", recipe.image);
    }

    try {
      const res = await axios.put(
        `${URL}/api/v1/recipes/updaterecipe/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Recipe updated successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update recipe");
    }
  };

  return (
    <>
      <Header />
      <section className="container mx-auto mb-10">
        <form
          className="md:w-2/3 mx-auto md:p-14 p-4  flex flex-col  gap-8  rounded-[24px] border-dark border-opacity-40"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-10 justify-center md:items-center">
            <h2 className="uppercase text-xl font-semibold">Update Recipe</h2>

            <div className="flex flex-col gap-2 w-full">
              <label className="uppercase font-semibold text-dark ">
                Recipe Name
              </label>
              <input
                type="text"
                name="name"
                value={recipe.name}
                onChange={handleChange}
                placeholder="Enter recipe name"
                required
                className="rounded-[7px] p-4 "
              />
            </div>

            {recipe.image && <img src={recipe.image} />}
            <div className="flex flex-col md:flex-row md:items-center gap-2 w-full bg-[#fff] p-2 px-4 rounded-[7px]">
              <label className="uppercase font-semibold text-dark ">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="uppercase font-semibold text-dark ">
                Small Intro
              </label>
              <textarea
                name="smallIntro"
                value={recipe.smallIntro}
                onChange={handleChange}
                placeholder="Enter small intro"
                required
                className="rounded-[7px] p-4"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6  justify-between md:w-full">
              {" "}
              <div className="flex flex-col gap-2 w-full">
                <label className="uppercase font-semibold text-dark ">
                  Prep Time
                </label>
                <input
                  type="text"
                  name="prepTime"
                  value={recipe.prepTime}
                  onChange={handleChange}
                  placeholder="Prep Time"
                  className="rounded-[7px] p-4"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="uppercase font-semibold text-dark ">
                  Prep Level
                </label>
                <input
                  type="text"
                  name="prepLevel"
                  value={recipe.prepLevel}
                  onChange={handleChange}
                  placeholder="Prep Level"
                  className="rounded-[7px] p-4"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="uppercase font-semibold text-dark ">
                  Serves
                </label>
                <input
                  type="text"
                  name="serves"
                  value={recipe.serves}
                  onChange={handleChange}
                  placeholder="Serves"
                  className="rounded-[7px] p-4"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full">
              <div className="flex flex-col gap-2 justify-between ">
                <label className="uppercase font-semibold text-dark ">
                  Ingredients
                </label>
                {recipe.ingredients.map((ingredient, index) => (
                  <div className="flex gap-6" key={index}>
                    <input
                      type="text"
                      value={ingredient}
                      data-index={index}
                      onChange={(e) => handleArrayChange(e, "ingredients")}
                      placeholder={`Ingredient ${index + 1}`}
                      className="rounded-[7px] p-4"
                    />
                    {index === recipe.ingredients.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleAddField("ingredients")}
                        className="add-field-button text-primaryRed"
                      >
                        Add More
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 ">
                <label className="uppercase font-semibold text-dark ">
                  Equipment Needed
                </label>
                {recipe.equipments.map((equipment, index) => (
                  <div key={index} className="flex gap-6 input-group">
                    <input
                      type="text"
                      value={equipment}
                      data-index={index}
                      onChange={(e) => handleArrayChange(e, "equipments")}
                      placeholder={`Equipment ${index + 1}`}
                      className="rounded-[7px] p-4"
                    />
                    {index === recipe.equipments.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleAddField("equipments")}
                        className="add-field-button text-primaryRed "
                      >
                        Add More
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="uppercase font-semibold text-dark ">
                Nutritional Information
              </label>
              {recipe.nutrients.map((nutrient, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-2 mb-4 md:mb-0 w-full"
                >
                  <input
                    type="text"
                    name="name"
                    value={nutrient.name}
                    onChange={(e) => handleNutrientChange(e, index)}
                    placeholder="Nutrient Name"
                    className="rounded-[7px] p-4"
                  />
                  <input
                    type="text"
                    name="value"
                    value={nutrient.value}
                    onChange={(e) => handleNutrientChange(e, index)}
                    placeholder="Nutrient Value with unit"
                    className="rounded-[7px] p-4"
                  />
                  {index === recipe.nutrients.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddNutrient}
                      className="add-field-button text-primaryRed"
                    >
                      Add Nutrient
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="uppercase font-semibold text-dark ">
                Category
              </label>
              <select
                name="category"
                value={recipe.category}
                onChange={handleChange}
                required
                className="rounded-[7px] p-4"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="uppercase font-semibold text-dark ">
                Instructions
              </label>
              <ReactQuill
                value={recipe.instructions}
                onChange={handleEditorChange}
                modules={modules}
                formats={formats}
                className="quill-editor"
              />
            </div>

            <div className="flex  w-full ">
              <div className="flex  gap-2 w-full">
                <label className="uppercase font-semibold text-dark ">
                  Featured
                </label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={recipe.featured}
                  onChange={handleChange}
                  className="rounded-[7px] p-4"
                />
              </div>

              <div className="flex  gap-2 w-full">
                <label className="uppercase font-semibold text-dark ">
                  Vegan
                </label>
                <input
                  type="checkbox"
                  name="vegan"
                  checked={recipe.vegan}
                  onChange={handleChange}
                  className="rounded-[7px] p-4"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button
                type="submit"
                className="bg-primaryRed text-light p-3 rounded-[7px]"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Recipe"}
              </button>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default UpdateRecipeSection;
