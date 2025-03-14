import React, { useState } from "react";
import ReactQuill from "react-quill";
import "../../index.css";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Quill from "quill";
URL;
import toast from "react-hot-toast";
import { URL } from "../../constants/constants";

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
    [{ color: ["#EE6352", "#9FDC26", "#C4E5FC", "#F29C33", "#000"] }],
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
  "video",
  "align",
  "color",
  "background",
];

const CreateRecipeSection = () => {
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
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Vegan",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Quick Bite",
  ];

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
      image: e.target.files[0], // This is the file selected by the user
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
    e.preventDefault();
    setIsLoading(true);
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
      const res = await axios.post(
        `${URL}/api/v1/recipes/createrecipe`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Recipe created successfully");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create recipe");
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto mb-10">
      <form
        className="md:w-2/3 mx-auto md:p-14 p-4  flex flex-col  gap-8  rounded-[24px] border-dark border-opacity-40"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-10 justify-center md:items-center">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="uppercase text-xl font-semibold text-center">
              Create Recipe
            </h2>
            <span className="text-sm text-primaryRed">
              <i className="fa-solid fa-circle-info"></i> The whole file must be
              under 4 mb.
            </span>
          </div>

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
          <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:bg-[#fff] p-2 md:px-4 rounded-[7px]">
            <label className="uppercase font-semibold text-dark ">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageUpload}
              required
              className=""
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
              scrollingContainer="html"
              className="quill-editor"
            />
          </div>

          <div className="flex w-full">
            <div className="flex  gap-2 w-full">
              <label
                htmlFor="featured"
                className="uppercase font-semibold text-dark "
              >
                Featured
              </label>
              <input
                id="featured"
                type="checkbox"
                name="featured"
                checked={recipe.featured}
                onChange={handleChange}
                className="rounded-[7px] p-4"
              />
            </div>

            <div className="flex gap-2 w-full">
              <label
                htmlFor="vegan"
                className="uppercase font-semibold text-dark "
              >
                Vegan
              </label>
              <input
                id="vegan"
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
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Recipe"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateRecipeSection;
