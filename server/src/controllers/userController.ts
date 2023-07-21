import { Request, Response } from 'express';
import UserInstance from '../models/userModel';
import { GenerateSalt, GeneratePassword, registerSchema, loginSchema, option } from '../utils/utility';


export const signup = async (req: Request, res: Response) => {
    try{
    const { email, password, confirmPassword } = req.body;

    const validateInput = registerSchema.validate(req.body, option);
    if(validateInput.error){
        return res.status(400).json({
            Error: validateInput.error.details[0].message
        })
    }

    //Generate salt 
    const salt = await GenerateSalt() 

    //Generate password
    const userPassword = await GeneratePassword(password, salt)
   
    //check if the user exist
    const userExist = await UserInstance.findOne({email: email});  

    if(!userExist){
        const user = await UserInstance.create({
           
            email: email,
            password: userPassword,
            salt: salt
        })
        
        return res.status(201).json({
            Message: "Created successfully",
            user
        })
    }
     return res.status(400).json({
            Error: "Invalid email or password"
        })
    }catch(error){
        console.log(error)
       return res.status(500).json({
            Error: "Internal Server Error"

        })
    }


   
}

export const login = async (req: Request, res: Response) => {
    try{
    const { email, password } = req.body;

    const validateInput = loginSchema.validate(req.body, option);
    if(validateInput.error){
        return res.status(400).json({
            Error: validateInput.error.details[0].message
        })
    }

    //check if the user exist
    const userExist = await UserInstance.findOne({email: email});  

    if(userExist){
        const userPassword = await GeneratePassword(password, userExist.salt)
        if(userPassword === userExist.password){
            return res.status(200).json({
                Message: "Logged in successfully",
                userExist
            })
        }
        return res.status(400).json({
            Error: "Invalid Credentials"
        })
    }
     return res.status(400).json({
            Error: "User does not exist"
        })
    }catch(error){
        console.log(error)
      return  res.status(500).json({
            Error: "Internal Server Error"

        })
    }
}