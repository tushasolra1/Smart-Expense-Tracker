import { useState, useEffect } from 'react';  // ✅ Already there
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import CategoryStats from './pages/CategoryStats';
import MonthlyStats from './pages/MonthlyStats';
import Profile from './pages/Profile';  // ✅ ADD THIS
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import EditExpense from './pages/EditExpense';
import SpendingLimits from './pages/SpendingLimits';
import DevDashboard from './pages/DevDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);  // 🔥 ADD USER STATE

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

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 dark:from-gray-900 dark:via-purple-900 dark:to-purple-800">
        {/* 🔥 PASS USER TO NAVBAR */}
        <Navbar 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          user={user}
          setUser={setUser}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/add-expense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
            <Route path="/category-stats" element={<ProtectedRoute><CategoryStats /></ProtectedRoute>} />
            <Route path="/monthly-stats" element={<ProtectedRoute><MonthlyStats /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />  {/* 🔥 ADD */}
            <Route path="/edit-expense/:id" element={<ProtectedRoute><EditExpense /></ProtectedRoute>} />
            <Route path="/spending-limits" element={<ProtectedRoute><SpendingLimits /></ProtectedRoute>} />
            <Route path="/dev-dashboard" element={<DevDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;