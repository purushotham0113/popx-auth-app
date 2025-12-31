import jwt from "jsonwebtoken";
import Puser from "../models/Puser.js";

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await Puser.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            return res.status(401).json({ msg: "Not authorized" });
        }
    }

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
};

export default protect;
