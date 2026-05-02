import jwt from "jsonwebtoken";
import { blacklistTokenModel } from "../models/blacklist.model.js";

async function authUser(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. No token provided.",
            });
        }

        const isTokenBlacklisted = await blacklistTokenModel.findOne({
            token
        })

        if (isTokenBlacklisted) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = decoded

            next()

        } catch (err) {

            return res.status(401).json({
                message: "Invalid token."
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to authenticate user",
            error: error.message,
        });
    }
}

export default authUser;