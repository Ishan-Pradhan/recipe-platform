import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RequestOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOTP = (e) => {
    setOtp(e.target.value);
  };

  const sendOtp = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/v1/users/request-otp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.data;
      console.log(data);
      setLoading(false);
      setOtpSent(true);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/v1/users/verify-password-otp",
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
      toast.success(res.data.message);
      navigate(
        `/reset-password?email=${encodeURIComponent(email)}&token=${data.token}`
      );
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
              <h3 className="font-bold text-xl uppercase">Request OTP</h3>
              <p className="text-md text-dark text-opacity-60">
                Enter your email to receive an OTP
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="font-semibold uppercase text-dark"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="rounded-md p-2"
                    placeholder="john@gmail.com "
                    onChange={handleEmail}
                  />
                  {!otpSent && (
                    <button
                      type="button"
                      className="bg-primaryRed p-2 uppercase text-center font-semibold text-background rounded-md mt-2"
                      onClick={sendOtp}
                      disabled={loading || !email}
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                  )}
                </div>
                {otpSent && (
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
                      type="number"
                      className="rounded-md p-2"
                      placeholder="Enter OTP"
                      onChange={handleOTP}
                    />
                  </div>
                )}
              </div>
              {otpSent && (
                <div className="flex flex-col gap-4">
                  <button
                    disabled={loading}
                    type="submit"
                    className="bg-primaryRed p-3 uppercase text-center font-semibold text-background rounded-md"
                  >
                    {loading ? "Verifying OTP..." : "Verify OTP"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RequestOtp;
