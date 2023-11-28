const jwt=require("jsonwebtoken")
exports.auth=async(req,res,next)=>{

    try{

        const token=req.cookies.token;
        console.log(token);

        if (!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing"
            })
        }
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();

    }catch(error){
        return res.status(500).josn({
            success:false,
            message:"Something Went Wrong while Validating Token"
        })
    }  
}
exports.isStudent=async(req,res,next)=>{

    try{

        if (req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This sis a Protected Route for Student"
            })
        }
        next();

    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went Wrong while Authorizig"
        })
    }
}

exports.isInstructor=async(req,res,next)=>{

    try{

        if (req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This sis a Protected Route for Instructor"
            })
        }
        next();

    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went Wrong while Authorizig"
        })
    }
    next();
}