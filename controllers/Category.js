const Category = require("../models/Category");

exports.createCategory=async(req,res)=>{
    try{

        const {categoryName,description}=req.body;

        if (!categoryName||!description){
            return res.status(400).json({
                    success:false,
                    message:"Please Provide All The Details"
            })
        }

        const categoryDetails=await Category.findOne({categoryName})

        if (categoryDetails){
            return res.status(400).json({
                success:false,
                message:"Category Already exists"
            })
        }
        
        const categoryResponse=await Category.create({categoryName,description:description})

        return res.status(200).json({
            success:true,
            message:"Category Created Successfully"
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating Category"
        })
    }
}

exports.getAllCategories=async(req,res)=>{

    try{

        const categories=await Category.find({},{categoryName:true,description:true})
        return res.status(200).json({
            success:true,
            message:"Successfully fetched All Categories",
            data:categories
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong While Fetching All Categories"
        })
    }
}
