import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader) {
        return res.status(403).json({
            message: "Access Denied"
        })
    }
    try {
        const token = authHeader.split(' ')[1];
        const key = process.env.JWT_KEY
        const decoded = jwt.verify(token, key);
        req.user_id = decoded.user_id
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token!"
        });

    }
}