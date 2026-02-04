import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaMoon, FaSun, FaPlus, FaChartBar } from 'react-icons/fa';

const Navbar = ({ isAuthenticated, setIsAuthenticated, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg dark:bg-gray-900/80 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img
              src="https://imgs.search.brave.com/doZBybh_34GMOjujObbXBElY0nJnWsPlMHBsMnXPM38/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hcGku/bG9nby5jb20vYXBp/L3YyL2ltYWdlcz9k/ZXNpZ249bGdfYUg0/bHlwOThrSUoya0Vh/SFA2JnU9MTc1MDc2/NjUwNTk0OSZ3aWR0/aD02MDAmaGVpZ2h0/PTYwMCZtYXJnaW5z/PTIwMCZmaXQ9Y29u/dGFpbiZmb3JtYXQ9/d2VicCZxdWFsaXR5/PTYwJnRpZ2h0Qm91/bmRzPXRydWU"
              alt="Logo"
              className="h-8 w-8 rounded-full shadow-md cursor-pointer"
            />
            <h1 className="text-xl font-bold text-white dark:text-gray-100">Expense Tracker</h1>
          </div>
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-white dark:text-gray-100 hover:text-blue-300 transition duration-300 flex items-center space-x-1">
                <FaUser className="text-sm" /> <span>Dashboard</span>
              </Link>
              <Link to="/add-expense" className="text-white dark:text-gray-100 hover:text-blue-300 transition duration-300 flex items-center space-x-1">
                <FaPlus className="text-sm" /> <span>Add Expense</span>
              </Link>
              <Link to="/category-stats" className="text-white dark:text-gray-100 hover:text-blue-300 transition duration-300 flex items-center space-x-1">
                 <FaChartBar className="text-sm" /> <span>Category Stats</span>
              </Link>
                <Link to="/monthly-stats" className="text-white dark:text-gray-100 hover:text-blue-300 transition duration-300 flex items-center space-x-1">
                <FaChartBar className="text-sm" /> <span>Monthly Stats</span>
                 </Link>
              <button onClick={toggleDarkMode} className="text-white dark:text-gray-100 hover:text-blue-300 transition duration-300 p-2 rounded-full hover:bg-white/10">
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 flex items-center space-x-1">
                <FaSignOutAlt className="text-sm" /> <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;