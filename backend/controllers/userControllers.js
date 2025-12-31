import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import generateToken from "../utils/generateToken.js"
import Puser from '../models/Puser.js'

const register = async (req, res) => {
    try {
        const { fullName, phone, email, password, companyName, isAgency } = req.body;

        if (!fullName || !phone || !email || !password || !companyName || isAgency === undefined) {
            return res.status(400).json({ success: false, msg: "please enter all the values" });
        }

        const isExist = await Puser.findOne({ email });
        if (isExist) {
            return res.status(400).json({ success: false, msg: "user already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let avatarUrl = "";
        if (req.file) {
            const uploaded = await cloudinary.uploader.upload(req.file.path);
            avatarUrl = uploaded.secure_url;
        }
        const user = await Puser.create({
            fullName,
            phone,
            email,
            password: hashedPassword,
            companyName,
            isAgency,
            avatar: avatarUrl,
        });


        return res.status(201).json({
            success: true,
            msg: "user registered successfully",
            token: generateToken(user._id),
        });

    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, msg: err.message });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Puser.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, msg: "invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: "invalid credentials" });
        }

        return res.status(200).json({
            success: true,
            msg: "login successful",
            token: generateToken(user._id),
        });

    } catch (err) {
        return res.status(500).json({ success: false, msg: err.message });
    }
};



const uploadAvatar = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        const uploadRes = await cloudinary.uploader.upload(req.file.path, {
            folder: "popx_avatars",
        });

        const user = await Puser.findByIdAndUpdate(
            req.user._id,
            { avatar: uploadRes.secure_url },
            { new: true }
        );

        res.json({
            hello: "bro",
            success: true,
            avatar: user.avatar,
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: err.message });
    }
};


export { register, login, uploadAvatar }