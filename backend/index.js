import express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"
import { rideRoutes } from "./routes/ride.route.js";
import { authRoutes } from "./routes/auth.route.js";
import { ApiRoutes } from "./routes/api.route.js";

const app = express();
dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use('/', rideRoutes)
app.use('/auth', authRoutes)
app.use('/thirdParty', ApiRoutes)

app.listen(3000, ()=> {
    console.log("Server started on port 3000.........")
})