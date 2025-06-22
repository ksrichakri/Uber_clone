import mongoose from "mongoose";

const connectDb = async () =>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MongoDb connected! :",conn.connection.host);
        
        
    } catch (error) {
        console.log("MongoDB connection failed , Error: ",error);
        console.log("Mongo URI:", process.env.MONGODB_URI);
        process.exit(1)
    }
}

export default connectDb