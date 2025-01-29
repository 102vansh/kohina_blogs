


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Mail, Shield, Calendar, Camera, Edit2 } from 'lucide-react';
import Profile from './Profile';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/getmyprofile', {
          withCredentials: true,
        });
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-red-50 p-4 rounded-lg shadow-lg">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Profile />
      
      <div className="max-w-3xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-900 to-blue-300">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full p-1">
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl font-bold text-gray-600">
                      {user.name[0].toUpperCase()}
                    </span>
                    <button className="absolute bottom-0 w-full bg-black/30 py-1 text-white text-sm flex items-center justify-center gap-1 opacity-0 hover:opacity-100 transition-opacity">
                      <Camera className="w-4 h-4" />
                      <span>Change</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-500">{user.role}</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="grid gap-6">
              {/* Profile Details Card */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium text-gray-900">{user.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Joined Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;