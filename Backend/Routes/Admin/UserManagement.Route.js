import express from "express"
import { DeleteSeller, GetSellersList, updateSellerStatus } from "../../Controllers/Admin/Sellers.Controller.js"
import CheckAuthentication from "../../utils/CheckAuthentication.js";

const router = express.Router()
router.route("/getallsellers").get(CheckAuthentication,GetSellersList)
router.route("/deleteseller/:id").delete(CheckAuthentication, DeleteSeller)
router.route("/updatesellerstatus/:id").post( updateSellerStatus)

export default router