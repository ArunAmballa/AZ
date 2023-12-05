const express=require("express");
const { getAllCategories, createCategory } = require("../controllers/Category");
const { auth, isAdmin, isInstructor } = require("../middleware/auth");
const { createCourse } = require("../controllers/Course");
const router=express.Router()



router.get("/categories",auth,getAllCategories);
router.post("/createCategory",auth,isAdmin,createCategory)
router.post("/createCourse",auth,isInstructor,createCourse)

module.exports=router;