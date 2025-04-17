import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import EnvironmentalNews from '../components/EnvironmentalNews';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Home = () => {
  const [activeTab, setActiveTab] = useState('global');
  const [hoveredStat, setHoveredStat] = useState(null);

  const globalData = {
    labels: ['Transportation', 'Electricity', 'Industry', 'Agriculture', 'Buildings'],
    datasets: [
      {
        label: 'Global CO₂ Emissions by Sector (%)',
        data: [24, 25, 21, 14, 16],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const householdData = {
    labels: ['Heating/Cooling', 'Water Heating', 'Lighting', 'Appliances', 'Electronics'],
    datasets: [
      {
        label: 'Average Household Energy Use (%)',
        data: [45, 18, 12, 15, 10],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
  };

  const stats = [
    { value: '25%', label: 'Average energy savings potential', icon: '⚡' },
    { value: '2.5T', label: 'Tons of CO₂ reduced annually', icon: '🌱' },
    { value: '$500', label: 'Average annual savings per household', icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-green-800 mb-6"
          >
            Track Your Energy Consumption
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Calculate your carbon footprint and discover ways to reduce your environmental impact
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/calculator"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Energy Calculator
              </h3>
              <p className="text-gray-600">
                Calculate your energy consumption and carbon footprint based on your appliance usage
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-green-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Personalized Tips
              </h3>
              <p className="text-gray-600">
                Get customized energy-saving tips based on your lifestyle and home setup
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-green-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Environmental Impact
              </h3>
              <p className="text-gray-600">
                Understand your environmental impact and track your progress over time
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <EnvironmentalNews />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="grid md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
              hoveredStat === index ? 'ring-2 ring-green-500' : ''
            }`}
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div className="text-5xl mb-4">{stat.icon}</div>
            <h3 className="text-4xl font-bold text-green-600 mb-2">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('global')}
            className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'global' 
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Global Impact
          </button>
          <button
            onClick={() => setActiveTab('household')}
            className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'household' 
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Household Usage
          </button>
        </div>
        
        <div className="h-96 transition-all duration-500">
          {activeTab === 'global' ? (
            <Pie data={globalData} options={options} />
          ) : (
            <Bar data={householdData} options={options} />
          )}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Impact Matters</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-2xl mr-2">🌿</span>
              Environmental Benefits
            </h3>
            <ul className="space-y-3">
              {['Reduce greenhouse gas emissions', 'Conserve natural resources', 'Protect ecosystems and wildlife', 'Improve air quality'].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-2xl mr-2">💰</span>
              Financial Benefits
            </h3>
            <ul className="space-y-3">
              {['Lower electricity bills', 'Increased property value', 'Tax incentives and rebates', 'Long-term cost savings'].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
        <Link 
          to="/calculator" 
          className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Calculate Now
        </Link>
      </section>
    </div>
  );
};

export default Home; 