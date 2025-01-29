


import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import toast from 'react-hot-toast';
import { useUser } from '../components/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setEmail('');
      setPassword('');
      navigate('/');
      toast.success('Login successful');
      setUser(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:block w-full md:w-1/2 p-8">
          <img
            src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg?t=st=1737807234~exp=1737810834~hmac=ce989720bef237d92eb68efc456a9626471d4ca1df339ddaac36bf0d28827ef9&w=826"
            alt="Workspace"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Sign in</h2>
          <GoogleLogin />
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
                className="w-full pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-600">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Sign in
            </button>
          </form>
          
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;