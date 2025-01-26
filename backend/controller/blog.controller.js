const Blogs  = require('../models/blogs.model')
const {ErrorHandler} = require('../middleware/error')
const User = require('../models/auth.model')
const cloudinary = require('cloudinary').v2;
exports.createblog = async(req,res,next) =>{
    try{

        console.log('Request body:', req.body); // Log the request body
    console.log('Request files:', req.files); // Log the uploaded files

const{title,content,category} = req.body;
console.log(req.body);
if (!req.files || !req.files.images) {
    return res.status(400).json({ success: false, message: 'Image is required' });
  }
const {images} = req.files;
console.log('Uploaded files:', req.files);
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

// exports.likeblog = async(req,res,next) =>{
//     try{
//         const {id} = req.params;
//         const blog = await Blogs.findById(id);
//         const user = await User.findById(req.user._id);
//         const isLiked = blog.likes.includes(req.user._id);
//         if(isLiked){
//             blog.likes.pop(req.user._id); // Remove user ID from likes
//             await blog.save();

//             return res.status(200).json({
//                 success: true,
//                 message: "Blog disliked successfully",
//                 blog
//             });
//         }
//         else{
//         blog.likes.push(req.user._id);
//         await blog.save();
//         res.status(200).json({
//             success:true,
//             message:"Blog liked successfully",
//             blog
//         })
//     }
//     }catch(error){
//         return next(error);
//     }
// }

exports.likeblog = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;
  
      // Find the blog
      const blog = await Blogs.findById(id);
      console.log(blog);
  
      // Check if the user has already liked the blog
      const userIndex = blog.likes.indexOf(userId);
    //   console.log(userIndex);
  
      if (userIndex !== -1) {
        // User has already liked the blog, so remove their ID (dislike)
        blog.likes.splice(userIndex, 1); // Remove the user ID from the likes array
        await blog.save();
  
        return res.status(200).json({
          success: true,
          message: "Blog disliked successfully",
          blog,
        });
      } else {
        // User has not liked the blog, so add their ID (like)
        blog.likes.push(userId);
        await blog.save();
  
        return res.status(200).json({
          success: true,
          message: "Blog liked successfully",
          blog,
        });
      }
    } catch (error) {
      return next(error);
    }
  };

exports.commentblogs = async(req,res,next)=>{
    try{
const {id}= req.params;
const {comment} = req.body;
const blog = await Blogs.findById(id).populate({
    path: 'comments.user', // Populate the user field in comments
    select: 'name' // Select only the name field from the User model
});

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

const updatedBlog = await Blogs.findById(id).populate({
    path: 'comments.user',
    select: 'name'
});

res.status(200).json({
    success:true,
    message:"Comment added successfully",
    blog:updatedBlog
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

exports.getblogbyid = async(req,res,next) =>{
    try{
        const {id} = req.params;
        const blog = await Blogs.findById(id);
        res.status(200).json({
            success:true,
            message:"Blog fetched successfully",
            blog
        })
    }catch(error){
        return next(error);
    }
}