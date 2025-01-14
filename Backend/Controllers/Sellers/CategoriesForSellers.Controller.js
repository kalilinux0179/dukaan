import { Category } from "../../Models/Admin/Categories.Model.js";

export const GetAllCategoriesForSellers = async (req, res) => {
    try {
        const categories = await Category.find({ categoryStatus: true }).sort({ createdAt: -1 });
        return res
            .status(200)
            .json({
                success: true,
                data: categories,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};