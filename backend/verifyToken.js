const jwt=require('jsonwebtoken')
require('dotenv').config();
const express=require('express')

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json("You are not authenticated")
    }
    jwt.verify(token,process.env.SECRET,async(err,data)=>{
        if(err){
            return res.status(403).json("Token invalid")
        }
        req.userId=data._id
        // console.log("hi")
        next()
    })
}

module.exports=verifyToken