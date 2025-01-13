import express from "express";
import { CreateCategory, deleteCategory, updateCategory, updateCategoryStatus } from "../../Controllers/Admin/Categories.Controller.js";
import { GetAllCategories } from "../../Controllers/Admin/Categories.Controller.js"
import upload from "../../Middlewares/Multer.js"
import CheckAuthentication from "../../utils/CheckAuthentication.js";

const router = express.Router();

router.route("/addcategory").post(CheckAuthentication, upload.single("categoryImage"), CreateCategory);
router.route("/getallcateogries").get(CheckAuthentication, GetAllCategories);
router.route("/updatecategorystatus/:id").post(CheckAuthentication, updateCategoryStatus);
router.route("/deletcategory/:id").delete(CheckAuthentication, deleteCategory);
router.route("/updatecategory").post(CheckAuthentication, upload.single("categoryImage"), updateCategory);

export default router;
