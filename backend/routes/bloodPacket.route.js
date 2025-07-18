import {Router} from "express"
import { authorize } from "../middlewares/auth.middleware.js"
import getBloodData from "../controllers/bloodPacket.controller.js"

const bloodPacketRouter=Router()

bloodPacketRouter.get("/",authorize,getBloodData)

export default bloodPacketRouter
