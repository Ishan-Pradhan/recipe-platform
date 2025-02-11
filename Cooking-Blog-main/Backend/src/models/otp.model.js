import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  purpose: {
    type: String,
    required: true,
    enum: ["verification", "password-reset"],
  },
  expireAt: {
    type: Date,
    default: () => Date.now() + 10 * 60 * 1000, // 10-minute expiration
    index: { expires: 600 },
  },
});

export default mongoose.model("OTP", otpSchema);
