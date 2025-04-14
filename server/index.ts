import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/db";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

const port = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
  });
});
