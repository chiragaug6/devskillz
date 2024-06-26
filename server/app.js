import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import lecturesRoutes from "./routes/LectureRoutes.js";
import mcqRoutes from "./routes/mcqRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import miscellaneousRoutes from "./routes/miscellaneousRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS with specific origin and credentials
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", // Replace with your actual frontend origin
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/courses", courseRoutes);

app.use("/api/v1/lectures", lecturesRoutes);

app.use("/api/v1/mcqs", mcqRoutes);

app.use("/api/v1/comments", commentRoutes);

app.use("/api/v1/payments", paymentRoutes);

app.use("/api/v1/", miscellaneousRoutes);

app.all("*", (req, res) => {
  res.status(404).send("OOPS !! 404 Page Not Found");
});

// Custom middleware to set Access-Control-Allow-Origin header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Handle preflight OPTIONS requests
app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.use(errorMiddleware);

export default app;
