import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaTag, FaCalendar } from 'react-icons/fa';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';



const ExpenseList = ({ onEdit }) => { // Add onEdit prop
  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();

  const handleEdit = (expense) => {
    navigate(`/edit-expense/${expense._id}`);
  };


  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get('/expenses');
        setExpenses(res.data);
      } catch (error) {
        console.error('Error fetching expenses');
      }
    };
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
    } catch (error) {
      alert('Error deleting expense');
    }
  };


  return (
    <div className="bg-purple-300/40 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-xl p-6 dark:bg-purple-800/40 dark:border-purple-600/50">
      <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center">
        Recent Expenses
      </h2>
      <ul className="space-y-4">
        {expenses.map(exp => (
          <li key={exp._id} className="flex justify-between items-center bg-purple-200/50 dark:bg-purple-700/50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-purple-400/30 dark:border-purple-500/30">
            <div className="flex-1">
              <p className="text-purple-900 dark:text-purple-100 font-semibold flex items-center">
                <FaTag className="mr-2 text-purple-700 dark:text-purple-300" /> {exp.title}
              </p>
              <p className="text-purple-800 dark:text-purple-200 flex items-center">
                <h1 className="mr-1 text-green-600 dark:text-green-400" /> ₹{exp.amount} - {exp.category}
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-sm flex items-center">
                <FaCalendar className="mr-1" /> {new Date(exp.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(exp)} className="text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100 transition duration-300">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(exp._id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition duration-300">
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;