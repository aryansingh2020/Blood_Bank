import mongoose from 'mongoose'

const donorSchema=new mongoose.Schema({
    name:{type:String, required:true},
    gender:{type:String, required:true},
    dob:{type:Date, required:true},
    bloodGroup:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    amount:{type:Number,required:true}
},
{
    timestamps:true
})

const Donor=mongoose.model('Donor',donorSchema)
export default Donor


