import express from "express";
import { AddSubCategory, DeleteSubCategory, GetAllCategoriesForSellers, GetAllSubCategories, UpdateSubCategoryStatus } from "../../Controllers/Sellers/SubCategories.Controller.js";
import upload from "../../Middlewares/Multer.js"
import CheckAuthentication from "../../utils/CheckAuthentication.js";

const router = express.Router();

router.route("/getallcateogriesforsellers").get(GetAllCategoriesForSellers);
router.route("/addsubcategory").post(CheckAuthentication, upload.single("subCategoryImage"), AddSubCategory);
router.route("/getallsubcategories").get(CheckAuthentication, GetAllSubCategories);
router.route("/updatesubcategorystatus/:id").post(CheckAuthentication, UpdateSubCategoryStatus);
router.route("/deletesubcategory/:id").delete(CheckAuthentication, DeleteSubCategory);

export default router;