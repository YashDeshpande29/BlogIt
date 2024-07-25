const express=require("express");
const router=express.Router()
const Post = require("../models/Post");
const verifyToken = require("../verifyToken");


//Create
router.post('/create', verifyToken, async (req, res) => {
  console.log('Request body:', req.body); // Log the incoming request body
  const sanitizedDescription = sanitizeHtml(description);

  try {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
  } catch (err) {
      console.error('Error saving post:', err); // Log any errors during post save

      // Respond with a detailed error message
      res.status(500).json({
          error: 'Error saving post',
          message: err.message,
          stack: err.stack,
      });
  }
});

// Update
router.put('/:id',verifyToken,async(req,res)=>{
    try{  
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Delete
router.delete('/:id',verifyToken,async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("Post deleted successfully")
    }
    catch(err){
        res.status(500).json(err)
    }
})



// GET posts with optional search filter by title
router.get('/', async (req, res) => {
  const { search } = req.query;
  
  try {
    let posts;
    
    // Define search filter if search parameter is provided
    if (search) {
      const searchFilter = {
        title: { $regex: search, $options: 'i' }
      };
      posts = await Post.find(searchFilter);
    } else {
      // Fetch all posts if no search parameter is provided
      posts = await Post.find();
    }
    
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




// Get user post
router.get('/user/:userId',async(req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})



module.exports=router