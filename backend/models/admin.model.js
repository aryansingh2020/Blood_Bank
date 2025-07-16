import mongoose from "mongoose"

const adminSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true,"User name is required"],
        trim:true,
        minLength:3,
        maxLength:50,
    },
    email: {
    type: String,
    required: [true, 'User Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:[true,"User password is required"],
        minLength:6,
        trim:true,
    }
},{timestamps:true})

const Admin=mongoose.model("Admin",adminSchema)

export default Admin