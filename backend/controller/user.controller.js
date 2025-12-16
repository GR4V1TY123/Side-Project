import { prisma } from "../lib/prisma";

export const fetchUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { user_id: req.user_id }
        })
        if (!user) {
            res.status(404).json({
                message: "Profile not found"
            })
        }
        res.status(200).json({
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                created_at: user.created_at
            },
            message: "User found"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}