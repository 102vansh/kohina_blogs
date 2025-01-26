


// import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FaThumbsUp, FaComment, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// const BlogDetail = ({ blog }) => {
//   const handleLike = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/api/v1/blog/likeblog/${blog._id}`,
//         {},
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           withCredentials: true,
//         }
//       );
//       window.location.reload(); // Refresh the page to update likes
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error liking blog:', error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/api/blogs/${blog._id}`); // Replace with your backend API endpoint
//       window.location.href = '/'; // Redirect to home page after deletion
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         {/* Edit and Delete Buttons at the Top */}
//         <div className="flex justify-end gap-4 mb-6">
//           <Link
//             to={`/blog/${blog._id}/edit`}
//             className="text-green-500 hover:text-green-600 transition-colors duration-300"
//           >
//             <FaEdit className="text-2xl" />
//           </Link>
//           <button
//             onClick={handleDelete}
//             className="text-red-500 hover:text-red-600 transition-colors duration-300"
//           >
//             <FaTrash className="text-2xl" />
//           </button>
//         </div>

//         {/* Blog Image */}
//         {blog.images?.url && (
//           <img
//             src={blog.images.url}
//             alt={blog.title}
//             className="w-full h-96 object-cover rounded-lg mb-6"
//           />
//         )}

//         {/* Blog Title */}
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>

//         {/* Category Display */}
//         <div className="text-gray-700 text-lg mb-6">
//           <span className="font-semibold">Category:</span> {blog.category}
//         </div>

//         {/* Blog Content */}
//         <p className="text-gray-700 text-lg mb-6">{blog.content}</p>

//         {/* Blog Metadata (Likes, Comments, Views) */}
//         <div className="flex items-center gap-6 text-gray-600 mb-6">
//           <div onClick={handleLike} className="flex items-center gap-2">
//             <FaThumbsUp  className="text-xl" />
//             <span>{blog.likes.length} Likes</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <FaComment className="text-xl" />
//             <span>{blog.comments.length} Comments</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <FaEye className="text-xl" />
//             <span>{blog.views} Views</span>
//           </div>
//         </div>

        
//       </div>
//     </div>
//   );
// };

// export default BlogDetail;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FaThumbsUp, FaComment, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// const BlogDetail = ({ blog }) => {
//   const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
//   const [comment, setComment] = useState('');

//   const handleLike = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/api/v1/blog/likeblog/${blog._id}`,
//         {},
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           withCredentials: true,
//         }
//       );
//       window.location.reload(); // Refresh the page to update likes
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error liking blog:', error);
//     }
//   };
  

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:3000/api/v1/blog/deleteblog/${blog._id}`,{withCredentials:true}); // Replace with your backend API endpoint
//       window.location.href = '/'; // Redirect to home page after deletion

//       console.log(response.data);
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `http://localhost:3000/api/v1/blog/commentblog/${blog._id}`,
//         { comment },
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           withCredentials: true,
//         }
//       );
//       window.location.reload(); // Refresh the page to update comments
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         {/* Edit and Delete Buttons at the Top */}
//         <div className="flex justify-end gap-4 mb-6">
//           <Link
//             to={`/updateblog/${blog._id}`}
//             className="text-green-500 hover:text-green-600 transition-colors duration-300"
//           >
//             <FaEdit className="text-2xl" />
//           </Link>
//           <button
//             onClick={handleDelete}
//             className="text-red-500 hover:text-red-600 transition-colors duration-300"
//           >
//             <FaTrash className="text-2xl" />
//           </button>
//         </div>

//         {/* Blog Image */}
//         {blog.images?.url && (
//           <img
//             src={blog.images.url}
//             alt={blog.title}
//             className="w-full h-96 object-cover rounded-lg mb-6"
//           />
//         )}

//         {/* Blog Title */}
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>

//         {/* Category Display */}
//         <div className="text-gray-700 text-lg mb-6">
//           <span className="font-semibold">Category:</span> {blog.category}
//         </div>

//         {/* Blog Content */}
//         <p className="text-gray-700 text-lg mb-6">{blog.content}</p>

//         {/* Blog Metadata (Likes, Comments, Views) */}
//         <div className="flex items-center gap-6 text-gray-600 mb-6">
//           <div onClick={handleLike} className="flex items-center gap-2">
//             <FaThumbsUp className="text-xl" />
//             <span>{blog.likes.length} Likes</span>
//           </div>
//           <div
//             className="flex items-center gap-2 cursor-pointer"
//             onClick={() => setIsCommentModalOpen(true)}
//           >
//             <FaComment className="text-xl" />
//             <span>{blog.comments.length} Comments</span>
//           </div>
//           <div  className="flex items-center gap-2">
//             <FaEye className="text-xl" />
//             <span>{blog.views} Views</span>
//           </div>
//         </div>

//         {/* Like Button */}
//         {/* <button
//           onClick={handleLike}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
//         >
//           Like
//         </button> */}
//       </div>

//       {/* Comment Modal */}
//       {isCommentModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Add a Comment</h2>
//             <form onSubmit={handleCommentSubmit}>
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 placeholder="Write your comment..."
//                 required
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 rows="4"
//               />
//               <div className="flex justify-end gap-4 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsCommentModalOpen(false)}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDetail;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FaThumbsUp, FaComment, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// const BlogDetail = ({ blog }) => {
//   const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
//   const [comment, setComment] = useState('');

