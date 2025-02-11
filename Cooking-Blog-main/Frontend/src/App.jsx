import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SingleRecipe from "./pages/SingleRecipe";
import CreateRecipePage from "./pages/admin/createRecipe";
import Recipes from "./pages/Recipes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/user/Profile";
import PrivateRoute from "./components/Routes/PrivateRoute";
import VerifyEmail from "./pages/VerifyEmail";
import RequestOtp from "./pages/RequestOTP";
import ResetPassword from "./components/resetPasword/ResetPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import Test from "./components/Test";
import UpdateRecipeSection from "./components/admin/UpdateRecipeSection";
import ManageRecipe from "./pages/admin/ManageRecipe";
import SavedRecipe from "./pages/user/SavedRecipe";
import SearchPage from "./pages/SearchPage";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Smooth animation speed
      once: true, // Prevents re-animation when scrolling back up
      offset: 200, // Animation starts when 200px into viewport
      easing: "ease-in-out",
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<SingleRecipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/savedrecipes" element={<SavedRecipe />} />
        </Route>
        <Route path="/test" element={<Test />} />
        <Route path="dashboard" element={<AdminRoute />}>
          <Route path="admin/createrecipe" element={<CreateRecipePage />} />
          <Route path="admin/managerecipe" element={<ManageRecipe />} />
          <Route
            path="admin/updaterecipe/:id"
            element={<UpdateRecipeSection />}
          />
        </Route>

        <Route path="/verify-email/:email" element={<VerifyEmail />} />
        <Route path="/request-password-change" element={<RequestOtp />} />
        <Route path="/reset-password/" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
