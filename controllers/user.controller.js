import { User  } from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { createUser } from "../service/user.service.js";
import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"


const registerUser = asyncHandler(async(req , res)=>{
     const err = validationResult(req)

     if(!err.isEmpty()){
        return res.status(400).json({err: err.array()})
     }

     const {fullName, email , password} = req.body
     const existingUser  = await User.findOne({
        $or:[{ email }]
    })

     if(existingUser){
        throw new ApiError(409 , "User with this email already exists")
     }
     
     const user = await User.create({
        fullName: {
            firstName:fullName.firstName,
            lastName:fullName.lastName
        },email,password
     })

     const createdUser = await User.findById(user._id)

     if(!createdUser){
        throw new ApiError(501 , "Something went wrong while registering user")
     }

     const token = createdUser.generateAuthToken()
     return res.status(201).json(new ApiResponse(200,{registerUser,token}, "User registerd succesfully"))

     
})

export {registerUser}