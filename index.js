import dotenv from "dotenv"
dotenv.config()
import connectDb from "./db/index.js";
import {app} from "./app.js"



connectDb().then(()=>{
    app.on("Error",(error)=>{
        console.log("Error:",error);
        throw error 
    })

    app.listen(process.env.PORT || 8000,()=>{
        console.log("Server is running on port : ",process.env.PORT );
        
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed , Error: ",err);
    
})