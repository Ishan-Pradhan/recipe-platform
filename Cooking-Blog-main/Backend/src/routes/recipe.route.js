import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { isAdmin, verifyJWT } from "./../middlewares/auth.middleware.js";

import {
  addComment,
  adminDeleteComment,
  createRecipe,
  deleteComment,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  getSavedRecipes,
  getSavedStatus,
  saveRecipe,
  unsaveRecipe,
  updateComment,
  updateRecipe,
} from "../controllers/recipe.controller.js";

const router = Router();

router
  .route("/createrecipe")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createRecipe);

router
  .route("/updaterecipe/:id")
  .put(upload.fields([{ name: "image", maxCount: 1 }]), updateRecipe);

router.route("/deleterecipe/:id").delete(verifyJWT, deleteRecipe);
router.route("/saverecipe/:recipeId").post(verifyJWT, saveRecipe);
router.route("/unsaverecipe/:recipeId").delete(verifyJWT, unsaveRecipe);
router.route("/comment/:id").post(verifyJWT, addComment);
router.route("/savedrecipes/:userId").get(verifyJWT, getSavedRecipes);

router.route("/comment/:recipeId/:commentId").put(verifyJWT, updateComment);
router
  .route("/deletecomment/:recipeId/:commentId")
  .delete(verifyJWT, deleteComment);
router
  .route("/admin/comment/:recipeId/:commentId")
  .delete(verifyJWT, isAdmin, adminDeleteComment);
router.route("/savedstatus/:userId/:recipeId").get(verifyJWT, getSavedStatus);

router.route("/allrecipes").get(getAllRecipes);
router.route("/recipe/:id").get(getRecipeById);

export default router;
