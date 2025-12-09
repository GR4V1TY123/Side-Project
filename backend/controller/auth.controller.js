import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateJWT = (user_id) => {
    const key = process.env.JWT_KEY
    const token = jwt.sign({user_id}, key)
    return token;
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        if (!user) {
            return res.status(404).json({ message: "User not found for the given email" })
        }

        // Compare hashed password
        const checkPassword = await bcrypt.compare(password, user.password,)

        if (!checkPassword) {
            return res.status(400).json({ message: "Email or password is Incorrect" })
        }

        // generate jwt token
        const token = generateJWT(user.user_id)

        return res.status(200).json({
            token,
            user: {
                user_id: user.user_id,
                email: user.email,
                name: user.name
            },
            message: "Login Successful!"
        })
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const userSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        })

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

        if (name.trim().length < 3) {
            return res.status(403).json({
                message: `Name must be atleast 3 characters`
            })
        }

        if (!emailRegex.test(email)) {
            return res.status(403).json({
                message: `Invalid Email`
            })
        }

        if (!passwordRegex.test(password)) {
            return res.status(403).json({
                message: "Password must be 8–32 chars, contain uppercase, lowercase, number and special character."
            })
        }

        // password Hashing
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })

        // generate jwt token
        const token = generateJWT(newUser.user_id)

        res.status(201).json({
            token,
            user: {
                user_id: newUser.user_id,
                name: newUser.name,
                email: newUser.email
            },
            message: "Sign Up Successful!"
        })

    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}