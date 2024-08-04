const mongoose = require('mongoose');
const express = require('express');
const cors=require('cors')
const app = express();
require('dotenv').config();
const port = parseInt(process.env.PORT);
const multer=require('multer')
const cookieParser=require('cookie-parser')
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const postRoute=require("./routes/posts")
const commentRoute=require("./routes/comments")
const path=require('path')

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"https://blogit-1-63di.onrender.com",credentials:true}))


app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/comments',commentRoute)
app.use("/images",express.static(path.join(__dirname,"/images")))


const connectDB = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
};

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
 


app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})

app.listen(port, (err) => {
    if (err) {
        console.error("Failed to start server:", err);
        return;
    }
    console.log(`Server connected on port ${port}`);
    connectDB();
});
