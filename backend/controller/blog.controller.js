const Blogs  = require('../models/blogs.model')
const {ErrorHandler} = require('../middleware/error')
const User = require('../models/auth.model');

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
        const blogs = await Blogs.find().populate({
          path: 'author',
          select: 'name email'
        });
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

// exports.likeblog = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const userId = req.user._id;
//   const blog  = await Blogs.findById(id).populate({
//     path: 'likes',
//     select: 'name' 
//   })
//       // Find the blog
//       if(blog.likes.includes(userId)){
//         const index = blog.likes.indexOf(userId)
//         blog.likes.splice(index,1)
//         await blog.save()
//         return res.status(201).json({
//           success:true,
//           message: "blog is unliked",
//           blog
//         })
//       }else{

//       blog.likes.push(userId)
//       await blog.save()
//       return res.status(201).json({
//         success:true,
//         message: "liked successful",
//         blog
//       })
//     }
//     } catch (error) {
//       return next(error);
//     }
//   };


exports.likeblog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // First find the blog
    let blog = await Blogs.findById(id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    // Handle like/unlike
    if (blog.likes.includes(userId)) {
      const index = blog.likes.indexOf(userId);
      blog.likes.splice(index, 1);
    } else {
      blog.likes.push(userId);
    }
    
    // Save the blog
    await blog.save();
    
    // Fetch the updated blog with populated likes
    const updatedBlog = await Blogs.findById(id)
      .populate({
        path: 'likes',
        select: 'name email' // Select the fields you want from the User model
      })
      .populate({
        path: 'comments.user',
        select: 'name email'
      });

    return res.status(201).json({
      success: true,
      message: blog.likes.includes(userId) ? "liked successful" : "blog is unliked",
      blog: updatedBlog
    });

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
    blog:updatedBlog.comments
    })
    console.log(updatedBlog)
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
        const blog = await Blogs.findById(id).populate({ path: 'author',
          select: 'name email'
        });
        res.status(200).json({
            success:true,
            message:"Blog fetched successfully",
            blog
        })
    }catch(error){
        return next(error);
    }
}

 // Adjust the path as necessary

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params; // Blog ID from the URL
    const blog = await Blogs.findById(id); // Find the blog by ID

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const { commentId } = req.body; // Comment ID from the request body
    const comment = blog.comments.find(comment => comment._id.toString() === commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check if the user is authorized to delete the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Remove the comment from the blog's comments array
    blog.comments = blog.comments.filter(comment => comment._id.toString() !== commentId);

    // Save the updated blog document
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      blog,
    });
  } catch (error) {
    return next(error);
  }
};


exports.getCommentsController = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the blog ID from the request parameters

    // Find the blog and populate the comments.user field
    const blog = await Blogs.findById(id).populate({
      path: 'comments.user',
      select: 'name email', // Select the fields you want to populate
    });

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Extract the comments from the blog
    const comments = blog.comments;

    // Return the comments in the response
    return res.status(200).json({
      success: true,
      message: 'Comments fetched successfully',
      comments,
    });
  } catch (error) {
    return next(error);
  }
};



// exports.getLikesController = async (req, res, next) => {
//   try {
//     const { id } = req.params; // Get the blog ID from the request parameters

//     // Find the blog and populate the likes.user field
//     const blog = await Blogs.findById(id).populate({
//       path: 'likes.user',
//       select: 'name email', // Select the fields you want to populate
//     });

//     // Check if the blog exists
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found',
//       });
//     }

//     // Extract the likes from the blog
//     const likes = blog.likes.map(like => ({
//       _id: like._id,
//       user: like.user ? {
//         _id: like.user._id,
//         name: like.user.name,
//         email: like.user.email
//       } : null
//     }));

//     // Return the likes in the response
//     return res.status(200).json({
//       success: true,
//       message: 'Likes fetched successfully',
//       likes
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// exports.getLikesController = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Finding blog with ID:', id);

//     const blog = await Blogs.findById(id)
//       .populate({
//         path: 'likes',
//         select: 'name email'
//       });

//     console.log('Found blog:', blog);
//     console.log('Raw likes array:', blog.likes);
    
//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: 'Blog not found',
//       });
//     }

//     // Check if likes array exists and has items
//     if (!blog.likes || blog.likes.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: 'No likes found',
//         likes: [],
//         totalLikes: 0
//       });
//     }

//     // Log each like object to see what data we have
//     blog.likes.forEach((like, index) => {
//       console.log(`Like ${index}:`, {
//         likeId: like._id,
//         userId: like.user ? like.user._id : 'No user ID',
//         userData: like.user
//       });
//     });

//     const formattedLikes = blog.likes.map(like => ({
//       _id: like._id,
//       user: like.user ? {
//         _id: like.user._id,
//         name: like.user.name,
//         email: like.user.email
//       } : null
//     }));

//     return res.status(200).json({
//       success: true,
//       message: 'Likes fetched successfully',
//       likes: formattedLikes,
//       totalLikes: formattedLikes.length
//     });

//   } catch (error) {
//     console.error('Error in getLikesController:', error);
//     return next(error);
//   }
// };

exports.getLikesController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // First find the blog and then populate the likes field by looking up User model
    const blog = await Blogs.findById(id).populate({
      path: 'likes',
      model: 'User',  // Explicitly specify the model
      select: 'name email' // Select only the fields we need
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // If no likes, return empty array
    if (!blog.likes || blog.likes.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No likes found',
        likes: [],
        totalLikes: 0
      });
    }

    // Format the likes array to include user details
    const formattedLikes = blog.likes.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email
    }));

    return res.status(200).json({
      success: true,
      message: 'Likes fetched successfully',
      likes: formattedLikes,
      totalLikes: formattedLikes.length
    });

  } catch (error) {
    console.error('Error in getLikesController:', error);
    return next(error);
  }
};