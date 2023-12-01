const mongoose=require("mongoose");

const otpSchema=mongoose.Schema(
    {
        otp:{
            type:String,
            required:true
        },
        email:{
            type:String
        },
        createdAt:{
            type:Date,
            default:Date.now,
            expires:60*5,
        }
    }
)
otpSchema.post("save",function(doc,next)
         {
            console.log(doc.otp);
            next();
        }

        )
module.exports=mongoose.model("Otp",otpSchema);
