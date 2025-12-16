import express from "express"
const router = express.Router();
import { addRide, fetchAllRides, fetchSingleRide } from "../controller/ride.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

router.get(`/api/v1/rides`, fetchAllRides)
router.post(`/api/v1/addRide`, verifyToken, addRide)
router.get(`/api/v1/rides/:id`, verifyToken, fetchSingleRide)

export {router as rideRoutes}