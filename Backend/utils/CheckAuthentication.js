import jwt from "jsonwebtoken";

const CheckAuthentication = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Jwt token not found",
                success: false
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error)
    }
}

export default CheckAuthentication