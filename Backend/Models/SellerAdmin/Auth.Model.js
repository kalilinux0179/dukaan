import { model, Schema } from "mongoose";

const AuthSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: [
            "Active",
            "Suspended",
            "Banned",
            "Warned"
        ],
        default: "Active"
    },
    role: {
        type: String,
        enum: [
            "admin",
            "seller",
            "customer"
        ]
    }

}, { timestamps: true });

export const Auth = model("Auth", AuthSchema);