import express from "express"
import { rideRoutes } from "./routes/ride.route.js";
import { authRoutes } from "./routes/auth.route.js";

const app = express();

app.use(express.json())

app.use('/', rideRoutes)
app.use('/auth', authRoutes)

app.get("/login", (req,res)=>{
    res.status(200).send("yo")
})

app.listen(3000, ()=> {
    console.log("Server started on port 3000.........")
})