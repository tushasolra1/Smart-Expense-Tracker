import { useState, useEffect } from 'react';
import api from '../utils/api';
import StatsChart from '../components/StatsChart';

const CategoryStats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  setData([
    { _id: 'Food', totalAmount: 490, count: 3 },
    { _id: 'Transport', totalAmount: 180, count: 1 },
  ]);
  setLoading(false);
}, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <StatsChart data={data} type="Category" />;
};

export default CategoryStats;