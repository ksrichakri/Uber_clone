import { User  } from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { createUser } from "../service/user.service.js";
import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import { BlackListToken } from "../models/blackListToken.model.js";

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
     return res.status(201).json(new ApiResponse(200,{registerUser,token}, "User registered succesfully"))
     
})


const loginUser = asyncHandler(async(req,res) =>{
    
    const {email , password} = req.body

    if(!email || !password){
        throw new ApiError(400 , "Email and password are required")
    }
    const user = await User.findOne({email}).select("+password")

    if(!user){
        throw new ApiError(400 , "User doesnt exist")
    }

    const passCheck  = await user.isPasswordCorrect(password)

    if(!passCheck){
        throw new ApiError(401 , "Invalid password")
    }

    const token = user.generateAuthToken()

    res.cookie('token',token)

    return res.status(200).json(new ApiResponse(401,{user,token}, "User logged in succesfully"))


})

const getUserProfile = asyncHandler(async(req , res) =>{
    return res.status(200).json(new ApiResponse(200, { user: req.user }))

})
const logOutUser = asyncHandler(async(req,res,next) =>{
    res.clearCookie('token')
    const token = req.cookies?.token || req.header.authorization.split(" ")[1];
     await BlackListToken.create({token})

     return res.status(200).json({message: "Logged Out Successfully!"})

})
export {registerUser , loginUser , logOutUser , getUserProfile}