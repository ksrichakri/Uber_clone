import mongoose, { Schema } from "mongoose";

const blackListTokenSchema = new Schema({
    token : {
        type: String,
        required: true,
        unique : true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
})

export const BlackListToken = mongoose.model(
    "BlackListToken" , blackListTokenSchema
)