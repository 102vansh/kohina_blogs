


// import React from 'react';
// import { Link } from 'react-router-dom';

// const BlogList = ({ blogs }) => {
//   return (
//     <div className="max-w-6xl mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {blogs.map((blog) => (
//         <Link to={`/blog/${blog._id}`} key={blog._id}>
//           <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
//             {/* Image */}
//             {blog.images && blog.images.url && (
//               <img
//                 src={blog.images.url}
//                 alt={blog.images.alt || 'Blog Image'}
//                 className="w-full h-48 object-cover rounded-t-2xl"
//               />
//             )}

//             {/* Content */}
//             <div className="p-4">
//               {/* Title */}
//               <h2 className="text-lg font-semibold mb-2 text-blue-600 hover:underline">
//                 {blog.title}
//               </h2>

//               {/* Snippet */}
//               <p className="text-gray-700 text-sm mb-3">
//                 {blog.content.substring(0, 100)}...
//               </p>
// <Link/>
//               {/* Metadata */}
//               <div className="text-gray-500 text-sm flex items-center space-x-10">
//                 <p className="mb-1">
//                   <span className="font-medium">Views:</span> {blog.views}
//                 </p>
//                 <p className="mb-1">
//                   <span className="font-medium">Likes:</span> {blog.likes.length}
//                 </p>
//                 <p className="mb-1">
//                   <span className="font-medium">Comments:</span> {blog.comments.length}
//                 </p>
                
//               </div>

//               {/* Read More Button */}
//               {/* Uncomment if you want to use the button */}
//               {/* <Link
//                 to={`/blog/${blog._id}`}
//                 className="block mt-3 text-center bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
//               >
//                 Read More
//               </Link> */}
//             </div>
//           </div>
//         ))
//       }
//     </div>
//   );
// };

// export default BlogList;
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogList = ({ blogs }) => {


  const handleview = async(id)=>{
    console.log(blogs)
    console.log(blogs._id)
    try{
const response  = await axios.post(`http://localhost:3000/api/v1/blog/increaseview/${id}`,{},{
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});
window.location.reload();
console.log(response.data);

    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Link to={`/blog/${blog._id}`} key={blog._id}>
          <div className="bg-black rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-500">
            {/* Image */}
            {blog.images && blog.images.url && (
              <img
                src={blog.images.url}
                alt={blog.images.alt || 'Blog Image'}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
            )}

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h2 className="text-lg font-semibold mb-2 text-blue-600 hover:underline">
                {blog.title}
              </h2>

              {/* Snippet */}
              <p className="text-gray-700 text-sm mb-3">
                {blog.content.substring(0, 100)}...
              </p>

              {/* Metadata */}
              <div className="text-gray-500 text-sm flex items-center space-x-10">
                <p onClick={()=>handleview(blog._id)} className="mb-1">
                  <span className="font-medium">Views:</span> {blog.views}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Likes:</span> {blog.likes.length}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Comments:</span> {blog.comments.length}
                </p>
              </div>

              {/* Read More Button */}
              {/* Uncomment if you want to use the button */}
              {/* <Link
                to={`/blog/${blog._id}`}
                className="block mt-3 text-center bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
              >
                Read More
              </Link> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
