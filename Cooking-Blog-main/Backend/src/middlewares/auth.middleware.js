import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "./../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({ message: "Unauthorized Request" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).send({ message: "Invalid Access Token " });
    }

    req.user = user;
    next();
  } catch (error) {
    // console.log(error);
    // console.log(error.message); //jwt expired
    // throw new ApiError(401, error?.message || "Invalid Access Token");
    return res.status(401).send({
      success: false,
      message: error?.message || "Invalid Access Token",
    });
  }
});

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(user);
    if (user.role !== "admin") {
      throw new ApiError(401, "unauthorized access");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
