const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            maxLength:50,
            trim:true,
        },
        lastName:{
            type:String,
            required:true,
            maxLength:50,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            maxLength:50,
            trim:true,
        },
        password:{
            type:String,
            required:true,
        },
        accountType:{
            type:String,
            enum:["Student","Instructor"],
            required:true,
        }
    }

);

module.exports=mongoose.model("User",userSchema);