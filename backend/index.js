import express from "express"

const app = express();

app.use(express.json())

app.get("/login", (req,res)=>{
    res.status(200).send("yo")
})

app.listen(3000, ()=> {
    console.log("Server started on port 3000.........")
})