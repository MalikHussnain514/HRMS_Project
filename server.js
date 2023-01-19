// Import Packages
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";

import errorHandler from "./middlewares/errorHandler.js";

// Import Modules
import connectDB from "./config/db.js";

// Import Routes
import adminRoute from "./routes/adminRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import userRoute from "./routes/userRoute.js";

import clientRoute from "./routes/clientRoute.js";

// import imageUploadRoute from "./routes/imageUploadRoute.js";


// cors options
const corsOptions = {
  origin: "*",
  "Access-Control-Allow-Origin": "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();
connectDB();
const app = express();

app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// app.use(cors(corsOptions));
app.use(express.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.get("/", (req, res) => {
  res.send("App is running .... ");
});

// if (process.env.NODE_ENV == "development") {
//   app.use(morgan("dev"));
// }

app.use("/api/v1/admins", adminRoute);
app.use("/api/v1/employees", employeeRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/role", employeeRoute);

app.use("/api/v1/client", clientRoute);

// app.use("/api/v1/image-upload", imageUploadRoute);


// app.use((error, req, res, next) => {
//   if (req.file) {
//     fs.unlink(req.file.path, (err) => {
//       console.log("hello", err);
//     });
//   }
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({ message: error.message || "An unknown error occurred!" });
// });

// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on ${process.env.NODE_ENV} at port ${PORT}`)
);