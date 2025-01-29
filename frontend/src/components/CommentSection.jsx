



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//  import { FaTrash } from 'react-icons/fa';
//  import { Trash2, MoreVertical } from 'lucide-react';

// const CommentSection = ({ blogId}) => {
//   const [result,setResult] = useState([])
//   // const [comment, setComment] = useState();
// console.log(result)
  
//   // };
// const fetchcomment = async() =>{
//   try{
//     const response  = await axios.get(`http://localhost:3000/api/v1/blog/getcomment/${blogId}`,{withCredentials:true})
// setResult(response.data.comments)
//     console.log(response.data)
//   }catch(error){
//     console.log(error)
//   }
// }
// useEffect(() => {
// fetchcomment()

  
// }, [blogId])

//   return (
    
      
//       <div className="space-y-4 max-w-2xl mx-auto">
//       {result?.map((comment) => (
//         <div
//           key={comment._id}
//           className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
//         >
//           <div className="flex items-start justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium">
//                 {comment?.user?.name[0]}
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">
//                   {comment?.user?.name}
//                 </h3>
//                 <span className="text-sm text-gray-500">
//                   {/* You can add timestamp here */}
//                   {/* {new Date(blog.createdAt).toLocaleDateString()} */}
//                 </span>
//               </div>
//             </div>
            
//             <div className="relative group">
//               <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                 <MoreVertical className="w-5 h-5 text-gray-500" />
//               </button>
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
//                 <button
//                   onClick={() => onDelete(comment._id)}
//                   className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2 rounded-lg"
//                 >
//                   <FaTrash className="w-4 h-4" />
//                   <span>Delete comment</span>
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-4">
//             <p className="text-gray-700 leading-relaxed">
//               {comment.comment}
//             </p>
//           </div>
          
//           <div className="mt-4 flex items-center space-x-4">
//             <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
//               <span>Reply</span>
//             </button>
//             <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
//               <span>Share</span>
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
    
//   );
// };

// export default CommentSection;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CommentSection = ({ blogId }) => {
  const [result, setResult] = useState([])

  const commentdelete = async (id) => {
    // Your delete logic heretry{}
    try{
      console.log(result)
      console.log(result._id)
    const response = await axios.post(`http://localhost:3000/api/v1/blog/deletecomment/${blogId}`,{commentId:id},{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
    
    )
    window.location.reload();
    console.log(response.data.message)
toast.success(response.data.message)
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
  };

  const fetchcomment = async () => {
    try {
      const response = await axios.get(
        `https://kohina-blogs.onrender.com/api/v1/blog/getcomment/${blogId}`,
        { withCredentials: true }
      );
      setResult(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchcomment();
  }, [blogId]);

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {result?.map((comment) => (
        <div
          key={comment._id}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium">
                {comment?.user?.name[0]}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {comment?.user?.name}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => commentdelete(comment._id)}
              className="p-2 hover:bg-red-50 rounded-full transition-colors group"
              aria-label="Delete comment"
            >
              <Trash2 className="w-5 h-5 text-gray-800 group-hover:text-red-500 transition-colors" />
            </button>
          </div>

          <div className="mt-4">
            <p className="text-gray-700 leading-relaxed">
              {comment.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;