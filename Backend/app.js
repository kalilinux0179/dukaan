import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/index.js";
import cookieParser from "cookie-parser";
import AuthRoute from "./Routes/SellerAdmin/Auth.Route.js";
import UserManagementRoute from "./Routes/Admin/UserManagement.Route.js";
import ProductManagementRoute from "./Routes/Admin/ProductManagement.Route.js"
import SubCategoryManagementRoute from "./Routes/Sellers/SubCategories.Route.js"

dotenv.config({
    path: "./.env",
});

// default middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
    "https://dukaan-tan.vercel.app",
    "https://res.cloudinary.com",
    "http://localhost:5173",
]

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}))


// routes
app.use("/api/sa/", AuthRoute)
app.use("/api/admin/", UserManagementRoute)
app.use("/api/admin/", ProductManagementRoute)
app.use("/api/seller/", SubCategoryManagementRoute)

// connect and listen
const PORT = 4000;
connectDB().then(
    app.listen(PORT, () => {
        console.log(`[+] Server is running on http://localhost:${PORT}`)
    })
).catch()