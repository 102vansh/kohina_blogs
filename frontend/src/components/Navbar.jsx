import React from 'react';
import { Feather, User, BookOpen, PenTool } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Toaster,toast}  from 'react-hot-toast'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react';
import { useEffect } from 'react';

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/getmyprofile', {
          withCredentials: true, // Include cookies for authentication
        });
        console.log(response.data);
        setUser(response.data.user);
      } catch (error) {
        setError('Failed to fetch user profile. Please try again later.');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

    const navigate  =  useNavigate();
    const handlechange = ()=> {
        navigate('/login')
    }
    const logout = async()=>{
        try{
const respone  = await axios.get('http://localhost:3000/api/v1/auth/logout',{withCredentials:true})
            console.log(respone.data)
            navigate('/login')
        }catch(error){
            console.log(error)
        }
    }
  return (
    <nav className=" bg-gray-700 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
     <Link to={'/'}>  <div className="flex items-center space-x-2">
          <Feather size={24} className="text-blue-400" />
          <span className="text-2xl text-black font-bold">Wandering Whispers</span>
        </div>
        </Link> 

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link to={"/myblogs"} className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
            <BookOpen size={20} />
            <span>My Blogs</span>
          </Link>
          <Link to={"/createblog"} className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
            <PenTool size={20} />
            <span>Create Blog</span>
          </Link>
          <Link to={"/myprofile" }className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
            <User size={20} />
            <span>My Profile</span>
          </Link>

          <Link to={"/aibot" }className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
          <MessageCircle className="w-6 h-6" />
            <span>AI Chatbot</span>
          </Link>

          <button onClick={()=>logout()} className="bg-sky-900 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
            Logout
          </button>
          {
            user ? (
              <div className="flex items-center space-x-2 bg-emerald-700 p-2 rounded-lg transition-colors ml-8">
                <User size={20} />
                <span>{user.name}</span>
              </div>
            ) : (
              <button onClick={()=>handlechange()} className="bg-yellow-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
                Login
              </button>
            )
          }
          {/* <button onClick={()=>handlechange()} className="bg-yellow-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
            Login
          </button> */}

          {/* <button onClick={()=>logout()} className="bg-sky-900 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
            Logout
          </button> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;