import { model, Schema } from "mongoose";
const CategorySchema = Schema({
    categoryName: {
        type: String,
        unique: true,
    },
    categoryDescription: {
        type: String,
    },
    categoryImage: {
        type: String,
    },
    categoryStatus: {
        type: Boolean,
        default: true
    },
    categoryCreatedBy: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
    }
}, { timestamps: true })

export const Category = model("Category", CategorySchema)