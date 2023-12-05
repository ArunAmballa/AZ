const mongoose=require("mongoose")

const courseSchema=mongoose.Schema(
    {
        courseName:{
            type:String,
            required:true
        },
        courseDescription:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        studentsEnrolled:
        [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ],
        courseContent:
        [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Section"
            }
        ],
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        ratingAndreviwes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Rating"
            }
        ]
     }
)

module.exports=mongoose.model("Course",courseSchema);