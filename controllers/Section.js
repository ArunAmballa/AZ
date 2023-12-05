
exports.createSection=async(req,res)=>{

    try{

        const {sectionName,courseId}=req.body;

        if (!sectionName || !courseId){
            return res.status(400).json(
                {
                    success:false,
                    message:"Please Provide All the Details to create Section"
                }
            )
        }

        const sectionDetails=await Section.find({sectionName});

        if (sectionDetails){
            return res.status(400).json({
                success:false,
                message:"Section Already Exists"
            })
        }

        const sectionResponse=await Section.create({sectionName});
        const updatedCourse=await Course.find({courseId},
            {
                $push:{
                    courseContent:sectionResponse._id
                },
            },{new:true})

        return res.status(200).json({
            success:true,
            message:"Section Created Successfully"
        })
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong While creating Sections"
        })
    }
}