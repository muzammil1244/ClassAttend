import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const auth_middleware = (req, res, next) => {
    try {
        let token = req.headers?.authorization

        if (!token) {
            return res.status(401).json({ message: "Token not found" })
        }

        let filter_token = token.split(" ")[1]

        let decoded = jwt.verify(filter_token, process.env.JWT_key)

        // user detect
        if (decoded.roll_no) {
            req.user = {
                id: decoded.id,
                name: decoded.name,
                roll_no: decoded.roll_no,
                class_id: decoded.class_id
            }
        } else {
            req.user = {
                id: decoded.id,
                email: decoded.email
            }
        }

        next()

    } catch (err) {
        // 👇 YAHI TOKEN EXPIRE CASE HAI
        return res.status(401).json({
            message: "Token expired or invalid"
        })
    }
}