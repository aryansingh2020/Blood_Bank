// const express=require('express')
import express from 'express'
// import Donor from './models/donor.js'
import connectDb from './config/db.js'
import createDonor from './controllers/createDonor.js'
import getAllDonors from './controllers/getAllDonors.js'
import deleteDonor from './controllers/deleteDonor.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app=express()
const port=5000

//middleware
app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))

//routes
app.delete('/api/donors/:id',deleteDonor)
app.post('/api/donors',createDonor);
app.get('/api/donors',getAllDonors);

//database connection
connectDb()
app.listen(port,()=>{
    console.log(`App running on port ${port}`)
})