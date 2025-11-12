import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

const JWT_SECRET = process.env.JWT_SECRET || "143a581a5a8f72a1dcbd7a1108ac03fa9a18e1ebabe10a600f63e49270c29cd694bf96a8fe84526cd590d868e0797a3da36cb1ac14ba2c103d271fedc148eae1";


export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token missing"
        });
    }
    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.id).select("-password");
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        // attach plain id (not the whole doc) to keep req.user consistent across code
        req.user = { id: user._id };
        next();
    } catch (error) {
        console.log("JWT verification failed", error);
        return res.status(401).json({ success: false, message: "Token invalid or expired" });
    }
}