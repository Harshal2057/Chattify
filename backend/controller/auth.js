import User from "../models/User.js"
import bcrypt, { hash } from "bcrypt"


const signUp = async(req , res) =>{

    const saltRound = 10;

    try {
        
         const {name , email , password} = req.body;

         //Logic to check whether all fields are filled
    if (!name || !email || !password) {
        return res.status(400).json({
            success:false,
            message:"Please fill all the required fields !!"
        })
    }

    //Logic to check whether email is valid
    function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    }

    if (!isValidEmail) {
        return res.status(400).json({
            success:false,
            message:"Please enter a valid email address"
        })
    }

    //Logic to check whether emial is unique
    const user = await User.findOne({email})

    if (user) {
        return res.status(400).json({
            success:false,
            message:"Email already existed"
        })
    }

    //Logic to check whether password has more than 6 char
    if (password.length() < 6) {
        return res.status(400).json({
            success:false,
            message:"Password should have more than 6 charachters"
        })
    }

    //Logic to hash password
    const hashPassword = await bcrypt.hash(password , saltRound);
    console.log(`The hash password => ${hashPassword}`);
    

        
    } catch (error) {
        
    }

}