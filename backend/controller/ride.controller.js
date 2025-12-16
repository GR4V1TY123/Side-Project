import { prisma } from "../lib/prisma.js";

export const fetchAllRides = async (req, res) => {
    try {
        const rides = await prisma.rides.findMany({
            where: {status: "ACTIVE"}
        });
        return res.status(200).json(rides)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while fetching all rides"
        })
    }
}

export const addRide = async (req, res) => {
    try {
        const { dest_lat, dest_lng, destination, route, seats, distance, fare, status } = req.body
        const host_id = String(req.user_id);
        const source = {place_id:"245300820",licence:"https://locationiq.com/attribution",osm_type:"way",osm_id:"154837257",lat:"19.06394795",lon:"72.83579253728743",display_name:"TSEC College, 37th Road, Linking Road Shopping area, Bandra West, Zone 3, Mumbai, Mumbai Suburban, Maharashtra, 400050, India",address:{college:"TSEC College",road:"37th Road",neighbourhood:"Linking Road Shopping area",suburb:"Bandra West",city_district:"Zone 3",city:"Mumbai",state_district:"Mumbai Suburban",state:"Maharashtra",postcode:"400050",country:"India",country_code:"in"},boundingbox:["19.0638096","19.0640068","72.8355771","72.8360087"]}
        const newRide = await prisma.rides.create({
            data: {
                dest_lat, dest_lng, destination, route, seats, distance, fare, host_id, status, source
            }
        })
        return res.status(201).json({
            newRide,
            message: "Added Ride Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error while adding ride"
        })
    }
}

export const fetchSingleRide = async (req, res) => {
    try {
        const ride_id = req.params.id
        const ride = await prisma.rides.findUnique({
            where: {ride_id}
        })
        if(!ride){
            return res.status(404).json({
                message: "Ride not found"
            })
        }
        return res.status(200).json({
            ride
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error while fetching ride"
        })
    }
}
