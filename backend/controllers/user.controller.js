import mongoose from "mongoose"
import User from "../models/user.model.js"
import BloodPacket from "../models/bloodPacket.model.js"


export const register = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const {
            name,
            gender,
            dob,
            email,
            bloodGroup
        } = req.body

        //Check if the user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const error = new Error("User already exists")
            error.statusCode = 409
            throw error
        }

        //Add new user to database or update the existing user details
        const newUsers = await User.create(
            [{
                name:name, gender:gender, dob:dob, email:email, userBloodGroup:bloodGroup
            }],
            { session })
        await session.commitTransaction()
        session.endSession()
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUsers[0]
        })

    } catch (error) {
        session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const donateBlood = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const { email, dob, donatedAmount } = req.body
        const existingUser = await User.findOne({ email, dob })
        console.log("Existing User:", existingUser)
        
        if (!existingUser) {
            const error = new Error("User does not exist or invalid details")
            error.statusCode = 404
            console.log("Existing User:", existingUser)
            throw error
        }
        const bloodPacket = await BloodPacket.findOne({ bloodGroup: existingUser.userBloodGroup })
        console.log("Blood Packet:", bloodPacket)
        if ( !bloodPacket || donatedAmount< 300) {
            const error = new Error("Insufficient donation amount. Enter amount greater than 300 ml")
            error.statusCode = 400
            throw error
        }

        //Update user's donation details
        const donorDetails = await User.findOneAndUpdate(
            { email: email },  //user for filtering
            {
                $inc: {
                    totalDonatedAmount: donatedAmount, //increment donated amount
                }
            },
            { new: true }  // returns updated document
        );
        //Update blood packet quantity
        const updatedBloodPacket = await BloodPacket.findOneAndUpdate(
            { bloodGroup: existingUser.userBloodGroup },
            {
                $inc: {
                    quantity: donatedAmount // increment quantity
                }
            },
            { new: true }
        )

        //Commit the transaction
        await session.commitTransaction()
        session.endSession()
        res.status(200).json({
            success: true,
            data: donorDetails,
            message: "Blood donated successfully",
        })

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const receiveBlood = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const { email, dob, receivedAmount, receivedBloodGroup } = req.body
        const existingUser = await User.findOne({ email, dob })
        const bloodPacket = await BloodPacket.findOne({ bloodGroup:receivedBloodGroup })
        if (!existingUser) {
            const error = new Error("User does not exist or invalid details")
            error.statusCode = 404
            throw error
        }
        if (!bloodPacket || bloodPacket.quantity < receivedAmount) {
            const error = new Error("Insufficient blood available")
            error.statusCode = 400
            throw Error
        }
        //Update user's blood receiving details
        const receiverDetails = await User.findOneAndUpdate(
            { email: email },  //user for filtering
            {
                $set: {
                    lastReceivedBloodGroup: receivedBloodGroup
                },
                $inc: {
                    totalReceivedAmount: receivedAmount, //increment received amount
                }   
            },
            { new: true }  // returns updated document  
        )

        //Update blood packet quantity
        const updatedBloodPacket = await BloodPacket.findOneAndUpdate(
            { bloodGroup: receivedBloodGroup },
            {
                $inc: {
                    quantity: -receivedAmount,// decrement quantity
                }
            },
            { new: true },
        )
        await session.commitTransaction()
        session.endSession()
        res.status(200).json({
            success: true,
            data: receiverDetails,
            message: "Blood received successfully"
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const { email, dob, newName, newGender,newDob, newEmail} = req.body

        const existingUser = await User.findOne({ email, dob })
        if (!existingUser) {
            const error = new Error("User does not exist or invalid details")
            error.statusCode = 404
            throw error
        }

        //Update user details if valid email and dob is entered
        const updatedUser = await User.findOneAndUpdate(
            { email: `${email}` },
            {
                $set: {
                    name: newName,
                    gender: newGender,
                    dob: newDob,
                    email: newEmail,
                }
            },
            { new: true }   //returns updated document
        )
        await session.commitTransaction()
        session.endSession()
        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User details updated successfully",
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const { email, dob } = req.query

        const existingUser = await User.findOne({ email, dob })
        if (!existingUser) {
            const error = new Error("User does not exist or invalid details")
            error.statusCode = 404
            throw error
        }

        //Delete user from database
        await User.deleteOne({ email })
        await session.commitTransaction()
        session.endSession()
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { email, dob } = req.query
        console.log(email,dob)
        const existingUser = await User.findOne({ email,dob})
        console.log("Existing User:", existingUser)
        if (!existingUser) {
            const error = new Error("User does not exist or invalid details")
            error.statusCode = 404
            throw error
        }

        //Find user details
        res.status(200).json({
            success: true,
            data: existingUser,
            message: "User found successfully"
        })
    } catch (error) {
        next(error)
    }
}