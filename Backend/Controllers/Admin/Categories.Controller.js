import { Category } from "../../Models/Admin/Categories.Model.js";
import cloudinary from "../../utils/CloudinaryConfig.js";
import fs from "fs";

export const CreateCategory = async (req, res) => {
    try {
        const { categoryName, categoryDescription } = req.body;
        const categoryImage = req.file;
        if (!categoryName || !categoryDescription || !categoryImage) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
        const categoryExists = await Category.findOne({ categoryName });
        if (categoryExists) {
            return res.status(400).json({
                message: "Category already exists",
                success: false,
            });
        }

        const uploadResult = await cloudinary.uploader.upload(categoryImage.path, {
            folder: "Mart/Category",
        })
        fs.unlink(categoryImage.path, (err) => {
            if (err) {
                console.error("Error deleting file from tmp folder:", err);
            }
        });
        await Category.create({
            categoryName,
            categoryDescription,
            categoryImage: uploadResult.secure_url,
            categoryCreatedBy: req.user.id
        });

        return res
            .status(200)
            .json({
                message: "Category created successfully",
                success: true
            })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const GetAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
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

export const updateCategoryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Category.findByIdAndUpdate(id, { categoryStatus: status });
        return res
            .status(200)
            .json({
                message: "Category status updated successfully",
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

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Category.findById(id);
        const publicId = data.categoryImage
            .split('/')
            .slice(-3)
            .join('/')
            .split('.')[0];
        const response = await cloudinary.uploader.destroy(publicId);
        await Category.findByIdAndDelete(id);
        return res
            .status(200)
            .json({
                message: "Category deleted successfully",
                success: true
            })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, categoryDescription } = req.body;
        const categoryImage = req.file;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            })
        }
        if (categoryName) { category.categoryName = categoryName; }
        if (categoryDescription) { category.categoryDescription = categoryDescription; }
        let oldImage = category.categoryImage;
        const publicId = oldImage
            .split('/')
            .slice(-3)
            .join('/')
            .split('.')[0];
        if (categoryImage) {
            await cloudinary.uploader.destroy(publicId);
            const uploadResult = await cloudinary.uploader.upload(categoryImage.path, {
                folder: "Mart/Category",
            })
            fs.unlink(categoryImage.path, (err) => {
                if (err) console.error("Error deleting file from tmp folder:", err);
            });
            category.categoryImage = uploadResult.secure_url;
        }
        await category.save();
        return res
            .status(200)
            .json({
                message: "Category Updated Successfully",
                success: true,
            })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}