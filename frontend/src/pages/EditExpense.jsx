import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import api from '../utils/api';
import ExpenseForm from '../components/ExpenseForm';

const EditExpense = () => {
  const { id } = useParams(); // Get expense ID from URL
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await api.get(`/expenses/${id}`);
        setExpense(res.data);
      } catch (error) {
        alert('Error fetching expense');
      } finally {
        setLoading(false);
      }
    };
    fetchExpense();
  }, [id]);

  const handleSave = () => {
    navigate('/'); // Redirect to dashboard after saving
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 dark:from-gray-900 dark:via-purple-900 dark:to-purple-800 p-4">
      <div className="bg-purple-100/20 backdrop-blur-md border border-purple-300/30 rounded-2xl shadow-2xl p-8 w-full max-w-md dark:bg-purple-900/20 dark:border-purple-700/30">
        <div className="flex items-center justify-center mb-6">
          <FaEdit className="text-3xl text-blue-400 mr-2" />
          <h2 className="text-3xl font-bold text-white dark:text-gray-100">Edit Expense</h2>
        </div>
        <ExpenseForm expense={expense} onSave={handleSave} />
      </div>
    </div>
  );
};

export default EditExpense;