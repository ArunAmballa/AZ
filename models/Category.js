const mongoose=require("mongoose")

const categorySchema=mongoose.Schema(
    {
        categoryName:{
            type:String,
        },
        courses:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course"
            }
        ],
        description:{
            type:String,
            required:true
        }
    }
)

module.exports=mongoose.model("Category",categorySchema)