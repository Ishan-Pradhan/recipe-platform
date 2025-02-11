import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      localStorage.removeItem("accessToken"); // ✅ Remove from localStorage
      localStorage.removeItem("refreshToken");
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateAccessToken: (state, action) => {
      if (state.currentUser?.data) {
        state.currentUser.data.accessToken = action.payload; // ✅ Correct path
      }
    },
    saveRecipe: (state, action) => {
      if (state.currentUser) {
        state.currentUser.data.user.savedRecipes.push(action.payload);
      }
    },
    deleteSavedRecipe: (state, action) => {
      if (state.currentUser) {
        state.currentUser.data.user.savedRecipes =
          state.currentUser.data.user.savedRecipes.filter(
            (recipeId) => recipeId !== action.payload
          );
      }
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logout,
  updateUserSuccess,
  updateAccessToken,
  saveRecipe,
  deleteSavedRecipe,
} = userSlice.actions;

export default userSlice.reducer;
