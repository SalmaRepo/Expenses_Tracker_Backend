import {Schema,model} from "mongoose"

const userSchema=new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["admin","user"],default:"user"},
    expenses:[{type:Schema.Types.ObjectId,ref:"expense"}],
    incomes:[{type:Schema.Types.ObjectId,ref:"income"}],
    userImage:{type:String},
    /* isVerify: { type: Boolean, default: false },
    randomToken:{type:String} */
})

const User=model("users",userSchema);

export default User;