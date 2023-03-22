import { Users } from "../models/user.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await Users.create({
            name,
            email,
            mobile,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "Account Created Successfully.",
        });
    } catch (error) {
        console.error("Accout Creatation failed....");
        res.status(401).json({
            success: false,
            message: "Accout Creatation failed....",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "Email-id or password is invailid" })
        }
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(404).json({ success: false, message: "Email-id or password is invailid" })
        }
        return res.status(200).json({ success: true, message: "Login Successfully...." })
    } catch (error) {
        console.error(error)
        return res.status(401).json({ success: false, message: error })
    }
}
