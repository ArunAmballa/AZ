const mongoose=require("mongoose");

const subSectionSchema=mongoose.Schema(
    {
        subSectionName:{
            type:String
        },
        videourl:{
            type:String
        }
    }
)
module.exports=mongoose.model('SubSection',subSectionSchema);