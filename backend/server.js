// const express=require('express')
import express from 'express'
import connectDb from './database/mongodb.js'
import {PORT} from "./config/env.js"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import seedBloodPackets from './utils/seedBloodPackets.js'

const app=express()
const port=PORT

//middleware
app.use(express.json())
//app.use(cors({origin:'http://localhost:3000'}))
app.use(cors({
  origin: "https://blood-bank-9gpy.onrender.com", // ✅ Frontend URL
  credentials: true,
}));
app.use(cookieParser())

//routes
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to the Blood Donation App")
})
app.listen(port,async()=>{
    await connectDb()
    console.log("Database connected successfully")
    await seedBloodPackets()
    console.log(`App running on port ${port}`)
})