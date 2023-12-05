const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/user");

exports.createCourse=async(req,res)=>{

    try{

        const {courseName,courseDescription,price,category}=req.body;

        if (!courseName ||!courseDescription||!price||!category){
            return res.status(400).json({
                success:false,
                message:"Please Provide all The details to Create a Course"
            })        
        }

        const courseDetails=await Course.findOne({courseName})
        if (courseDetails){
            return res.status(400).json({
                success:false,
                message:"Course With Same name Already exists"
            })
        }

        const categoryDetails=await Category.findOne({categoryName:category})

        if (!categoryDetails){
            return res.status(400).json({
                success:false,
                message:"Category Doesnot Exists"
            })
        }

        const instructorDetails=req.user;

        const courseResponse=await Course.create({courseName,courseDescription,price,category:categoryDetails.id,instructor:instructorDetails.id})

        const instructorResponse=await User.findByIdAndUpdate(
            {
                _id:instructorDetails.id
            },
            {
                $push:{
                    courses:courseResponse._id,
                }
            },
            {
                new:true
            }
        ).populate("courses").exec()

        const categoryResponse=await Category.findByIdAndUpdate(
            {
                _id:categoryDetails.id
            },
            {
                $push:{
                    courses:courseResponse._id,
                }
            },
            {
                new:true
            }
        )
        return res.status(200).json({
            success:true,
            message:'Course Created Successfully',
            data:courseResponse,
            instructorResponse
        })
    }catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong While Creating Course"
        })
    }
}

exports.deleteCourse=async(req,res)=>{

    try{

        const {courseId}=req.body;

        if (!courseId){
            return res.status(400).json({
                success:fasle,
                message:"Please Provide Course Id to Delete The Course"
            })
        }

    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:fasle,
            message:"Internal Server Error"
        })
    }
}