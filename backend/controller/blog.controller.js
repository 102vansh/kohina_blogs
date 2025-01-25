const Blogs  = require('../models/blogs.model')
const {ErrorHandler} = require('../middleware/error')
const User = require('../models/auth.model')
const cloudinary = require('cloudinary').v2;
exports.createblog = async(req,res,next) =>{
    try{
const{title,content,category} = req.body;
const {images} = req.files;
if(!title || !content){
    return res.status(400).json({message: 'All fields are required'});
}

const cloudinaryResponse = await cloudinary.uploader.upload(
    images.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error:",
      cloudinaryResponse.error || "Unknown cloudinary error!"
    );
  }
const blog = await Blogs.create({title,content,category,author:req.user._id,
    images: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      }
});
res.status(201).json({
    success:true,
    message:"Blog created successfully",
    blog
    })
    }catch(error){
        return next(error);
    }
}
exports.getallblogs = async(req,res,next) =>{
    try{
        const blogs = await Blogs.find();
        res.status(200).json({
            success:true,
            message:"All blogs fetched successfully",
            blogs
        })
    }catch(error){
        return next(error);
    }
}
exports.myblogs = async(req,res,next) =>{
    try{
        const blogs = await Blogs.find({author:req.user._id});
        res.status(200).json({
            success:true,
            message:"My blogs fetched successfully",
            blogs
        })
    }catch(error){
        return next(error);
    }
}
exports.updateblog = async(req,res,next) =>{
    try{
        const {id} = req.params;
        const blog = await Blogs.findByIdAndUpdate(id,req.body,{new:true});
        res.status(201).json({
            success:true,
            message:"Blog updated successfully",
            blog
        })
    }
        catch(error){
        return next(error);
    }
}

exports.deleteblog = async(req,res,next) =>{
    try{
        const {id} = req.params;
        const blog = await Blogs.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Blog deleted successfully",
            blog
        })
    }catch(error){
        return next(error);
    }
}

exports.likeblog = async(req,res,next) =>{
    try{
        const {id} = req.params;
        const blog = await Blogs.findById(id);
        const user = await User.findById(req.user._id);
        const isLiked = blog.likes.includes(req.user._id);
        if(isLiked){
            blog.likes.pop(req.user._id); // Remove user ID from likes
            await blog.save();

            return res.status(200).json({
                success: true,
                message: "Blog disliked successfully",
                blog
            });
        }
        else{
        blog.likes.push(req.user._id);
        await blog.save();
        res.status(200).json({
            success:true,
            message:"Blog liked successfully",
            blog
        })
    }
    }catch(error){
        return next(error);
    }
}

exports.commentblogs = async(req,res,next)=>{
    try{
const {id}= req.params;
const {comment} = req.body;
const blog = await Blogs.findById(id);
if(!blog){
res.status(404).json({
    success:false,
    message:"Blog not found"
})
}
const coment = {
    user:req.user._id,
    comment
}



console.log(coment);
blog.comments.push(coment);
await blog.save();

res.status(200).json({
    success:true,
    message:"Comment added successfully",
    blog
    })
    }catch(error){
return next(error);
    }
}

exports.incrementViewCount = async (req, res) => {
    const { id } = req.params; // Blog post ID from the route parameter
  
    try {
      // Find the blog by ID and increment the view count
      const blog = await Blogs.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } }, // Increment the `views` field by 1
        { new: true } // Return the updated document
      );
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      res.status(200).json({ message: 'View count updated', blog });
    } catch (error) {
      console.error('Error updating view count:', error);
      res.status(500).json({ message: 'Failed to update view count', error: error.message });
    }
  };

