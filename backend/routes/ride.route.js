import express from "express"
const router = express.Router();
import { addRide, fetchAllRides } from "../controller/ride.controller.js";

router.get(`/api/v1/rides`, fetchAllRides)
router.post(`/api/v1/addRide`, addRide)

export {router as rideRoutes}