import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaMoon, FaSun, FaPlus, FaChartBar, FaTimes } from 'react-icons/fa';
import ProfileSidebar from './ProfileSidebar';
import api from '../utils/api';
import logo from '../assets/logo.jpg'; 

const Navbar = ({ 
  isAuthenticated, 
  setIsAuthenticated, 
  darkMode, 
  toggleDarkMode, 
  user, 
  setUser, 
  hideNavbar = false  // ✅ Keep this
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // 🔥 HIDE ON AUTH PAGES OR NOT LOGGED IN
  if (hideNavbar || !isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg dark:bg-gray-900/80 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* 🔥 CLICKABLE LOGO + TEXT */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-2xl shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer transition-all duration-300 hover:rotate-12 bg-gradient-to-br from-purple-500/80 to-pink-500/80 p-1"
                onClick={() => setSidebarOpen(true)}
              >
                <img 
                  src={logo} 
                  alt="Expense Tracker" 
                  className="w-full h-full object-cover rounded-xl shadow-md"
                />
              </div>
              
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                Expense Tracker
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-white hover:text-blue-300 transition flex items-center space-x-1 p-2 rounded-lg hover:bg-white/10">
                <FaUser className="text-sm" /> Dashboard
              </Link>
              <Link to="/add-expense" className="text-white hover:text-blue-300 transition flex items-center space-x-1 p-2 rounded-lg hover:bg-white/10">
                <FaPlus className="text-sm" /> Add
              </Link>
              <Link to="/category-stats" className="text-white hover:text-blue-300 transition flex items-center space-x-1 p-2 rounded-lg hover:bg-white/10">
                <FaChartBar className="text-sm" /> Stats
              </Link>
              
              <button onClick={toggleDarkMode} className="text-white hover:text-blue-300 p-2 rounded-full hover:bg-white/10 transition">
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition flex items-center space-x-1"
              >
                <FaSignOutAlt className="text-sm" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 🔥 PROFILE SIDEBAR */}
      <ProfileSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        user={user}
        onUpdateProfile={setUser}
      />
    </>
  );
};

export default Navbar;