import express from "express";
import { catchAsync } from "../utils/catchAsync";
import { addMenu, editMenu } from "../controllers/menu.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";

const router = express.Router();

router
  .route("/add")
  .post(
    catchAsync(isAuthenticated),
    upload.single("image"),
    catchAsync(addMenu)
  );
router
  .route("/edit/:id")
  .post(
    catchAsync(isAuthenticated),
    upload.single("image"),
    catchAsync(editMenu)
  );

export default router;
