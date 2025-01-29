

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Createblogs = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      if (images) {
        formData.append('images', images);
      }
      console.log(title, content, images);

      const response = await axios.post(
        'https://kohina-blogs.onrender.com/api/v1/blog/createblog',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      console.log('Blog created successfully:', response.data);
      navigate('/'); // Redirect to home or blogs page after creation
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      console.error('Error creating blog:', err);
      setError('Failed to create blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/flat-design-geometric-background_23-2148935794.jpg?t=st=1737889115~exp=1737892715~hmac=0b823704691c85ce7c99e754abd30c4043da3628bd5f2cfe4f2bf5738cd4fc75&w=1380')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 bg-opacity-90">
        <h2 className="text-3xl font-bold mb-8 text-center">Create a New Blog</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="6"
              placeholder="Write your blog content"
              required
            />
          </div>

          {/* Category Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter blog category"
              required
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              accept="image/*"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              {loading ? 'Creating...' : 'Create Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createblogs;