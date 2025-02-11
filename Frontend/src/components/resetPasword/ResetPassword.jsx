import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../Header";
import Footer from "../Footer";

const ResetPassword = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("OTP verification required");
      navigate("/request-otp");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/v1/users/change-password",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.data;
      console.log(data);
      setLoading(false);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="container mx-auto mb-20 ">
        <div className="mx-4 flex justify-center items-center">
          <div className="flex flex-col justify-center items gap-[40px] border-dark border-opacity-20 rounded-[24px] md:w-1/3 py-5 px-5 md:gap-10 md:rounded-[32px]">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl uppercase">Reset Password</h3>
              <p className="text-md text-dark text-opacity-60">
                Enter your new password
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="password"
                    className="font-semibold uppercase text-dark"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="rounded-md p-2"
                    placeholder="New Password"
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
                  {loading ? "Loading..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ResetPassword;
