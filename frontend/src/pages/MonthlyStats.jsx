import { useState, useEffect } from 'react';
import api from '../utils/api';
import StatsChart from '../components/StatsChart';

const MonthlyStats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  setData([
    { _id: '2025-10', totalAmount: 490, transactions: 3 },
    { _id: '2025-01', totalAmount: 180, transactions: 1 },
  ]);
  setLoading(false);
}, []);


  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <StatsChart data={data} type="Monthly" />;
};

export default MonthlyStats;