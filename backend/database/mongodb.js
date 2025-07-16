import mongoose from "mongoose"
import {MONGO_URI} from "../config/env.js"
const connectDb = async() => {
    try{
        //await mongoose.connect(process.env.MONGO_URI)
        await mongoose.connect(MONGO_URI)
        console.log("Database connected.")
    }catch(error){
        console.error('MongoDB Connection Error:', error.message);
        console.error('MongoDB Connection Error:', error.reason);
        process.exit(0);
    }    
}
 
export default connectDb