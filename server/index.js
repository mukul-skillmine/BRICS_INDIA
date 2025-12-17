import express from "express"
import dotenv from 'dotenv';
import connectDB from "./config/database.js";
import authRouter from "./routers/authRouter.js";



dotenv.config();
const PORT = process.env.PORT || 3000
const app = express();
connectDB();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Server run on port ",PORT)
})
app.use("/api/v1/brics/auth",authRouter)

app.listen(PORT,()=>{
    console.log('server start on ',PORT)
})


