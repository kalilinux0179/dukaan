import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/index.js";
import cookieParser from "cookie-parser";
import AuthRoute from "./Routes/SellerAdmin/Auth.Route.js";
import UserManagementRoute from "./Routes/Admin/UserManagement.Route.js";
import ProductManagementRoute from "./Routes/Admin/ProductManagement.Route.js";
import SubCategoryManagementRoute from "./Routes/Sellers/SubCategories.Route.js";

dotenv.config({
    path: "./.env",
});

// default middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Allowed origins for CORS
let allowedOrigins = [
    "https://dukaandar.vercel.app",
    "https://res.cloudinary.com",
    "http://localhost:5173",
];

// CORS middleware
app.use(
    cors({
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        allowedHeaders: ["Content-Type"], 
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.error(`Blocked by CORS: ${origin}`);
                callback(null, false);
            }
        },
    })
);

// Handle preflight requests
app.options("*", cors());

// Routes
app.use("/api/sa/", AuthRoute);
app.use("/api/admin/", UserManagementRoute);
app.use("/api/admin/", ProductManagementRoute);
app.use("/api/seller/", SubCategoryManagementRoute);

// Connect to the database and start the server
const PORT = 4000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`[+] Server is running on https://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(`[!] Failed to connect to the database: ${err.message}`);
    });
