import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-50">
      <AnimatedBackground />
      
      <nav className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 shadow-lg relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-green-200 transition-colors duration-300">
            EnergyCal
          </Link>
          <div className="space-x-6">
            <Link 
              to="/" 
              className="hover:text-green-200 transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/calculator" 
              className="hover:text-green-200 transition-colors duration-300 relative group"
            >
              Calculator
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/tips" 
              className="hover:text-green-200 transition-colors duration-300 relative group"
            >
              Energy Tips
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4 relative z-10">
        {children}
      </main>

      <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white p-6 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EnergyCal</h3>
              <p className="text-green-200">
                Calculate your carbon footprint and discover ways to reduce your energy consumption.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-green-200 hover:text-white transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/calculator" className="text-green-200 hover:text-white transition-colors duration-300">
                    Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/tips" className="text-green-200 hover:text-white transition-colors duration-300">
                    Energy Tips
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-green-200">
                Have questions? Reach out to us at<br />
                <a href="mailto:info@energycal.com" className="hover:text-white transition-colors duration-300">
                  info@energycal.com
                </a>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-green-700 text-center text-green-300">
            <p>© 2024 EnergyCal - Carbon Footprint & Energy Calculator</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 