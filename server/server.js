import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";
import database from "./config/db.js";
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/advocate", userRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("server conected");
    database();
})