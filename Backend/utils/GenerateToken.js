import jwt from 'jsonwebtoken';

const GenerateToken = (id, rememberMe) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: rememberMe ? "14d" : "2d" });
};

export default GenerateToken;