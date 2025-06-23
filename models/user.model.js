import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema({
    fullName:{
        firstName:{
            type:  String,
            required: true,
            minlength: [3,"Atleast 3 character are required"]
        },
        lastName:{
            type: String,

        }
    },
    email : {
        type: String,
        required : true,
        unique:true,
        minlength:[5, "The email should be atleast 5 characters long"]
    },
    socketId: {
        type: String
    },
    password:{
        type: String,
        required: true
    }
})

userSchema.methods.generateAuthToken = function() {
    const token =  jwt.sign({_id:this._id} , process.env.JWT_SECRET , {expiresIn : "24h" })
    return token
}

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next()

    this.password  = await bcrypt.hash(this.password ,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password)  {
    return await bcrypt.compare(password , this.password)
}


export const User = mongoose.model("User",userSchema)