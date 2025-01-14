import { Auth } from "../../Models/SellerAdmin/Auth.Model.js"
import bcrypt from "bcryptjs"
import GenerateToken from "../../utils/GenerateToken.js";
export const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const emailExists = await Auth.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await Auth.create({
            fullName,
            email,
            password: hashedPassword,
            role: "seller"
        });

        return res.status(201).json({
            message: "User created successfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const userExists = await Auth.findOne({ email });
        if (!userExists) {
            return res.status(404).json({
                message: "Invalid Credentials",
                success: false
            })
        }
        const passwordVerify = await bcrypt.compare(password, userExists.password);
        if (!passwordVerify) {
            return res.status(404).json({
                message: "Invalid Credentials",
                success: false
            })
        }
        const jwtToken = GenerateToken(userExists._id, rememberMe);
        let userData = {
            fullName: userExists.fullName,
            email: userExists.email,
            role: userExists.role,
            verified: userExists.verified,
            status: userExists.status
        }
        return res.status(200)
            .cookie("token", jwtToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: rememberMe ? 14 * 24 * 60 * 60 * 1000 : 2 * 24 * 60 * 60 * 1000,
            })
            .json({
                message: `Welcome Back ${userExists.fullName}`,
                success: true,
                userData,
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

export const LogOut = async (_, res) => {
    try {
        return res
            .status(200)
            .clearCookie("token", {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                maxAge: 0,
            })
            .json({
                message: "Logged Out Successfully",
                success: true
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}