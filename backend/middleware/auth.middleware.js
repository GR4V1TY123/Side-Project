import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next) => {
    const token = await req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Access Denied"
        })
    }
    try {
        const key = process.env.JWT_KEY
        const decoded = jwt.verify(token, key);
        req.user_id = decoded.user_id
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            message: "Invalid token!"
        });

    }
}