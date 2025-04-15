import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/db";
import userRoutes from "./routes/user.routes";
import resturantRoutes from "./routes/resturant.routes";
import menuRoutes from "./routes/menu.routes";
import orderRoutes from "./routes/order.routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.static("public"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/resturant", resturantRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/order", orderRoutes);

const port = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
  });
});
