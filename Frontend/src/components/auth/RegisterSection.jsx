import axios from "axios";
import { method } from "lodash";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../constants/constants";

const RegisterSection = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/api/v1/users/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.data;
      console.log(data);
      setLoading(false);
      setError(false);
      console.log(data);
      toast.success(res.data.message);
      navigate(`/verify-email/${encodeURIComponent(formData.email)}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
      setError(true);
    }
  };

  console.log(formData);
  return (
    <section className="container mx-auto mb-20 mt-20">
      <div className="mx-4 flex justify-center items-center  ">
        <div className="flex flex-col justify-center items gap-[40px]  border-dark border-opacity-20 rounded-[24px] md:w-[500px] py-4 px-4  md:gap-8 md:rounded-[32px]">
          <div className="flex flex-col gap-2 ">
            <h3 className="font-bold text-xl  uppercase"> Get Started</h3>
            <p className="text-dark text-opacity-60">
              Welcome to Cooking Delight - Let's create your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3 ">
                <label
                  htmlFor="username"
                  className="font-semibold uppercase text-dark  "
                >
                  Username
                </label>
                <input
                  id="username"
                  className="rounded-md p-2"
                  placeholder="John doe"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3 ">
                <label
                  htmlFor="email"
                  className="font-semibold uppercase text-dark  "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="rounded-md p-2"
                  placeholder="john@gmail.com"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="password"
                  className="font-semibold uppercase text-dark"
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
            <div className="flex flex-col gap-4">
              <button
                disabled={loading}
                type="submit"
                className="bg-primaryRed p-3 uppercase text-center font-semibold text-background rounded-md"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
              <p className="text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primaryOrange  font-medium underline"
                >
                  Click here
                </Link>{" "}
                to Sign in
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
