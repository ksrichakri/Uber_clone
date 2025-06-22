import { User } from "../models/user.model.js";


 const createUser = async(req,res) => {
    if(!firstname || !email || !password){
        throw new Error("All fields are required!!")
    }
    const user = User.create({
        fullname:{
            firstname,lastname
        },
        email,
        password
   
 }) 
 return user
}
 export {createUser} 
