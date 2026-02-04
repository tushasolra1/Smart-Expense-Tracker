import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaDollarSign, FaList, FaPlus } from 'react-icons/fa';
import api from '../utils/api';
import ExpenseList from '../components/ExpenseList';

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/expenses');
        const expenses = res.data;
        setTotalExpenses(expenses.reduce((sum, exp) => sum + exp.amount, 0));
        setRecentExpenses(expenses.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data');
      }
    };
    fetchData();
  }, []);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    // You can open a modal or navigate to edit page here
    alert('Edit functionality: ' + expense.title); // Placeholder
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-white dark:text-gray-100 text-center">Your Expense Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition duration-300">
          <h1 className="text-4xl text-green-400 mx-auto mb-4" >₹</h1>
          <h2 className="text-xl font-semibold text-white dark:text-gray-100">Total Expenses</h2>
          <p className="text-3xl font-bold text-green-300">₹{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition duration-300">
          <FaList className="text-4xl text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white dark:text-gray-100">Recent Transactions</h2>
          <p className="text-3xl font-bold text-blue-300">{recentExpenses.length}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition duration-300">
          <FaPlus className="text-4xl text-purple-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white dark:text-gray-100">Add New Expense</h2>
          <Link to="/add-expense" className="inline-block mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            Go to Add Expense
          </Link>
        </div>
      </div>
      <ExpenseList onEdit={handleEdit} />
    </div>
  );
};

export default Dashboard;