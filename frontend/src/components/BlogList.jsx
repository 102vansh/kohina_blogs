

import React from 'react';
import { Heart, MessageCircle, Eye, Share2 } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// import { Alert, AlertDescription } from '@/components/ui/alert';


const BlogList = ({ blogs }) => {
  const [showError, setShowError] = React.useState(false);
  const handleLike = async (e, id) => {
    e.preventDefault(); // Prevent navigation
    try {
      await axios.post(
        `https://kohina-blogs.onrender.com/api/v1/blog/likeblog/${id}`,
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

  const handleView = async (e, id) => {
    e.preventDefault(); // Prevent navigation
    try {
      await axios.post(
        `https://kohina-blogs.onrender.com/api/v1/blog/increaseview/${id}`,
        {},
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      window.location.reload()
    } catch (error) {
      console.error('Error increasing view:', error);
    }
  };


  const handleCommentSubmit = async (e,id) => {
    e.preventDefault();
    try {
    const response  =  await axios.post(
        `http://localhost:3000/api/v1/blog/commentblog/${id}`,
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

    

    const handleShare = async () => {
      setShowError(false);
  
      // Check if Web Share API is supported
      if (navigator.share) {
        try {
          await navigator.share({
            title,
            text,
            url
          });
        } catch (error) {
          if (error.name !== 'AbortError') {
            setShowError(true);
          }
        }
      } else {
        // Fallback: Copy to clipboard
        try {
          await navigator.clipboard.writeText(url);
          // Show clipboard success message
          const alert = document.createElement('div');
          alert.className = 'fixed top-4 right-4 bg-green-100 text-green-800 p-4 rounded-md';
          alert.textContent = 'Link copied to clipboard!';
          document.body.appendChild(alert);
          setTimeout(() => alert.remove(), 2000);
        } catch (error) {
          setShowError(true);
        }
      }

  };
}

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="group relative">
            <Link to={`/blog/${blog._id}`} className="block">
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  {blog.images?.url ? (
                    <img
                      src={blog.images.url}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <img
                      src="/api/placeholder/400/320"
                      alt="placeholder"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Category Tag */}
                  <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-3 sm:mb-4">
                    {blog.category || 'General'}
                  </span>

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {blog.title}
                  </h2>

                  {/* Content Preview */}
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                    {blog.content}
                  </p>

                  {/* Interaction Bar */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200">
                    {/* Left Side */}
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      {/* Likes */}
                      <button 
                        onClick={(e) => handleLike(e, blog._id)}
                        className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
                      >
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm">{blog.likes.length}</span>
                      </button>

                      {/* Comments */}
                      <div className="flex items-center space-x-1 sm:space-x-2 text-gray-600">
                        <MessageCircle onClick={()=>handleCommentSubmit(e,blog._id)} className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm">{blog.comments.length}</span>
                      </div>

                      {/* Views */}
                      <button
                        onClick={(e) => handleView(e, blog._id)}
                        className="flex items-center space-x-1 sm:space-x-2 text-gray-600"
                      >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm">{blog.views}</span>
                      </button>
                    </div>

                    {/* Right Side - Share */}
                    <button  className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;

