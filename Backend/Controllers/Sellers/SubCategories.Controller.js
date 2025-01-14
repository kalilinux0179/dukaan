import { Category } from "../../Models/Admin/Categories.Model.js";
import { Subcategory } from "../../Models/Sellers/SubCategories.Model.js";
import cloudinary from "../../utils/CloudinaryConfig.js";
import fs from "fs";

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
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const AddSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryName, subCategoryDescription } = req.body;
        const subCategoryImage = req.file;
        const isSubCategoryExists = await Subcategory.findOne({ subCategoryName });
        if (isSubCategoryExists) {
            return res.status(400).json({
                message: "SubCategory already exists",
                success: false,
            });
        }
        const categoryData = await Category.findById(categoryId);
        const uploadResult = await cloudinary.uploader.upload(subCategoryImage.path, {
            folder: "Mart/SubCategory",
        })
        fs.unlink(subCategoryImage.path, (err) => {
            if (err) {
                console.error("Error deleting file from tmp folder:", err);
            }
        });
        await Subcategory.create({
            categoryName: categoryData.categoryName,
            subCategoryName,
            subCategoryDescription,
            subCategoryImage: uploadResult.secure_url,
            categoryId: categoryData._id,
            subcategoryCreatedBy: req.user.id
        })
        return res
            .status(200)
            .json({
                message: "SubCategory added successfully",
                success: true
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}

export const GetAllSubCategories = async (req, res) => {
    try {
        const subCategories = await Subcategory.find({ subcategoryCreatedBy: req.user.id }).sort({ createdAt: -1 });
        return res
            .status(200)
            .json({
                success: true,
                data: subCategories,
            });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}

export const UpdateSubCategoryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Subcategory.findByIdAndUpdate(id, { status: status });
        return res
            .status(200)
            .json({
                message: "SubCategory status updated successfully",
                success: true
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error",
                success: false,
            });
    }
}

export const DeleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Subcategory.findById(id);
        const publicId = data.subCategoryImage
            .split('/')
            .slice(-3)
            .join('/')
            .split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        await Subcategory.findByIdAndDelete(id);
        return res
            .status(200)
            .json({
                message: "SubCategory deleted successfully",
                success: true
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error",
                success: false,
            });
    }

}