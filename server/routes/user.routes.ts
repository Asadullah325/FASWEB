import express from "express";
import {
  checkAuth,
  forgetPassword,
  login,
  logout,
  resetPassword,
  signup,
  updateProfile,
  verifyEmail,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { catchAsync } from "../utils/catchAsync";

const router = express.Router();

router
  .route("/check-auth")
  .get(catchAsync(isAuthenticated), catchAsync(checkAuth));
router.route("/signup").post(catchAsync(signup));
router.route("/login").post(catchAsync(login));
router.route("/logout").post(catchAsync(logout));
router.route("/verify-email").post(catchAsync(verifyEmail));
router.route("/forgot-password").post(catchAsync(forgetPassword));
router.route("/reset-password/:token").post(catchAsync(resetPassword));
router
  .route("/profile/update")
  .put(catchAsync(isAuthenticated), catchAsync(updateProfile));

export default router;
