import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { URL } from "../../constants/constants";

// Define the validation schema using Zod
const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be only 20 characters long")
    .regex(
      /^[a-z0-9]{3,20}$/,
      "Username must not contain special characters or uppercase letters"
    )
    .refine((s) => !s.includes(" "), "No Spaces!"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const RegisterSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/api/v1/users/register`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(res.data.message);
      navigate(`/verify-email/${encodeURIComponent(data.email)}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto mb-20 mt-20">
      <div className="mx-4 flex justify-center items-center">
        <div className="flex flex-col justify-center gap-[40px] border-dark border-opacity-20 rounded-[24px] md:w-[500px] py-4 px-4 md:gap-8 md:rounded-[32px]">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl uppercase">Get Started</h3>
            <p className="text-dark text-opacity-60">
              Welcome to Cooking Delight - Let's create your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Username */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="username"
                className="font-semibold uppercase text-dark"
              >
                Username
              </label>
              <input
                {...register("username")}
                id="username"
                className="rounded-md p-2 border border-gray-300"
                placeholder="John Doe"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="email"
                className="font-semibold uppercase text-dark"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="rounded-md p-2 border border-gray-300"
                placeholder="john@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="password"
                className="font-semibold uppercase text-dark"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className="rounded-md p-2 border border-gray-300"
                placeholder="********"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={!isValid || loading}
                className={`p-3 uppercase text-center font-semibold rounded-md transition-all ${
                  !isValid || loading
                    ? "bg-[#aaa] cursor-not-allowed"
                    : "bg-primaryRed text-background"
                }`}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
              <p className="text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primaryOrange font-medium underline"
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
