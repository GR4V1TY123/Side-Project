import { prisma } from "../lib/prisma.js";

export const fetchAllRides = async(req, res) => {
    try {
        const rides = await prisma.rides.findMany();
        return res.status(200).json(rides)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

export const addRide = async(req, res) => {
    try {
        const ride = req.body
        const newRide = await prisma.rides.create({
            data: ride
        })
        return res.status(201).send("Added Ride Successfully");
    } catch (e) {
        return res.status(500).json({ e })
    }
}
