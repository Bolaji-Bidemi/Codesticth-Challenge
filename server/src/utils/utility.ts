import Joi from 'joi';  
import bcrypt from 'bcrypt';

export const registerSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).label('Confirm Password').messages({'any.only': '{{#label}} does not match'})
})

export const option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ""
        }
    }
}


export const GenerateSalt = async() =>{
   return await bcrypt.genSalt();
    
} 

export const GeneratePassword = async(password:string, salt:string ) => {
    return await bcrypt.hash(password, salt);
}

export const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
})