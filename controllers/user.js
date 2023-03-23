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
        const user = await Users.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ success: false, message: "Email-id or password is invailid" })
        }
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(404).json({ success: false, message: "Email-id or password is invailid" })
        }

        sendToken(user, res, `Welcome back, ${user.name}`)

    } catch (error) {
        console.error(error)
        return res.status(401).json({ success: false, message: error })
    }
}




// user Logout

export const logout = (req, res) => {
    return res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({ success: true, message: "Logout successfully......." })
}

// get profile data

export const getMyProfile = (req, res) => {

    res.status(200).json({ success: false, user: req.user })

}