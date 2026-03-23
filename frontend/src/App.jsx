import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import CategoryStats from './pages/CategoryStats';
import MonthlyStats from './pages/MonthlyStats';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import EditExpense from './pages/EditExpense';
import SpendingLimits from './pages/SpendingLimits';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const navbarProps = {
    isAuthenticated,
    setIsAuthenticated,
    darkMode,
    toggleDarkMode,
    user,
    setUser
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 dark:from-gray-900 dark:via-purple-900 dark:to-purple-800 flex flex-col">
        
        {/* 🔥 NAVBAR - HIDDEN ON AUTH PAGES */}
        <Navbar {...navbarProps} />
        
        <main className="flex-grow">
          <Routes>
            {/* 🔥 AUTH PAGES - NO NAVBAR */}
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
            
            {/* 🔥 PROTECTED PAGES - WITH NAVBAR */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/add-expense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
            <Route path="/category-stats" element={<ProtectedRoute><CategoryStats /></ProtectedRoute>} />
            <Route path="/monthly-stats" element={<ProtectedRoute><MonthlyStats /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/edit-expense/:id" element={<ProtectedRoute><EditExpense /></ProtectedRoute>} />
            <Route path="/spending-limits" element={<ProtectedRoute><SpendingLimits /></ProtectedRoute>} />
          </Routes>
        </main>
        
        {/* 🔥 FOOTER - HIDE ON AUTH PAGES */}
        {!isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/register') ? null : <Footer />}
      </div>
    </Router>
  );
}

export default App;