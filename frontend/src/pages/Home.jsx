// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';
// // import BlogList from '../components/BlogList';

// // const Home = () => {
// //   const [blogs, setBlogs] = useState([]);

// //   useEffect(() => {
// //     const fetchBlogs = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:3000/api/v1/blog/getallblogs',{ withCredentials: true }); // Replace with your backend API endpoint
// //         setBlogs(response.data.blogs);
// //       } catch (error) {
// //         console.error('Error fetching blogs:', error);
// //       }
// //     };
// //     fetchBlogs();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>All Blogs</h1>
// //       <BlogList blogs={blogs} />
// //     </div>
// //   );
// // };

// // export default Home;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import BlogList from '../components/BlogList';

// const Home = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/v1/blog/getallblogs', { withCredentials: true });
//         setBlogs(response.data.blogs);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">All Blogs</h1>
//         <BlogList blogs={blogs} />
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/blog/getallblogs', { withCredentials: true });
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/social-network-activity_1284-12829.jpg?t=st=1737889469~exp=1737893069~hmac=f1820f1e9f23225f50cd0d4e4b993c7229805a68d1d2eaa1da37b273efcbf6b1&w=900)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">All Blogs</h1>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default Home;
