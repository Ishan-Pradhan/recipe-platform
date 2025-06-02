import OTP from "../models/otp.model.js";
import { User } from "../models/user.model.js";

const verifyEmailController = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({
      email,
      purpose: "verification",
    });
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    user.verified = true;
    await user.save();
    await OTP.deleteOne({ email, purpose: "verification" });

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in verifying email:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default verifyEmailController;
