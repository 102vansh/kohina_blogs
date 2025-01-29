

import React, { useState } from 'react';
import { User, Lock, Mail, UserCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://kohina-blogs.onrender.com/api/v1/auth/register', {
        name,
        email,
        password,
        role,
      });

      console.log(response.data);

      setName('');
      setEmail('');
      setPassword('');
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
     
    }

    console.log('Registration data:', { name, email, password, role });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg flex overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:block w-1/2 p-8">
          <img
            src="https://img.freepik.com/free-vector/organic-flat-blog-post-illustration-with-people_23-2148955260.jpg
"
            alt="Workspace"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-8">Sign up</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Sign up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;