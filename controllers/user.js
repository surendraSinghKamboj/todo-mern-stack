import { Users } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/token.js";




// User Register Controller

export const register = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {


        let user = await Users.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "email id already Registered",
                name: user.name,
                email: user.email
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await Users.create({
            name,
            email,
            mobile,
            password: hashedPassword,
        });

        sendToken(user, res, "Registered Succussfully......", 201)

    } catch (error) {
        console.error("Accout Creatation failed....");
        res.status(401).json({
            success: false,
            message: "Accout Creatation failed....",
        });
    }
};



// User Login Controller

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

        sendToken(user, res, "Login Successfully....")

    } catch (error) {
        console.error(error)
        return res.status(401).json({ success: false, message: error })
    }
}
