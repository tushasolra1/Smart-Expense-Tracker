import { useState, useEffect } from 'react';
import api from '../utils/api';

const Profile = () => {
  const [user, setUser] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/expenses');
        const expenses = res.data;
        setTotalExpenses(expenses.reduce((sum, exp) => sum + exp.amount, 0));
        // Assume user data is in localStorage or API
        setUser({ name: 'John Doe', email: 'john@example.com' }); // Replace with actual user data
      } catch (error) {
        console.error('Error fetching data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Profile;