const express=require("express");
const router=express.Router()
const User=require("../models/User")
const bcrypt=require('bcrypt');
const Post = require("../models/Post");
const Comment=require("../models/Comment");
const verifyToken = require("../verifyToken");

// Update
router.put('/:id',verifyToken,async(req,res)=>{
    try{
        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)

    }
    catch(err){
        res.status(500).json(err)
    }
})

//Delete
router.delete('/:id',verifyToken,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User deleted successfully")


    }
    catch(err){
        res.status(500).json(err)
    }
})
//Get users
router.get('/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Or use '*' to allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    // Your function logic
    res.json({ message: 'This is CORS-enabled for the specified origin!' });
  };

module.exports=router