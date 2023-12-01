const express=require("express");
const { signUp, login, sendOtp } = require("../controllers/Auth");
const { auth, isStudent } = require("../middleware/auth");
const { profile } = require("../controllers/Profile");
const router=express.Router();

router.post("/signUp",signUp);
router.post("/login",login);
router.get("/profile",auth,isStudent,profile);
router.post("/sendotp",sendOtp);

module.exports=router;