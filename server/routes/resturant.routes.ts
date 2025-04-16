import express from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  createResturant,
  getResturant,
  getResturantOrders,
  getSingleResturant,
  SearchResturant,
  updateOrderStatus,
  updateResturant,
} from "../controllers/resturant.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";

const router = express.Router();

router
  .route("/create")
  .post(
    catchAsync(isAuthenticated),
    upload.single("image"),
    catchAsync(createResturant)
  );

router
  .route("/all")
  .get(catchAsync(isAuthenticated), catchAsync(getResturant));

router
  .route("/update/:id")
  .put(
    catchAsync(isAuthenticated),
    upload.single("image"),
    catchAsync(updateResturant)
  );

router
  .route("/order")
  .get(catchAsync(isAuthenticated), catchAsync(getResturantOrders));

router
  .route("/order/:orderId/status")
  .get(catchAsync(isAuthenticated), catchAsync(updateOrderStatus));

router
  .route("/search/:searchTrm")
  .get(catchAsync(isAuthenticated), catchAsync(SearchResturant));

router
  .route("/:id")
  .get(catchAsync(isAuthenticated), catchAsync(getSingleResturant));

export default router;
