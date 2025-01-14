import express from "express";
import { GetAllCategoriesForSellers } from "../../Controllers/Sellers/CategoriesForSellers.Controller.js";

const router = express.Router();

router.route("/getallcateogriesforsellers").get(GetAllCategoriesForSellers);

export default router;