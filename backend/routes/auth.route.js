import express from "express"
import { userLogin, userSignUp } from "../controller/auth.controller.js"; 

const router = express.Router();

router.post(`/login`, userLogin)
router.post(`/signup`, userSignUp)

export {router as authRoutes}