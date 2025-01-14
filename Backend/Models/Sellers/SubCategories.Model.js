import { model, Schema } from "mongoose";

const subcategorySchema = new Schema(
    {
        categoryName: {
            type: String,
        },
        subCategoryName: {
            type: String,
            trim: true,
        },
        subCategoryDescription: {
            type: String,
            trim: true,
        },
        subCategoryImage: {
            type: String,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        subcategoryCreatedBy: {
            type: Schema.Types.ObjectId,
            ref: "Auth",
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
    }
);

// Export the Subcategory Model
export const Subcategory = model('Subcategory', subcategorySchema);
