import React, { useState } from "react";
import ReactQuill from "react-quill";
import "../../index.css";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Quill from "quill";
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
  "align",
  "color",
  "background",
];

// Max file size in bytes (4.5 MB)
const MAX_FILE_SIZE_MB = 4.5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

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
  const [imageSize, setImageSize] = useState(null);
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);

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
    const file = e.target.files[0];

    if (file) {
      const fileSize = file.size;
      setImageSize(fileSize);

      // Check if file size exceeds the limit
      if (fileSize > MAX_FILE_SIZE_BYTES) {
        setIsFileTooLarge(true);
      } else {
        setIsFileTooLarge(false);
      }

      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        image: file,
      }));
    }
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

  const formatFileSize = (sizeInBytes) => {
    if (!sizeInBytes) return "";
    if (sizeInBytes < 1024) return `${sizeInBytes} bytes`;
    if (sizeInBytes < 1024 * 1024)
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
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
        className="md:w-2/3 mx-auto md:p-14 p-4 flex flex-col gap-8 rounded-[24px] border-dark border-opacity-40"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-10 justify-center md:items-center">
          <h2 className="uppercase text-xl font-semibold text-center md:text-left">
            Create Recipe
          </h2>

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
            />
            {imageSize && (
              <div className="text-sm text-gray-600 mt-2">
                File size: {formatFileSize(imageSize)}
              </div>
            )}
            {isFileTooLarge && (
              <div className="text-sm text-red-500 mt-2">
                File is too large. Maximum allowed size is 4.5 MB.
              </div>
            )}
          </div>

          {/* Other form fields (ingredients, instructions, etc.) */}

          <button
            type="submit"
            className="bg-primaryRed text-light p-3 rounded-[7px]"
            disabled={isFileTooLarge || isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Recipe"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateRecipeSection;
