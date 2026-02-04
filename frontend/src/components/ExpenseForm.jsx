import { useState } from 'react';
import { FaTag, FaFileAlt } from 'react-icons/fa';
import api from '../utils/api';

const ExpenseForm = ({ expense, onSave }) => {
  const [form, setForm] = useState(
    expense || { title: '', amount: '', category: '', description: '' }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (expense) {
        await api.put(`/expenses/${expense._id}`, form);
      } else {
        await api.post('/expenses', form);
      }
      onSave();
    } catch (error) {
      console.error(error);
      alert('Error saving expense');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Title */}
      <div className="relative">
        <FaFileAlt className="absolute left-3 top-3 text-gray-400" />
        <input 
          type="text" 
          placeholder="Title" 
          value={form.title} 
          onChange={(e) => setForm({ ...form, title: e.target.value })} 
          className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
          required 
        />
      </div>

      {/* Amount (₹) */}
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-300 font-bold">₹</span>
        <input 
          type="number" 
          placeholder="Amount" 
          value={form.amount} 
          onChange={(e) => setForm({ ...form, amount: e.target.value })} 
          className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
          required 
        />
      </div>

      {/* Category */}
      <div className="relative">
        <FaTag className="absolute left-3 top-3 text-gray-400" />
        <select 
          value={form.category} 
          onChange={(e) => setForm({ ...form, category: e.target.value })} 
          className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:outline-none" 
          required
        >
          <option value="" className="text-gray-900">Select Category</option>
          <option value="Food" className="text-gray-900">Food</option>
          <option value="Transport" className="text-gray-900">Transport</option>
          <option value="Entertainment" className="text-gray-900">Entertainment</option>
        </select>
      </div>

      {/* Description */}
      <textarea 
        placeholder="Description" 
        value={form.description} 
        onChange={(e) => setForm({ ...form, description: e.target.value })} 
        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none" 
        rows="3"
      />

      {/* Submit */}
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
      >
        Save Expense
      </button>
    </form>
  );
};

export default ExpenseForm;