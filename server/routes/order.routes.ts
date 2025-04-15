import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createCheckoutSession,
  getOrders,
} from "../controllers/order.controller";
import { catchAsync } from "../utils/catchAsync";

const router = express.Router();

router.route("/").get(catchAsync(isAuthenticated), catchAsync(getOrders));
router
  .route("/checkout/create-checkout-session")
  .get(catchAsync(isAuthenticated), catchAsync(createCheckoutSession));

//   router.route("/webhook").post()

export default router;
