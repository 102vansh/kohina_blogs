// import React, { useState } from 'react';
// import axios from 'axios';

// const CommentSection = ({ blogId, comments }) => {
//   const [comment, setComment] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`http://localhost:3000/api/v1/blog/commentblog/${blogId}`, { comment },{
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         withCredentials: true,
//       }); // Replace with your backend API endpoint
//       window.location.reload(); // Refresh the page to update comments
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   return (
//     <div>
//       <h3>Comments</h3>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder="Add a comment..."
//           required
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <div>
//         {comments.map((comment) => (
//           <div key={comment._id}>
//             <p>{comment.comment}</p>
//             <p>By: {comment.user.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommentSection;



import React, { useState } from 'react';
import axios from 'axios';

const CommentSection = ({ blogId, comments }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/api/v1/blog/commentblog/${blogId}`,
        { comment },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      ); // Replace with your backend API endpoint
      window.location.reload(); // Refresh the page to update comments
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    // <div className="mt-8">
    //   {/* Comment Form */}
    //   <h3 className="text-2xl font-bold text-gray-900 mb-4">Comments</h3>
    //   <form onSubmit={handleSubmit} className="mb-8">
    //     <textarea
    //       value={comment}
    //       onChange={(e) => setComment(e.target.value)}
    //       placeholder="Add a comment..."
    //       required
    //       className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //       rows="4"
    //     />
    //     <button
    //       type="submit"
    //       className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
    //     >
    //       Submit
    //     </button>
    //   </form>

     
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className=" bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 text-lg">{comment.comment}</p>
            <p className="text-sm text-gray-500 mt-2">By: {comment.user.name}</p>
          </div>
        ))}
      </div>
    
  );
};

export default CommentSection;