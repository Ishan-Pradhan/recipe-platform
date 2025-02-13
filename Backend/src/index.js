import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import connectDB from "./db/index.js";
import app from "./app.js";

app.get("/", (req, res) => {
  res.send("<h1>Recipe API</h1>");
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("error: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MONGODB connection fail: ", err));
