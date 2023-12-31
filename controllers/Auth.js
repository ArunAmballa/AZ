const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Otp = require("../models/Otp");
const otpGenerator=require("otp-generator")

exports.signUp=async(req,res)=>{

    try{
        const {firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body;
    
        // If Any of the input Field is Empty
        if (!firstName ||!lastName||!email||!password||!confirmPassword||!accountType||!otp){
            return res.status(400).json({
                success:false,
                message:"Enter All the Details"
            })
        }
        // Check if Both passwords match
        if (password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not Match"
            })
        }
    
        //Check if user already Exists
    
        const user=await User.findOne({email})
    
        if (user)
        {
            return res.status(401).json({
                success:false,
                message:"User with Same Email Id Already Exists Please Choose Other Email to Sibngup"
            })
        }

        // Otp verification
        const response=await Otp.findOne({email});

        if (!response)
        {
            return res.status(401).json({
                success:false,
                message:"Cannot Send Otp"
            })
        }

        if(otp!==response.otp)
        {
            return res.status(401).json({
                success:false,
                message:"Otp Doesnot match"
            })
        }
    
        //Encrypt The Password
    
        const hashedPassword=await bcrypt.hash(password,10);
    
        //Save User Details to DB
    
        const userDetails=await User.create({firstName,lastName,password:hashedPassword,email,accountType});

        //Send a Success response
        return res.status(200).json({
            success:true,
            message:"User Created Successfully",
            data:userDetails,
        })

    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went Wrong while SigningUp"
        });
    }
}

exports.login=async(req,res)=>{

    try{

        const {email,password}=req.body;

        //Validation
        if (!email ||!password){
            return res.status(400).json({
                success:false,
                message:"Please Provide All the Details"
            })
        }

        //Check if There is a User With the Provided Email
        
        const user=await User.findOne({email});

        if (!user){
            return res.status(401).json({
                success:false,
                message:"User Does not Exist"
            })
        }

        //Compare the Passwords
        if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);
            const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
        }else{
            return res.status(401).json({
                success:false,
                message:"Passwords Do not Match"
            })
        }
        
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to Login Please Try Again"
        })
    }
}

exports.sendOtp=async(req,res)=>{

    try{

        const {email}=req.body;

        if (!email)
        {
            return res.status(400).json({
                success:false,
                message:"Please Provide All Details to Send OTP"
            })
        }

        const userDetails=await User.findOne({email})

        if (userDetails)
        {
            return res.status(401).json({
                success:false,
                message:"User Already Exists"
            })
        }

        var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		const result = await Otp.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}

        const otpResponse=await Otp.create({otp,email});

        return res.status(200).json({
            success:true,
            message:"Otp Sent Successfully",
            data:otp,

        })

    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong While Sending OTP"
        })
    }
}