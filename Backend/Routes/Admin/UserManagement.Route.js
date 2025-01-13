import express from "express"
import { GetSellersList } from "../../Controllers/Admin/Sellers.Controller.js"

const router = express.Router()
router.route("/getallsellers").get(GetSellersList)

export default router