import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "./../models/user.model.js";
import jwt from "jsonwebtoken";
import OTP from "../models/otp.model.js";
import { generateOtp } from "../utils/otpGenerator.js";
import sendEmail from "../utils/sendEmail.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshTokens.push(refreshToken);
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong while generating refresh and access token",
    });
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  if ([username, email, password].some((field) => field.trim() === "")) {
    res.status(400).send({ message: "All fields are required" });
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    res.status(409).send({ message: "This email is already registered" });
  }

  const user = await User.create({ username, email, password });

  const otp = generateOtp();
  const otpRecord = new OTP({ email, otp, purpose: "verification" });
  await otpRecord.save();

  const message = `Your OTP code for email verification is: ${otp}. This will expire in 10 minutes.`;
  await sendEmail({
    email: user.email,
    subject: "Email Verification",
    message,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    res.status(400).send({ message: "Something went wrong while registering" });
  }

  return res.send(
    new ApiResponse(
      200,
      createdUser,
      "User Registered successfully. Please verify your email"
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { emailorusername, password } = req.body;

  if (!emailorusername) {
    return res
      .status(400)
      .send({ success: false, message: "Username or email is required" });
    // throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username: emailorusername }, { email: emailorusername }],
  });

  if (!user) {
    return res.status(404).send({ success: false, message: "User not found" });
    // throw new ApiError(404, "User is not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .send({ success: false, message: "Invalid user credentials" });
    // throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  console.log("refreshtoken is in logincontroller", refreshToken);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .send(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "You logged in"
      )
    );
});

const verifyOtpForPassword = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const otpRecord = await OTP.findOne({
    email,
    otp,
    purpose: "password-reset",
  });

  if (!otpRecord || otpRecord.expireAt < new Date()) {
    res.status(400).send({ message: "Invalid or expired OTP" });
  }

  await OTP.deleteOne({ email, purpose: "password-reset" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  res.status(200).json({
    success: true,
    message: "OTP verified successfully",
    token,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).send({ message: "Refresh token is required" });
  }
  await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { refreshTokens: refreshToken } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .status(200)
    .send({
      message: "user logged out",
    });
});

const requestOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).send({ message: "User not found" });
  }

  const otp = generateOtp();
  const otpRecord = new OTP({
    email: user.email,
    otp,
    purpose: "password-reset",
  });
  await otpRecord.save();

  const message = `Your OTP code for password reset is: ${otp}. This will expire in 10 minutes.`;
  await sendEmail({
    email: user.email,
    subject: "Password Reset OTP",
    message,
  });

  res.status(200).json({
    success: true,
    message: "OTP sent to your email",
  });
});

const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken: incomingRefreshToken } = req.body;

    if (!incomingRefreshToken) {
      res.status(400).send({ message: "Refresh token is required" });
    }

    // Step 1: Find the user associated with the refresh token
    const user = await User.findOne({ refreshTokens: incomingRefreshToken });

    if (!user) {
      res.status(400).send({ message: "Invalid refresh token" });

      // Step 2: Check if the incoming refresh token is still valid
      const isValid = user.refreshTokens.includes(incomingRefreshToken);

      if (!isValid) {
        res.status(400).send({ message: "Expired or Invalid refresh token" });
      }

      // Step 3: Generate a new access token (keep the same refresh token)
      const accessToken = user.generateAccessToken(); // Using the method to generate the access token

      // Step 5: Return the new access token with the existing refresh token
      return res.json({
        accessToken, // New access token
        refreshToken: incomingRefreshToken, // Keep the same refresh token
      });
    }
  } catch (error) {
    next(error);
  }
};

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?.id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .send({ success: false, message: "Old password is incorrect" });
    // throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .send(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .send(200, req.user, "current user fetched successfully");
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res
      .status(400)
      .send({ success: false, message: "username is required" });
  }
  console.log(req.user);
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { username } },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .send(new ApiResponse(200, user, "User details updated successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).send({ message: "User not found" });
  }

  user.password = password;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  requestOtp,
  verifyOtpForPassword,
  changePassword,
};
