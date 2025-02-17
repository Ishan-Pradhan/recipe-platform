import { uploadOnCloudinary } from "../middlewares/multer.middleware.js";
import { Recipe } from "../models/recipe.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { User } from "./../models/user.model.js";

// Create Recipe Controller
const createRecipe = async (req, res) => {
  try {
    const {
      name,
      smallIntro,
      prepTime,
      prepLevel,
      serves,
      ingredients,
      equipments,
      nutrients,
      instructions,
      featured,
      vegan,
      category,
    } = req.body;

    // Ensure an image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Recipe image is required" });
    }

    // Upload image to Cloudinary
    const foodImg = await uploadOnCloudinary(req.file.buffer, `${name}-image`);

    if (!foodImg || !foodImg.url) {
      return res.status(500).json({ message: "Failed to upload image" });
    }

    // Save recipe to database
    const newRecipe = new Recipe({
      name,
      smallIntro,
      prepTime,
      prepLevel,
      serves,
      ingredients: JSON.parse(ingredients),
      equipments: JSON.parse(equipments),
      nutrients: JSON.parse(nutrients),
      instructions,
      image: foodImg.url, // Store Cloudinary image URL
      featured,
      vegan,
      category,
    });

    await newRecipe.save();
    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//update recipe
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      smallIntro,
      prepTime,
      prepLevel,
      serves,
      ingredients,
      equipments,
      nutrients,
      instructions,
      featured,
      vegan,
      category,
    } = req.body;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    // If an image is provided, upload to Cloudinary
    if (req.file) {
      const foodImgBuffer = req.file.buffer; // Get file buffer from Multer
      const foodImg = await uploadOnCloudinary(foodImgBuffer, `${name}-image`);
      if (foodImg) {
        recipe.image = foodImg.url;
      }
    }

    // Update fields if provided, otherwise keep old values
    recipe.name = name || recipe.name;
    recipe.smallIntro = smallIntro || recipe.smallIntro;
    recipe.prepTime = prepTime || recipe.prepTime;
    recipe.prepLevel = prepLevel || recipe.prepLevel;
    recipe.serves = serves || recipe.serves;
    recipe.ingredients = ingredients
      ? JSON.parse(ingredients)
      : recipe.ingredients;
    recipe.equipments = equipments ? JSON.parse(equipments) : recipe.equipments;
    recipe.nutrients = nutrients ? JSON.parse(nutrients) : recipe.nutrients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.featured = featured !== undefined ? featured : recipe.featured;
    recipe.vegan = vegan !== undefined ? vegan : recipe.vegan;
    recipe.category = category || recipe.category;

    await recipe.save();
    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting Recipe",
      error,
    });
  }
};

const saveRecipe = asyncHandler(async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    if (user.savedRecipes.includes(recipeId)) {
      return res.status(400).send({ message: "Recipe already saved" });
    }

    user.savedRecipes.push(recipeId);
    await user.save();

    res.status(200).json({ message: "Recipe saved successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

const unsaveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.savedRecipes = user.savedRecipes.filter(
      (id) => id.toString() !== recipeId
    );
    await user.save();

    res.status(200).json({ message: "Recipe unsaved successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addComment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, text } = req.body;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const comment = {
      user: userId,
      text,
      username: user.username,
      date: new Date(),
    };

    recipe.comments.push(comment);
    await recipe.save();

    res.status(200).json({ message: "Comment added successfully", comment });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

const updateComment = asyncHandler(async (req, res) => {
  try {
    const { recipeId, commentId } = req.params;
    const { userId, text } = req.body;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    const comment = recipe.comments.id(commentId);
    if (!comment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .send({ message: "User not authorized to update this comment" });
    }

    comment.text = text;
    await recipe.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  try {
    console.log("delete recipe");
    const { recipeId, commentId } = req.params;
    const { userId } = req.body;

    console.log(userId);

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    const comment = recipe.comments.id(commentId);
    if (!comment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .send({ message: "User not authorized to delete this comment" });
    }

    recipe.comments.pull(commentId);
    await recipe.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

const adminDeleteComment = asyncHandler(async (req, res) => {
  try {
    const { recipeId, commentId } = req.params;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    const comment = recipe.comments.id(commentId);
    if (!comment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    recipe.comments.pull(commentId);
    await recipe.save();

    res.status(200).json({ message: "Comment deleted successfully by admin" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (error) {
    console.log("Error fetching products:", error);
    res.status(500).send({ message: error }, error);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).send({ message: "recipe not found" });
    }

    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const getSavedRecipes = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("savedRecipes");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// API endpoint to check if a recipe is saved by the user in singleRecipe page
const getSavedStatus = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = user.savedRecipes.includes(recipeId);
    console.log("is recipe saved", isSaved);
    res.status(200).json({ isSaved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  saveRecipe,
  addComment,
  updateComment,
  deleteComment,
  adminDeleteComment,
  unsaveRecipe,
  getSavedRecipes,
  getSavedStatus,
};
