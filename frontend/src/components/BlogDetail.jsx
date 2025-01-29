

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaComment, FaEye, FaEdit, FaTrash, FaShare, FaBookmark } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';
import CommentSection from './CommentSection';
import Getlike from './Getlike';


const BlogDetail = ({ blog }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const[likes,setLikes] = useState([])
  
  const navigate  = useNavigate()
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleLike = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/blog/likeblog/${blog._id}`,
        {},
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };
  const getLike = async() =>{
    try{
const response  = await axios.get(`https://kohina-blogs.onrender.com/api/v1/blog/getlike/${blog._id}`,{withCredentials:true})
console.log(response.data)
setLikes(response.data.likes)
console.log(likes)

    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
getLike()
  },[])

  const handleDelete = async () => {
    try {
      await axios.delete(`https://kohina-blogs.onrender.com/api/v1/blog/deleteblog/${blog._id}`, {
        withCredentials: true,
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
    const response  =  await axios.post(
        `https://kohina-blogs.onrender.com/api/v1/blog/commentblog/${blog._id}`,
        { comment },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      window.location.reload();
    
      console(response.data.blog)
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            Blog
          </Link>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaBookmark className="text-gray-600 text-xl" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaShare className="text-gray-600 text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Author Section */}
          <div className="p-4 flex items-center justify-between border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-600">
                  {blog?.author?.name[0]|| 'A'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{blog?.author.name|| 'Anonymous'}</p>
                <p className="text-sm text-gray-500">Posted on {new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to={`/updateblog/${blog._id}`}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaEdit className="text-gray-600 text-xl" />
              </Link>
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTrash className="text-gray-600 text-xl" />
              </button>
            </div>
          </div>

          {/* Image Section */}
          {blog.images?.url && (
            <div className="relative">
              <img
                src={blog.images.url}
                alt={blog.title}
                className="w-full max-h-[600px] object-cover cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              />
            </div>
          )}

          {/* Content Section */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h1>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {blog.category}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{blog.content}</p>
          </div>

          {/* Engagement Section */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                <button
                  // onClick={getLike}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                   <Heart className="w-5 h-5" />
                  <span>{blog.likes.length}</span>
                </button>
                <button
                  onClick={() => setIsCommentModalOpen(true)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FaComment />
                  <span>{blog.comments.length}</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaEye />
                  <span>{blog.views}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Add a Comment</h2>
            </div>
            <form onSubmit={handleCommentSubmit} className="p-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="4"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsCommentModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setIsImageModalOpen(false)}
        >
          <img
            src={blog.images.url}
            alt={blog.title}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
      {/* <CommentSection result = {result}/> */}
      <Getlike likes={likes}/>
    </div>
  );
};

export default BlogDetail;