//   const handleLike = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/api/v1/blog/likeblog/${blog._id}`,
//         {},
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           withCredentials: true,
//         }
//       );
//       window.location.reload(); // Refresh the page to update likes
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error liking blog:', error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:3000/api/v1/blog/deleteblog/${blog._id}`, {
//         withCredentials: true,
//       });
//       window.location.href = '/'; // Redirect to home page after deletion
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `http://localhost:3000/api/v1/blog/commentblog/${blog._id}`,
//         { comment },
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           withCredentials: true,
//         }
//       );
//       window.location.reload(); // Refresh the page to update comments
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
//       style={{
//         backgroundImage: `url('https://img.freepik.com/free-photo/top-view-workspace-with-copy-space_23-2148236864.jpg?t=st=1737890705~exp=1737894305~hmac=9e8c347c3d2ebdef0f7fada7733b9dc7d8c8f7a038d5ddd71a12bb62c29763df&w=1380')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 bg-opacity-90">
//         {/* Edit and Delete Buttons at the Top */}
//         <div className="flex justify-end gap-4 mb-6">
//           <Link
//             to={`/updateblog/${blog._id}`}
//             className="text-green-500 hover:text-green-600 transition-colors duration-300"
//           >
//             <FaEdit className="text-2xl" />
//           </Link>
//           <button
//             onClick={handleDelete}
//             className="text-red-500 hover:text-red-600 transition-colors duration-300"
//           >
//             <FaTrash className="text-2xl" />
//           </button>
//         </div>

//         {/* Blog Image */}
//         {blog.images?.url && (
//           <img
//             src={blog.images.url}
//             alt={blog.title}
//             className="w-full h-96 object-cover rounded-lg mb-6"
//           />
//         )}

//         {/* Blog Title */}
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>

//         {/* Category Display */}
//         <div className="text-gray-700 text-lg mb-6">
//           <span className="font-semibold">Category:</span> {blog.category}
//         </div>

//         {/* Blog Content */}
//         <p className="text-gray-700 text-lg mb-6">{blog.content}</p>

//         {/* Blog Metadata (Likes, Comments, Views) */}
//         <div className="flex items-center gap-6 text-gray-600 mb-6">
//           <div onClick={handleLike} className="flex items-center gap-2">
//             <FaThumbsUp className="text-xl" />
//             <span>{blog.likes.length} Likes</span>
//           </div>
//           <div
//             className="flex items-center gap-2 cursor-pointer"
//             onClick={() => setIsCommentModalOpen(true)}
//           >
//             <FaComment className="text-xl" />
//             <span>{blog.comments.length} Comments</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <FaEye className="text-xl" />
//             <span>{blog.views} Views</span>
//           </div>
//         </div>
//       </div>

//       {/* Comment Modal */}
//       {isCommentModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Add a Comment</h2>
//             <form onSubmit={handleCommentSubmit}>
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 placeholder="Write your comment..."
//                 required
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 rows="4"
//               />
//               <div className="flex justify-end gap-4 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsCommentModalOpen(false)}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDetail;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaComment, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const BlogDetail = ({ blog }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/blog/likeblog/${blog._id}`,
        {},
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      window.location.reload(); // Refresh the page to update likes
      console.log(response.data);
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/blog/deleteblog/${blog._id}`, {
        withCredentials: true,
      });
      window.location.href = '/'; // Redirect to home page after deletion
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/api/v1/blog/commentblog/${blog._id}`,
        { comment },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      window.location.reload(); // Refresh the page to update comments
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/social-media-background-with-hand-drawn-elements_23-2147825904.jpg?t=st=1737890297~exp=1737893897~hmac=51e7e26e200cbe83c9f23d64864e86384daea78e690db4652b8892a90bcf51ec&w=826')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Ensures the background covers the entire screen
      }}
    >
      <div className="max-w-3xl mx-auto bg-black rounded-lg shadow-lg p-6 bg-opacity-90">
        {/* Edit and Delete Buttons at the Top */}
        <div className="flex justify-end gap-4 mb-6">
          <Link
            to={`/updateblog/${blog._id}`}
            className="text-green-500 hover:text-green-600 transition-colors duration-300"
          >
            <FaEdit className="text-2xl" />
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 transition-colors duration-300"
          >
            <FaTrash className="text-2xl" />
          </button>
        </div>

        {/* Blog Image */}
        {blog.images?.url && (
          <img
            src={blog.images.url}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}

        {/* Blog Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>

        {/* Category Display */}
        <div className="text-gray-700 text-lg mb-6">
          <span className="font-semibold">Category:</span> {blog.category}
        </div>

        {/* Blog Content */}
        <p className="text-gray-700 text-lg mb-6">{blog.content}</p>

        {/* Blog Metadata (Likes, Comments, Views) */}
        <div className="flex items-center gap-6 text-gray-600 mb-6">
          <div onClick={handleLike} className="flex items-center gap-2">
            <FaThumbsUp className="text-xl" />
            <span>{blog.likes.length} Likes</span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsCommentModalOpen(true)}
          >
            <FaComment className="text-xl" />
            <span>{blog.comments.length} Comments</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEye className="text-xl" />
            <span>{blog.views} Views</span>
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add a Comment</h2>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsCommentModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;