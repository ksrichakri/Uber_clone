import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { BlackListToken } from "../models/blackListToken.model.js";


const authUser = asyncHandler(async(req,res,next)=>{
const token = req.cookies?.token || req.header.authorization.split(" ")[1];

if(!token){
    throw new ApiError(401,"Unauthorized access")
}

const isBlackListed = await BlackListToken.findOne({token})
     if(isBlackListed){
        throw new ApiError(401, "Unauthoried access - Token Blacklisted")
     }

try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    const user = await User.findById(decoded._id)
    req.user =user

    return next()
} catch (error) {
    throw new ApiError(401 , "Unauthorized access")
}
}) 
export {authUser}