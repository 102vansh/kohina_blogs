

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Feather, User, BookOpen, PenTool, MessageCircle, Menu, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useUser } from './UserContext';


const Navbar = () => {
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
const {user,setUser} = useUser()
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/api/v1/user/getmyprofile', {
  //         withCredentials: true,
  //       });
  //       setUser(response.data.user);
  //     } catch (error) {
  //       console.error('Error fetching profile:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProfile();
  // }, []);

  const logout = async () => {
    try {
      await axios.get('https://kohina-blogs.onrender.com/api/v1/auth/logout', { withCredentials: true });
      navigate('/login');
      setUser('')
    } catch (error) {
      console.error(error);
    }
  };

  const NavLink = ({ to, icon: Icon, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 
          ${isActive 
            ? 'bg-blue-600 text-white' 
            : 'hover:bg-gray-100 hover:text-blue-600'
          }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
        <span className={`${isActive ? 'font-medium' : ''}`}>{children}</span>
      </Link>
    );
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <Feather className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-900 to-blue-300 bg-clip-text text-transparent">
              Wandering Whispers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/myblogs" icon={BookOpen}>My Blogs</NavLink>
            <NavLink to="/createblog" icon={PenTool}>Create</NavLink>
            <NavLink to="/myprofile" icon={User}>Profile</NavLink>
            <NavLink to="/aibot" icon={MessageCircle}>AI Chat</NavLink>

            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-medium">{user?.name?.[0]}</span>
                  </div>
                  <span className="font-medium text-gray-700">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                    transition-colors duration-200 font-medium shadow-lg shadow-red-500/30"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                  transition-colors duration-200 font-medium shadow-lg shadow-blue-600/30"
              >
                Login
              </button>
            )}
          
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              <NavLink to="/myblogs" icon={BookOpen}>My Blogs</NavLink>
              <NavLink to="/createblog" icon={PenTool}>Create</NavLink>
              <NavLink to="/myprofile" icon={User}>Profile</NavLink>
              <NavLink to="/aibot" icon={MessageCircle}>AI Chat</NavLink>

              {user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-medium">{user?.name[0]}</span>
                    </div>
                    <span className="font-medium text-gray-700">{user?.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                      transition-colors duration-200 font-medium text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    transition-colors duration-200 font-medium text-center"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;