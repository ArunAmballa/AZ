const express=require("express");
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const app=express();
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());

const authRoutes=require("./routes/authRoutes")
const courseRoutes=require("./routes/courseRoutes")
const PORT=process.env.PORT

dbConnect();

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/course",courseRoutes);

app.listen(PORT,()=>{
    console.log(`Backend Application Successfully runnning on PORT ${PORT}`);
})
app.get("/",(req,res)=>{
    res.send("Hello Welcome to Authentication and Authorization Mastering");
})