import {Router} from "express"
import {register, donateBlood, receiveBlood, updateUser, deleteUser, getUser} from "../controllers/user.controller.js"
import {authorize} from "../middlewares/auth.middleware.js"

const userRouter=Router()

userRouter.post("/register",authorize,register)
userRouter.put("/donate",authorize,donateBlood)
userRouter.put("/receive",authorize,receiveBlood)
userRouter.put("/update",authorize,updateUser)
userRouter.delete("/delete",authorize,deleteUser)
userRouter.get("/get-user",authorize,getUser)


export default userRouter