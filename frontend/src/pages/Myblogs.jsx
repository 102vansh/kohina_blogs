

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import BlogList from '../components/BlogList';

// const Myblogs = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/v1/blog/myblogs', {
//           withCredentials: true,
//         });
//         setBlogs(response.data.blogs);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   return (
//     <div
//       className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
//       style={{
//         backgroundImage: ``,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">My Blogs</h1>
//         <div className=" bg-opacity-90 rounded-lg shadow-lg p-6">
//           <BlogList blogs={blogs} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Myblogs;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';

const Myblogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/blog/myblogs', {
          withCredentials: true,
        });
        setBlogs(response.data.blogs);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div
      className="min-h-screen py-6 px-4 sm:py-8 sm:px-6 lg:px-8"
      style={{
        backgroundImage: ``,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
          My Blogs
        </h1>

        {/* Blog List Container */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-4 sm:p-6">
          <BlogList blogs={blogs} />
        </div>
      </div>
    </div>
  );
};

export default Myblogs;