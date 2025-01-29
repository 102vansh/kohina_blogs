// import React, { useState } from 'react';
// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import Navbar from './components/Navbar';

// function App() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      
//       <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg flex overflow-hidden">
//         {/* Image Section */}
//         <div className="hidden md:block w-1/2 p-8">
//           <img 
//             src={isLogin 
//               ? "https://img.freepik.com/free-photo/aerial-view-lemon-tea_53876-41454.jpg?t=st=1737807475~exp=1737811075~hmac=0815c6f01e69a15a887af95c9297bb0bb306ec964b74ab6870e7c4a5673903e9&w=740"
//               : "https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg?t=st=1737807234~exp=1737810834~hmac=ce989720bef237d92eb68efc456a9626471d4ca1df339ddaac36bf0d28827ef9&w=826"
//             }
//             alt="Workspace"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>

//         {/* Form Section */}
//         <div className="w-full md:w-1/2 p-8">
//           {isLogin ? (
//             <Login onToggle={() => setIsLogin(false)} />
//           ) : (
//             <Registration onToggle={() => setIsLogin(true)} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Navbar from './components/Navbar';
import { Route, Router, Routes } from 'react-router-dom';
import  Home  from './pages/Home';
import Createblogs from './pages/Createblogs';
import Myprofile from './pages/Myprofile';
import { Allblogs } from './pages/Allblogs';
import BlogDetailPage from './pages/BlogDetailPage';
import Myblogs from './pages/Myblogs';
import UpdateBlog from './components/UpdateBlog';
import AIchatbot from './pages/AIchatbot';
import { Toaster } from 'react-hot-toast'

function App() {
  const [isLogin, setIsLogin] = useState(true);

  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Routes>
    <Route path='/' element= {<Home/>} />
    <Route path='/login' element= {<Login/>} />
    <Route path='/register' element= {<Registration/>} />
    <Route path='/createblog' element={<Createblogs/>} />
    <Route path='/myprofile' element={<Myprofile/>} />
    <Route path='/allblog' element={<Allblogs/>}/>
    <Route path="/blog/:id" element={<BlogDetailPage />} />
    <Route path='/myblogs' element={<Myblogs/>} />
    <Route path='/updateblog/:id' element={<UpdateBlog/>} />
    <Route path='/aibot' element={<AIchatbot/>} />
    
  </Routes>

      

      <Toaster />
    </div>
  );
}

export default App;