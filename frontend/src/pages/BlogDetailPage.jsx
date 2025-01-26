// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import BlogDetail from '../components/BlogDetail';
// import CommentSection from '../components/CommentSection';

// const BlogDetailPage = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/v1/blog/getblog/${id}`,{withCredentials:true}); // Replace with your backend API endpoint
//         setBlog(response.data.blog);
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//       }
//     };
//     fetchBlog();
//   }, [id]);

//   if (!blog) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <BlogDetail blog={blog} />
//       <CommentSection blogId={blog._id} comments={blog.comments} />
//     </div>
//   );
// };

// export default BlogDetailPage;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogDetail from '../components/BlogDetail';
import CommentSection from '../components/CommentSection';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/blog/getblog/${id}`, { withCredentials: true });
        setBlog(response.data.blog);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Blog Detail Section */}
        <BlogDetail blog={blog} />

       <h1 className=' font-bold text-3xl'>Comment Section </h1> 
         <div className="">
          <CommentSection blogId={blog._id} comments={blog.comments} />
        </div> 
      </div>
    </div>
  );
};

export default BlogDetailPage;