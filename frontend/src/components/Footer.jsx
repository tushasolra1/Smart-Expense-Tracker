import { Link } from 'react-router-dom';
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa6";
import { FaTwitter, FaEnvelope, FaHome, FaPlus, FaChartBar, FaDollarSign } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* App Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center">
              <FaDollarSign className="mr-2 text-green-400" /> Expense Tracker
            </h3>
            <p className="text-sm text-gray-400">
              Track your expenses effortlessly with our modern, secure app. Manage your finances with ease and stay on top of your budget.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 px-35">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-gray-100 transition flex items-center justify-center">
                  <FaHome className="mr-2" /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/add-expense" className="hover:text-gray-100 transition flex items-center justify-center">
                  <FaPlus className="mr-2" /> Add Expense
                </Link>
              </li>
              <li>
                <Link to="/category-stats" className="hover:text-gray-100 transition flex items-center justify-center">
                  <FaChartBar className="mr-2" /> Stats
                </Link>
              </li>
              <li>
                <Link to="/spending-limits" className="hover:text-gray-100 transition flex items-center justify-center">
                  <FaDollarSign className="mr-2" /> Spending Limits
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 px-30">Connect with Us</h3>
            <p className="text-sm text-gray-400 mb-4 flex items-center justify-center">
              <FaEnvelope className="mr-2" /> contact@expensetracker.com
            </p>
            <div className="flex justify-center space-x-4 text-xl">
              <a
                href="https://www.linkedin.com/in/tushar-solra-4837bb23a"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.facebook.com/share/16au7CNXvd/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/tusharsolra"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/tusharsolra"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Expense Tracker. Built with ❤️ by Tushar Solra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;