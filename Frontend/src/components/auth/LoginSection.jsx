import React, { useEffect, useState } from "react";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../constants/constants";

const LoginSection = () => {
  const [formData, setFormData] = useState({});
  const { loading, error, currentUser } = useSelector((state) => state.user); //user is the name of the slice
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await axios.post(`${URL}/api/v1/users/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;
      console.log(res.data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      toast.success("Login successful");
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Something went wrong");

      dispatch(signInFailure(error?.response?.data?.message));
    }
  };

  return (
    <section className="container mx-auto mb-20 mt-20 ">
      <div className="mx-4 flex justify-center items-center  ">
        <div className="flex flex-col justify-center items gap-[40px]  border-dark border-opacity-20 rounded-[24px] md:w-1/3 py-5 px-5  md:gap-10   md:rounded-[32px]">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl  uppercase"> Welcome Back </h3>
            <p className="text-md text-dark text-opacity-60">
              {" "}
              Enter your email and password to continue
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3 ">
                <label
                  htmlFor="email"
                  className="font-medium capitalize text-dark  "
                >
                  Email or Username
                </label>
                <input
                  id="emailorusername"
                  className="rounded-md p-2"
                  placeholder="john@gmail.com or john"
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="password"
                    className="font-medium capitalize text-dark"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="rounded-md p-2"
                    placeholder="********"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div></div>
                <Link to="/request-password-change" className="font-semibold ">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button
                disabled={loading}
                type="submit"
                className="bg-primaryRed p-3 uppercase text-center font-semibold text-background rounded-md"
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
              <p className="text-center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primaryOrange  font-medium underline"
                >
                  Click here
                </Link>{" "}
                to Sign up
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
