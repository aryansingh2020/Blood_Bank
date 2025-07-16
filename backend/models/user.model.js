import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{type:String, required:true},
    gender:{type:String, required:true},
    dob:{type:Date, required:true},
    userBloodGroup:{type:String, required:true},
    lastReceivedBloodGroup:{type:String, required:true,default:"N/A"},
    email:{type:String, required:true, unique:true},
    totalDonatedAmount:{type:Number,required:true,default:0},
    totalReceivedAmount:{type:Number,required:true,default:0}
},
{
    timestamps:true
})

const User=mongoose.model('User',userSchema)
export default User


