import jwt from "jsonwebtoken";
import { Users } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(402).json({ success: false, message: "you are not logged in" })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    if (!decode) {
        return res.status(402).json({ success: false, message: "you are not logged in" })
    }

    req.user = await Users.findById(decode._id);

    next()
}