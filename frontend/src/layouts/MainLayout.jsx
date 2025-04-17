import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';

const MainLayout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <AnimatedBackground />
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <img 
                  src="/favicon.png" 
                  alt="Energy Calculator Logo" 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-xl font-bold">EnergyCal</span>
              </Link>
            </div>
            
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive('/')
                    ? 'bg-green-800 text-white'
                    : 'text-green-100 hover:bg-green-800 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/calculator"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive('/calculator')
                    ? 'bg-green-800 text-white'
                    : 'text-green-100 hover:bg-green-800 hover:text-white'
                }`}
              >
                Calculator
              </Link>
              <Link
                to="/tips"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive('/tips')
                    ? 'bg-green-800 text-white'
                    : 'text-green-100 hover:bg-green-800 hover:text-white'
                }`}
              >
                Tips
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About EnergyCal</h3>
              <p className="text-green-100">
                Track your energy consumption and reduce your carbon footprint with our easy-to-use calculator.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-green-100 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/calculator" className="text-green-100 hover:text-white">
                    Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/tips" className="text-green-100 hover:text-white">
                    Tips
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-green-100">
                Have questions? Reach out to us at support@energycal.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-500 text-center text-green-100">
            <p>&copy; {new Date().getFullYear()} EnergyCal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 