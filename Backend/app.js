import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/index.js";
import AuthRoute from "./Routes/SellerAdmin/Auth.Route.js";
import UserManagementRoute from "./Routes/Admin/UserManagement.Route.js";
import ProductManagementRoute from "./Routes/Admin/ProductManagement.Route.js";
import cookieParser from "cookie-parser";

dotenv.config({
    path: "./.env",
});

// List of allowed domains
const allowedOrigins = [
    "http://localhost:5173",
    "https://dukaan-tan.vercel.app",
    "https://cloudinary.com",
];

// CORS options
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};

// Default middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/api/sa/", AuthRoute);
app.use("/api/admin/", UserManagementRoute);
app.use("/api/admin/", ProductManagementRoute);

// Connect and listen
const PORT = 4000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`[+] Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
    });
