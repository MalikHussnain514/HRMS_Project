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
import referenceRoute from "./routes/referenceRoute.js";
import expenceRoute from "./routes/expenceRoute.js";
import overtimeRoute from "./routes/overtimeRoute.js";
import bonusRoute from "./routes/bonusRoute.js";
import salaryStatementRoute from "./routes/salaryStatementRoute.js";
import holidayRoute from "./routes/holidayRoute.js";
import providentFundRoute from "./routes/providentFundRoute.js";
import incrementRoute from "./routes/incrementRoute.js";
import leaveManagementRoute from "./routes/leaveManagementRoute.js";
import attendenceManagementRoute from "./routes/attendenceManagementRoute.js";
import imageUploadRoute from "./routes/imageUploadRoute.js";

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
app.use(cors());
app.use(express.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.get("/", (req, res) => {
  res.send("App is running .... ");
});

app.use("/api/v1/admins", adminRoute);
app.use("/api/v1/employees", employeeRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/role", employeeRoute);
app.use("/api/v1/client", clientRoute);
app.use("/api/v1/reference", referenceRoute);
app.use("/api/v1/expence", expenceRoute);
app.use("/api/v1/overtime", overtimeRoute);
app.use("/api/v1/bonus", bonusRoute);
app.use("/api/v1/salaryStatement", salaryStatementRoute);
app.use("/api/v1/holiday", holidayRoute);
app.use("/api/v1/providentFund", providentFundRoute);
app.use("/api/v1/increment", incrementRoute);
app.use("/api/v1/leaveManagement", leaveManagementRoute);
app.use("/api/v1/attendenceManagement", attendenceManagementRoute);
app.use("/api/v1/image-upload", imageUploadRoute);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on ${process.env.NODE_ENV} at port ${PORT}`)
);
