import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import ExpenseForm from '../components/ExpenseForm';

const AddExpense = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <FaPlus className="text-3xl text-green-400 mr-2" />
          <h2 className="text-3xl font-bold text-white dark:text-gray-100">Add New Expense</h2>
        </div>
        <ExpenseForm onSave={handleSave} />
      </div>
    </div>
  );
};

export default AddExpense;