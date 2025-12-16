import express from "express"
import { userLogin, userSignUp } from "../controller/auth.controller.js";
import { verifyToken } from './../middleware/auth.middleware.js';
import { prisma } from "../lib/prisma.js";

const router = express.Router();

router.post(`/login`, userLogin)
router.post(`/signup`, userSignUp)

export { router as authRoutes }