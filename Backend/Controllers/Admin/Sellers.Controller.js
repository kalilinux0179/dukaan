import { Auth } from "../../Models/SellerAdmin/Auth.Model.js"

export const GetSellersList = async (_, res) => {
    try {
        const sellers = await Auth.find({ role: "seller" }).sort({ createdAt: -1 });
        const sellersData = sellers.map((seller) => ({
            SellerId: seller._id,
            Name: seller.fullName,
            Email: seller.email,
            Verified: seller.verified
        }))
        return res
            .status(200)
            .json({
                success: true,
                data: sellersData
            })
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({
                message: "Internal Server Error",
                success: false,
                data: sellersData
            })
    }
}