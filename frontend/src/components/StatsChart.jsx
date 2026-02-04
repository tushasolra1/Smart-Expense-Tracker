import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatsChart = ({ data, type }) => {
  const chartData = {
    labels: data.map(item => type === 'Category' ? item._id : item._id),
    datasets: [{
      label: 'Amount (₹)',
      data: data.map(item => item.totalAmount),
      backgroundColor: type === 'Category' ? ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] : '#36A2EB',
      borderColor: '#fff',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: { 
        display: true, 
        text: `${type} Stats`,
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h2 className="text-4xl font-bold text-white dark:text-gray-100 text-center">{type} Stats</h2>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StatsChart;