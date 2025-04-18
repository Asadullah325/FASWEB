import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createCheckoutSession,
  getOrders,
  stripeWebhook,
} from "../controllers/order.controller";
import { catchAsync } from "../utils/catchAsync";

const router = express.Router();

router.route("/").get(catchAsync(isAuthenticated), catchAsync(getOrders));
router
  .route("/create-checkout-session")
  .post(catchAsync(isAuthenticated), catchAsync(createCheckoutSession));

router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), catchAsync(stripeWebhook));

export default router;
