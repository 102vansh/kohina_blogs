/*  */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';
import AIProductLanding from '../components/Landing';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://kohina-blogs.onrender.com/api/v1/blog/getallblogs', { withCredentials: true });
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8" >
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">All Blogs</h1>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default Home;
