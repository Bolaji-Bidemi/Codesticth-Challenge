import mongoose,{Schema, model} from "mongoose";
export interface UserInstance{
   
    email:string,
    password:string,
    salt:string
}
const userSchema = new Schema({
    
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:[true, 'Email already exists']
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    salt:{
        type:String,
      
    }
},
{
    timestamps:true
})

const User = mongoose.model<UserInstance>('User', userSchema);

export default User;    