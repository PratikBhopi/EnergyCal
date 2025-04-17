import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Calculator = () => {
  const [appliances, setAppliances] = useState([{ name: '', power: '', hours: '' }]);
  const [unitPrice, setUnitPrice] = useState(0.12); // Default price per kWh
  const [results, setResults] = useState(null);
  const [tips, setTips] = useState([]);

  const commonAppliances = [
    { name: 'LED Bulb', power: 10, hours: 8 },
    { name: 'CFL Bulb', power: 15, hours: 8 },
    { name: 'Ceiling Fan', power: 75, hours: 12 },
    { name: 'AC (1.5 Ton)', power: 1500, hours: 8 },
    { name: 'Refrigerator', power: 150, hours: 24 },
    { name: 'TV', power: 100, hours: 4 },
    { name: 'Washing Machine', power: 500, hours: 1 },
    { name: 'Microwave', power: 1000, hours: 0.5 },
  ];

  const calculateResults = () => {
    let totalEnergy = 0;
    let totalCost = 0;
    let totalCarbon = 0;
    const applianceBreakdown = [];

    appliances.forEach(appliance => {
      if (appliance.name && appliance.power && appliance.hours) {
        const dailyEnergy = (parseFloat(appliance.power) * parseFloat(appliance.hours)) / 1000; // kWh
        const monthlyEnergy = dailyEnergy * 30;
        const monthlyCost = monthlyEnergy * unitPrice;
        const monthlyCarbon = monthlyEnergy * 0.92; // kg CO2 per kWh

        totalEnergy += monthlyEnergy;
        totalCost += monthlyCost;
        totalCarbon += monthlyCarbon;

        applianceBreakdown.push({
          name: appliance.name,
          energy: monthlyEnergy,
          cost: monthlyCost,
          carbon: monthlyCarbon
        });
      }
    });

    setResults({
      totalEnergy,
      totalCost,
      totalCarbon,
      breakdown: applianceBreakdown
    });

    generateTips(totalEnergy, totalCarbon, applianceBreakdown);
  };

  const generateTips = (totalEnergy, totalCarbon, breakdown) => {
    const newTips = [];

    // High energy usage tips
    if (totalEnergy > 500) {
      newTips.push({
        type: 'warning',
        message: 'Your energy consumption is above average. Consider implementing energy-saving measures.',
        icon: '⚠️'
      });
    }

    // Appliance-specific tips
    breakdown.forEach(appliance => {
      if (appliance.energy > 100) {
        newTips.push({
          type: 'appliance',
          message: `Consider replacing ${appliance.name} with a more energy-efficient model.`,
          icon: '💡'
        });
      }
    });

    // General tips
    newTips.push(
      {
        type: 'general',
        message: 'Switch to LED bulbs to reduce lighting energy consumption by up to 75%.',
        icon: '🌱'
      },
      {
        type: 'general',
        message: 'Use natural ventilation when possible instead of AC.',
        icon: '🌬️'
      },
      {
        type: 'general',
        message: 'Unplug devices when not in use to prevent phantom energy consumption.',
        icon: '🔌'
      }
    );

    setTips(newTips);
  };

  const addAppliance = () => {
    setAppliances([...appliances, { name: '', power: '', hours: '' }]);
  };

  const handleApplianceChange = (index, field, value) => {
    const newAppliances = [...appliances];
    newAppliances[index][field] = value;
    setAppliances(newAppliances);
  };

  const handleCommonApplianceSelect = (appliance) => {
    const newAppliances = [...appliances];
    newAppliances[newAppliances.length - 1] = { ...appliance };
    setAppliances([...newAppliances, { name: '', power: '', hours: '' }]);
  };

  const chartData = results ? {
    labels: results.breakdown.map(item => item.name),
    datasets: [
      {
        label: 'Energy Consumption (kWh)',
        data: results.breakdown.map(item => item.energy),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  } : null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-xl shadow-lg backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6 text-green-800">Energy Calculator</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Common Appliances</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {commonAppliances.map((appliance, index) => (
              <button
                key={index}
                onClick={() => handleCommonApplianceSelect(appliance)}
                className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-green-50"
              >
                <div className="font-medium text-green-800">{appliance.name}</div>
                <div className="text-sm text-green-600">
                  {appliance.power}W, {appliance.hours}h/day
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Add Your Appliances</h2>
          
          {appliances.map((appliance, index) => (
            <div 
              key={index} 
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 animate-fade-in"
            >
              <input
                type="text"
                placeholder="Appliance Name"
                value={appliance.name}
                onChange={(e) => handleApplianceChange(index, 'name', e.target.value)}
                className="p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
              <input
                type="number"
                placeholder="Power (Watts)"
                value={appliance.power}
                onChange={(e) => handleApplianceChange(index, 'power', e.target.value)}
                className="p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
              <input
                type="number"
                placeholder="Daily Usage (Hours)"
                value={appliance.hours}
                onChange={(e) => handleApplianceChange(index, 'hours', e.target.value)}
                className="p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
              <button
                onClick={() => {
                  const newAppliances = appliances.filter((_, i) => i !== index);
                  setAppliances(newAppliances);
                }}
                className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition-all duration-300 transform hover:scale-105"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={addAppliance}
              className="bg-green-100 text-green-600 px-4 py-2 rounded hover:bg-green-200 transition-all duration-300 transform hover:scale-105"
            >
              Add Another Appliance
            </button>
            <div className="flex items-center space-x-4">
              <label className="text-green-700">Price per kWh ($):</label>
              <input
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
                step="0.01"
                className="w-20 p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <button
          onClick={calculateResults}
          className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Calculate
        </button>
      </div>

      {results && (
        <div className="space-y-8 animate-fade-in-up">
          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                {results.totalEnergy.toFixed(2)} kWh
              </h3>
              <p className="text-green-700">Monthly Energy Usage</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                ${results.totalCost.toFixed(2)}
              </h3>
              <p className="text-green-700">Monthly Cost</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                {results.totalCarbon.toFixed(2)} kg
              </h3>
              <p className="text-green-700">Monthly Carbon Footprint</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Energy Consumption Breakdown</h2>
            <div className="h-96">
              <Bar data={chartData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
                animation: {
                  duration: 2000,
                  easing: 'easeInOutQuart',
                },
              }} />
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Personalized Energy Saving Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md flex items-start space-x-4 transform hover:scale-105 transition-all duration-300"
                >
                  <span className="text-2xl">{tip.icon}</span>
                  <p className="text-green-700">{tip.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Your Environmental Impact</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg transform hover:scale-105 transition-all duration-300">
                <span className="text-green-700">Equivalent to planting</span>
                <span className="font-bold text-green-600">
                  {(results.totalCarbon / 21.77).toFixed(1)} trees
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg transform hover:scale-105 transition-all duration-300">
                <span className="text-green-700">Equivalent to driving</span>
                <span className="font-bold text-green-600">
                  {(results.totalCarbon / 0.404).toFixed(1)} km
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg transform hover:scale-105 transition-all duration-300">
                <span className="text-green-700">Equivalent to charging</span>
                <span className="font-bold text-green-600">
                  {(results.totalEnergy / 0.05).toFixed(0)} smartphones
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator; 