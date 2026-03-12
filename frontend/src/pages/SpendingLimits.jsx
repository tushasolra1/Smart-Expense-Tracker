import { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import api from '../utils/api';

const SpendingLimits = () => {
  const [weeklyLimit, setWeeklyLimit] = useState(localStorage.getItem('weeklyLimit') || 500);
  const [monthlyLimit, setMonthlyLimit] = useState(localStorage.getItem('monthlyLimit') || 2000);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/expenses');
        const expenses = res.data;

        // Calculate weekly and monthly totals
        const now = new Date();
        const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        const weekly = expenses.filter(exp => new Date(exp.createdAt) >= weekStart).reduce((sum, exp) => sum + exp.amount, 0);
        const monthly = expenses.filter(exp => new Date(exp.createdAt) >= monthStart).reduce((sum, exp) => sum + exp.amount, 0);

        setWeeklyTotal(weekly);
        setMonthlyTotal(monthly);

        // Check limits
        if (weekly >= weeklyLimit) {
          setAlertMessage(`Warning: Weekly spending limit of $${weeklyLimit} reached!`);
        } else if (monthly >= monthlyLimit) {
          setAlertMessage(`Warning: Monthly spending limit of $${monthlyLimit} reached!`);
        } else {
          setAlertMessage('');
        }
      } catch (error) {
        console.error('Error fetching data');
      }
    };
    fetchData();
  }, [weeklyLimit, monthlyLimit]);

  const handleLimitChange = (type, value) => {
    if (type === 'weekly') {
      setWeeklyLimit(value);
      localStorage.setItem('weeklyLimit', value);
    } else {
      setMonthlyLimit(value);
      localStorage.setItem('monthlyLimit', value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 dark:from-gray-900 dark:via-purple-900 dark:to-purple-800 p-4">
      <div className="bg-purple-100/20 backdrop-blur-md border border-purple-300/30 rounded-2xl shadow-2xl p-8 w-full max-w-md dark:bg-purple-900/20 dark:border-purple-700/30">
        <div className="flex items-center justify-center mb-6">
          
          <h2 className="text-3xl font-bold text-white dark:text-gray-100">Spending Limits</h2>
        </div>

        {/* Alert Message */}
        {alertMessage && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 mb-6 text-center text-red-100">
            <FaExclamationTriangle className="inline mr-2" /> {alertMessage}
          </div>
        )}

        {/* Current Spending */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">Current Spending</h3>
          <div className="space-y-4">
            <div className="bg-purple-200/30 dark:bg-purple-800/30 p-4 rounded-lg">
              <p className="text-purple-900 dark:text-purple-100">Weekly Total: <span className="font-bold">₹{weeklyTotal.toFixed(2)}</span></p>
              <p className="text-purple-700 dark:text-purple-300">Limit: ₹{weeklyLimit}</p>
            </div>
            <div className="bg-purple-200/30 dark:bg-purple-800/30 p-4 rounded-lg">
              <p className="text-purple-900 dark:text-purple-100">Monthly Total: <span className="font-bold">₹{monthlyTotal.toFixed(2)}</span></p>
              <p className="text-purple-700 dark:text-purple-300">Limit: ₹{monthlyLimit}</p>
            </div>
          </div>
        </div>

        {/* Limit Settings */}
        <div>
          <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">Set Limits</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-purple-900 dark:text-purple-100 mb-2">Weekly Limit (₹)</label>
              <input
                type="number"
                value={weeklyLimit}
                onChange={(e) => handleLimitChange('weekly', e.target.value)}
                className="w-full px-4 py-2 bg-purple-100/50 border border-purple-400/50 rounded-lg text-purple-900 dark:bg-purple-800/50 dark:text-purple-100"
              />
            </div>
            <div>
              <label className="block text-purple-900 dark:text-purple-100 mb-2">Monthly Limit (₹)</label>
              <input
                type="number"
                value={monthlyLimit}
                onChange={(e) => handleLimitChange('monthly', e.target.value)}
                className="w-full px-4 py-2 bg-purple-100/50 border border-purple-400/50 rounded-lg text-purple-900 dark:bg-purple-800/50 dark:text-purple-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingLimits;