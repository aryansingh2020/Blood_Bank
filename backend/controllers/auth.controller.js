import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp=async(req, res, next)=>{
    const session = await mongoose.startSession()
    session.startTransaction()

    try{
        const {name, email, password}=req.body

        //Check if the user already exists
        const existingAdmin=await Admin.findOne({email})
        if(existingAdmin){
            const error=new Error("Admin already exists")
            error.statusCode=409
            throw error
        }

        //Hash password
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newAdmins=await Admin.create([{name, email, password:hashedPassword}], {session})
        const token=jwt.sign({userId:newAdmins[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
        
        
        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            succes:true,
            message:"Admin created successfully",
            data:newAdmins[0]
        })

    }catch(error){
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signIn=async(req,res,next)=>{
    try{
        const {email, password}=req.body

        //Check if the admin exists
        const existingAdmin=await Admin.findOne({email})
        if(!existingAdmin){
            const error=new Error("Admin does not exist")
            error.statusCode=404
            throw error
        }
        //Check password
        const isPasswordValid=await bcrypt.compare(password,existingAdmin.password)
        if(!isPasswordValid){
            const error=new Error("Invalid password")
            error.statusCode=401
            throw error
        }
        //Provide JWT token
        const token=jwt.sign({userId:existingAdmin._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
        res.status(200).json({
            succes:true,
            token,
            existingAdmin,
        })
    }catch(error){
        next(error)
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ 
            success: true,
            message: "User signed out successfully"
        });
    } catch (error) {
        next(error);
    }              
}