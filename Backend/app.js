import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/index.js";
import AuthRoute from "./Routes/SellerAdmin/Auth.Route.js";
import UserManagementRoute from "./Routes/Admin/UserManagement.Route.js";
import ProductManagementRoute from "./Routes/Admin/ProductManagement.Route.js"
import cookieParser from "cookie-parser";

dotenv.config({
    path: "./.env",
});

// default middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


// routes
app.use("/api/sa/", AuthRoute)
app.use("/api/admin/", UserManagementRoute)
app.use("/api/admin/", ProductManagementRoute)

// connect and listen
const PORT = 4000;
connectDB().then(
    app.listen(PORT, () => {
        console.log(`[+] Server is running on http://localhost:${PORT}`)
    })
).catch()