const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },

    comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the commenter
          },
          comment: {
            type: String,
            
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Users who liked the post
          },
        },
      ],
      views: {
        type: Number,
        default: 0, // To track how many times the post has been viewed
      },
      author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
      },
      category:{
type: String
      },
      images: {
        public_id: {
            type: String,
            
        },
        url: {
            type: String,
            
        },
    },
    },{timestamps:true});

    module.exports = mongoose.model('Blog',blogSchema);