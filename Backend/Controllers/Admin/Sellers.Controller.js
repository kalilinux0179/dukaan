import { Auth } from "../../Models/SellerAdmin/Auth.Model.js"

export const GetSellersList = async (req, res) => {
    try {
        const sellers = await Auth.find({ role: "seller" }).sort({ createdAt: -1 });
        const sellersData = sellers.map((seller) => ({
            SellerId: seller._id,
            Name: seller.fullName,
            Email: seller.email,
            Verified: seller.verified,
            Status: seller.status
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

export const DeleteSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Auth.findById(id);
        if (!data) {
            return res.status(404)
                .json({
                    message: "Seller not found",
                    success: false
                })
        }
        await Auth.findByIdAndDelete(id);
        return res.status(200)
            .json({
                message: "Seller deleted successfully",
                success: true
            })

    } catch (error) {
        return res.status(500)
            .json({
                message: "Internal Server Error",
                success: false
            })
    }
}

export const updateSellerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Auth.findByIdAndUpdate(id, { status: status });
        return res
            .status(200)
            .json({
                message: "Seller status updated successfully",
                success: true
            })
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({
                message: "Internal Server Error",
                success: false
            })
    }
}