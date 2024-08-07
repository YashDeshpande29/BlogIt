const express=require("express");
const router=express.Router()
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");




//Create
router.post('/create',verifyToken,async(req,res)=>{
    try{
        const newComment =new Comment(req.body)
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)

    }
    catch(err){
        res.status(500).json(err)
    }
})

// Update
router.put('/:id',verifyToken,async(req,res)=>{
    try{  
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedComment)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Delete
router.delete('/:id',verifyToken,async (req,res)=>{
    try{
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("comment deleted successfully")
    }
    catch(err){
        res.status(500).json(err)
    }
})


// Get  post comment
router.get('/post/:postId',async(req,res)=>{
    try{
        const comments=await Comment.find({postId:req.params.postId})
        res.status(200).json(comments)
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