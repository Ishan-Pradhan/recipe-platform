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
import { Analytics } from "@vercel/analytics/react";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AdminSearch from "./pages/AdminSearch";

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
        <Analytics />
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
          <Route path="admin/adminsearch" element={<AdminSearch />} />
        </Route>

        <Route path="/verify-email/:email" element={<VerifyEmail />} />
        <Route path="/request-password-change" element={<RequestOtp />} />
        <Route path="/reset-password/" element={<ResetPassword />} />
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          position: "bottom-center",

          success: { duration: 3000 },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "800px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
