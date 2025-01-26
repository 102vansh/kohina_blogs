import React from 'react';
import { FcGoogle } from 'react-icons/fc';
const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/v1/auth/google';
  };

  return (
    <div className='mb-12 ml-12 text-center'>
      <button
        onClick={handleGoogleLogin}
        className="bg-red-700 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
      >
  <FcGoogle className="text-2xl mr-2" /> 
         {/* Google Icon */}
         
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;