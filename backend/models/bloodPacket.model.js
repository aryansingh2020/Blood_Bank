import mongoose from'mongoose'

const bloodPacketSchema=new mongoose.Schema({
    bloodGroup:{type:String,required:true},
    quantity:{type:Number,required:true,default:1000},
})

const BloodPacket=mongoose.model('BloodPacket',bloodPacketSchema)

export default BloodPacket