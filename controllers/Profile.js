
exports.profile=async(req,res)=>{
    console.log("You have reached profile");
    return res.status(200).json({
        success:true,
        message:"You Have reached Profile Page"
    })
}