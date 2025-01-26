// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import BlogList from '../components/BlogList';

// const Myblogs = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/v1/blog/myblogs', { withCredentials: true });
//         setBlogs(response.data.blogs);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">My blogs </h1>
//         <BlogList blogs={blogs} />
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
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/business-background-design_1200-91.jpg?t=st=1737889632~exp=1737893232~hmac=b9d9cf52f345e8487ce2fd9b7d7a6f00312c24955af0a25d3427e6d10aa57bf0&w=826')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">My Blogs</h1>
        <div className=" bg-opacity-90 rounded-lg shadow-lg p-6">
          <BlogList blogs={blogs} />
        </div>
      </div>
    </div>
  );
};

export default Myblogs;