import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import api from '../utils/api';

const Register = ({ setIsAuthenticated }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/register', form);
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 dark:from-gray-900 dark:via-purple-900 dark:to-purple-800 p-4">
    <div className="bg-purple-100/20 backdrop-blur-md border border-purple-300/30 rounded-2xl shadow-2xl p-8 w-full max-w-md dark:bg-purple-900/20 dark:border-purple-700/30">
        <h2 className="text-3xl font-bold text-center text-white dark:text-gray-100 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="First Name" 
              value={form.firstName} 
              onChange={(e) => setForm({ ...form, firstName: e.target.value })} 
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300" 
              required 
            />
          </div>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Last Name" 
              value={form.lastName} 
              onChange={(e) => setForm({ ...form, lastName: e.target.value })} 
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300" 
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300" 
              required 
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300" 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-white dark:text-gray-300">Already have an account? <a href="/login" className="text-blue-300 hover:underline">Login</a></p>
      </div>
    </div>
  );
};

export default Register;