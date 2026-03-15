import { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaDollarSign, FaBell, FaDownload, FaTimes } from 'react-icons/fa';
import api from '../utils/api';

const ProfileSidebar = ({ isOpen, onClose, user, onUpdateProfile }) => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    budget: 0,
    monthlyGoal: 0,
    notifications: true
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        budget: user.budget || 0,
        monthlyGoal: user.monthlyGoal || 0,
        notifications: user.notifications !== false
      });
    }
  }, [user]);

  const handleSave = async () => {
  try {
    const res = await api.put('/users/profile', form); 
    onUpdateProfile(res.data);
    setEditMode(false);
    alert('Profile updated successfully! ✅');
  } catch (error) {
    console.error('Profile error:', error.response?.data || error.message);
    alert('Error: ' + (error.response?.data?.message || 'Update failed'));
  }
};

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-purple-600 to-purple-800 backdrop-blur-md border-r border-white/20 shadow-2xl z-50 transform transition-transform duration-300 translate-x-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaUser className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {form.firstName} {form.lastName}
                </h3>
                <p className="text-purple-100 text-sm">{form.email}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-white/20 transition">
              <FaTimes />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 p-4 rounded-xl text-center">
              <FaDollarSign className="text-2xl text-green-300 mx-auto mb-2" />
              <p className="text-white text-sm">Budget</p>
              <p className="text-2xl font-bold text-green-200">₹{form.budget}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl text-center">
              <FaDollarSign className="text-2xl text-yellow-300 mx-auto mb-2" />
              <p className="text-white text-sm">Goal</p>
              <p className="text-2xl font-bold text-yellow-200">₹{form.monthlyGoal}</p>
            </div>
          </div>

          {/* Edit Toggle */}
          <button 
            onClick={() => setEditMode(!editMode)}
            className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition duration-300 mb-6"
          >
            <FaEdit />
            <span>{editMode ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>

          {/* Edit Form */}
          {editMode && (
            <div className="space-y-4 mb-6">
              <input
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Monthly Budget"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: parseFloat(e.target.value) || 0 })}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-200 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Monthly Goal"
                value={form.monthlyGoal}
                onChange={(e) => setForm({ ...form, monthlyGoal: parseFloat(e.target.value) || 0 })}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              <label className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  checked={form.notifications}
                  onChange={(e) => setForm({ ...form, notifications: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-400"
                />
                <span>Enable Notifications</span>
              </label>
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
              >
                💾 Save Changes
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition duration-300 text-left">
              <FaDownload className="text-lg" />
              <span className="text-white font-medium">Export Data</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition duration-300 text-left">
              <FaBell className="text-lg" />
              <span className="text-white font-medium">Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;