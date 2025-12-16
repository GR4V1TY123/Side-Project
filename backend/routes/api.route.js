import express from "express"
import { geolocate, getRoute } from "../controller/api.controller.js";
import { verifyToken } from './../middleware/auth.middleware.js';
const router = express.Router();

router.post(`/api/v1/geolocate`, verifyToken, geolocate)
router.post(`/api/v1/route`, verifyToken, getRoute)

export { router as ApiRoutes }