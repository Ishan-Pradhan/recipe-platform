import { Router } from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  requestOtp,
  updateAccountDetails,
  verifyOtpForPassword,
} from "../controllers/user.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import verifyEmailController from "../controllers/otp.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/verify-email").post(verifyEmailController);
router.route("/request-otp").post(requestOtp);
router.route("/change-password").post(changePassword);
router.route("/verify-password-otp").post(verifyOtpForPassword);
//secured routes
router.get("/admin-auth", verifyJWT, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/getuser", verifyJWT, (req, res) => {
  res.status(200).send({ ok: true });
});
router.route("/update-detail").put(verifyJWT, updateAccountDetails);

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refreshToken").post(refreshAccessToken);

export default router;
