import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await axios.post(
        "/api/v1/users/verify-email",
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.data;
      console.log(data);
      setLoading(false);
      setError(false);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
      setError(true);
    }
  };

  return (
    <section className="container mx-auto mb-20 ">
      <div className="mx-4 flex justify-center items-center">
        <div className="flex flex-col justify-center items gap-[40px] border-dark border-opacity-20 rounded-[24px] md:w-1/3 py-5 px-5 md:gap-10 md:rounded-[32px]">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl uppercase">Verify Email</h3>
            <p className="text-md text-dark text-opacity-60">
              Enter the OTP sent to your email to verify your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="otp"
                  className="font-semibold uppercase text-dark"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  className="rounded-md p-2"
                  placeholder="Enter OTP"
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
                {loading ? "Loading..." : "Verify"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
