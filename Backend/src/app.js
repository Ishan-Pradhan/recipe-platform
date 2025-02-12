import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(
  express.urlencoded({
    // to support URL-encoded bodies
    extended: true,
    limit: "20kb",
  })
);

app.use(express.static("public"));

//routes imports
import userRouter from "./routes/user.routes.js";
import recipeRouter from "./routes/recipe.route.js";

// //routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/recipes", recipeRouter);

export default app;
