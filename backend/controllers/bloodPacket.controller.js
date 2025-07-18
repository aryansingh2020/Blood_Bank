import mongoose from "mongoose"
import BloodPacket from "../models/bloodPacket.model.js"

const getBloodData=async(req,res,next)=>{
    try{
        const bloodData=await BloodPacket.find()
        res.status(200).json({
            success:true,
            data:bloodData
        })
        console.log(bloodData)
    }catch(error)
    {
        res.status(500).json({
            success:false,
            message:"Failed to get blood data"
        })
    }
}
export default getBloodData