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
        const categories = await Category.find({ categoryCreatedBy: req.user.id }).sort({ createdAt: -1 });
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
        console.log(response);
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
        const { categoryId, categoryName, categoryDescription } = req.body;
        const categoryImage = req.file;
        console.log(categoryId, categoryName, categoryDescription, categoryImage)
        // const categoryData = await Category.findById(categoryId)
        // if (!categoryData) {
        //     return res
        //         .status(404)
        //         .json({
        //             message: "Category Not Found!",
        //             success: false
        //         })
        // }
        // if (categoryName) { categoryData.categoryName = categoryName }
        // if (categoryDescription) { categoryData.categoryDescription = categoryDescription }
        // if (categoryImage) {
        //     const oldImageUrl = categoryData.categoryImage;
        //     const oldPublicId = oldImageUrl.split('/').pop().split('.')[0];
        //     await cloudinary.uploader.destroy(oldPublicId);
        //     const uploadResult = await cloudinary.uploader.upload(categoryImage.path, {
        //         folder: "Mart/Category",
        //     })
        //     categoryData.categoryImage = uploadResult.secure_url
        //     fs.unlink(categoryImage.path, (err) => {
        //         if (err) {
        //             console.error("Error deleting file from tmp folder:", err);
        //         }
        //     });
        // }
        // await categoryData.save();
        return res
            .status(200)
            .json({
                message: "Category Updated Successfully",
                success: true,
                // categoryData
            })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}