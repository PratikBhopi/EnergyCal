import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tips = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [questionnaireStep, setQuestionnaireStep] = useState(0);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({});
  const [personalizedTips, setPersonalizedTips] = useState([]);

  const commonQuestions = [
    "How can I reduce my electricity bill?",
    "What are the best energy-saving appliances?",
    "How to make my home more energy efficient?",
    "Tips for reducing AC usage?",
    "Best practices for water heating?"
  ];

  const questionnaire = [
    {
      question: "What type of home do you live in?",
      options: ["Apartment", "House", "Condo", "Other"],
      key: "homeType"
    },
    {
      question: "How many people live in your household?",
      options: ["1-2", "3-4", "5+"],
      key: "householdSize"
    },
    {
      question: "What's your primary heating source?",
      options: ["Electric", "Gas", "Oil", "Other"],
      key: "heatingSource"
    },
    {
      question: "Do you have air conditioning?",
      options: ["Yes", "No"],
      key: "hasAC"
    },
    {
      question: "How old are your major appliances?",
      options: ["Less than 5 years", "5-10 years", "More than 10 years"],
      key: "applianceAge"
    }
  ];

  const tipCategories = {
    lighting: {
      title: "Lighting Tips",
      icon: "💡",
      tips: [
        "Switch to LED bulbs - they use 75% less energy and last 25 times longer than incandescent bulbs",
        "Use natural light during the day by opening curtains and blinds",
        "Install motion sensors for outdoor lighting to prevent unnecessary usage",
        "Consider smart lighting systems that can be controlled remotely",
        "Use task lighting instead of lighting entire rooms",
        "Clean light fixtures regularly to maintain maximum brightness"
      ]
    },
    heating: {
      title: "Heating & Cooling Tips",
      icon: "🌡️",
      tips: [
        "Set your thermostat to 24°C in summer and 20°C in winter for optimal efficiency",
        "Use ceiling fans to help circulate air - they can make a room feel 4°C cooler",
        "Regularly clean or replace HVAC filters every 1-3 months",
        "Seal air leaks around windows and doors with weatherstripping",
        "Use programmable thermostats to automatically adjust temperatures",
        "Consider installing a heat pump for more efficient heating and cooling"
      ]
    },
    appliances: {
      title: "Appliance Tips",
      icon: "🔌",
      tips: [
        "Unplug devices when not in use to prevent phantom energy consumption",
        "Use energy-efficient appliances (look for Energy Star rating)",
        "Run full loads in dishwasher and washing machine",
        "Clean refrigerator coils regularly for better efficiency",
        "Use microwave or toaster oven instead of full-size oven for small meals",
        "Defrost your freezer regularly to maintain efficiency"
      ]
    },
    water: {
      title: "Water Heating Tips",
      icon: "🚰",
      tips: [
        "Lower your water heater temperature to 49°C",
        "Install low-flow showerheads and faucets",
        "Fix leaky faucets promptly - a single drip can waste 20 gallons per day",
        "Insulate your water heater and pipes",
        "Take shorter showers and use cold water for laundry when possible",
        "Consider a tankless water heater for more efficient heating"
      ]
    },
    general: {
      title: "General Tips",
      icon: "🌱",
      tips: [
        "Conduct an energy audit to identify areas for improvement",
        "Use power strips to easily turn off multiple devices",
        "Plant trees for natural shade and wind protection",
        "Use window treatments to control heat gain/loss",
        "Consider solar panels for renewable energy generation",
        "Educate family members about energy-saving practices"
      ]
    }
  };

  const getContextualResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("light") || lowerQuestion.includes("bulb")) {
      return {
        category: "lighting",
        response: "Here are some detailed lighting tips to help you save energy:",
        tips: tipCategories.lighting.tips
      };
    } else if (lowerQuestion.includes("heat") || lowerQuestion.includes("cool") || 
               lowerQuestion.includes("ac") || lowerQuestion.includes("temperature")) {
      return {
        category: "heating",
        response: "Here are some heating and cooling tips to optimize your energy usage:",
        tips: tipCategories.heating.tips
      };
    } else if (lowerQuestion.includes("appliance") || lowerQuestion.includes("device") || 
               lowerQuestion.includes("machine")) {
      return {
        category: "appliances",
        response: "Here are some appliance-specific tips to reduce energy consumption:",
        tips: tipCategories.appliances.tips
      };
    } else if (lowerQuestion.includes("water") || lowerQuestion.includes("shower") || 
               lowerQuestion.includes("bath")) {
      return {
        category: "water",
        response: "Here are some water heating and usage tips to save energy:",
        tips: tipCategories.water.tips
      };
    } else {
      return {
        category: "general",
        response: "Here are some general energy-saving tips that can help you reduce your consumption:",
        tips: tipCategories.general.tips
      };
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: userInput,
      isUser: true
    };

    setMessages(prev => [...prev, newMessage]);
    setUserInput('');

    // Get contextual response
    const response = getContextualResponse(userInput);
    
    // Simulate bot response with delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: response.response,
        isUser: false,
        tips: response.tips.map(tip => ({
          icon: tipCategories[response.category].icon,
          title: tipCategories[response.category].title,
          content: tip
        }))
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuestionnaireAnswer = (answer) => {
    const currentQuestion = questionnaire[questionnaireStep];
    setQuestionnaireAnswers(prev => ({
      ...prev,
      [currentQuestion.key]: answer
    }));

    if (questionnaireStep < questionnaire.length - 1) {
      setQuestionnaireStep(prev => prev + 1);
    } else {
      // Generate tips based on all answers
      const tips = generatePersonalizedTips({
        ...questionnaireAnswers,
        [currentQuestion.key]: answer
      });
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "Based on your answers, here are personalized tips for you:",
        isUser: false,
        tips: tips
      }]);
    }
  };

  const generatePersonalizedTips = (answers) => {
    const tips = [];
    
    // Home type specific tips
    if (answers.homeType === "Apartment") {
      tips.push({
        icon: "🏢",
        title: "Apartment Living",
        content: "Use window films to reduce heat gain in summer and heat loss in winter. Consider using a programmable thermostat if allowed. Install energy-efficient window coverings and use draft stoppers for doors.",
        impact: "Can reduce heating/cooling costs by up to 20%"
      });
    } else if (answers.homeType === "House") {
      tips.push({
        icon: "🏠",
        title: "House Maintenance",
        content: "Regularly check and maintain your home's insulation. Consider installing solar panels if your roof gets good sunlight. Schedule annual HVAC maintenance and seal any air leaks in the foundation.",
        impact: "Proper insulation can save up to 15% on heating and cooling costs"
      });
    } else if (answers.homeType === "Condo") {
      tips.push({
        icon: "🏘️",
        title: "Condo Efficiency",
        content: "Take advantage of shared walls for natural insulation. Use energy-efficient window treatments and consider smart home devices for better control. Check with your HOA about energy-saving upgrades.",
        impact: "Smart thermostats can save up to 10% on heating and cooling"
      });
    }

    // Household size tips
    if (answers.householdSize === "1-2") {
      tips.push({
        icon: "👥",
        title: "Small Household Tips",
        content: "Use smaller appliances when possible. Consider a mini-split system for heating/cooling. Use power strips to easily control multiple devices. Schedule laundry and dishwashing for full loads.",
        impact: "Can reduce energy usage by up to 25% compared to larger households"
      });
    } else if (answers.householdSize === "3-4") {
      tips.push({
        icon: "👨‍👩‍👧‍👦",
        title: "Medium Household Tips",
        content: "Create an energy-saving schedule for appliances. Use smart power strips for entertainment systems. Consider energy-efficient appliances for high-usage items. Implement a family energy-saving challenge.",
        impact: "Proper scheduling can reduce peak energy usage by 15%"
      });
    } else if (answers.householdSize === "5+") {
      tips.push({
        icon: "👨‍👩‍👧‍👦",
        title: "Large Family Tips",
        content: "Schedule laundry and dishwashing during off-peak hours. Use energy-efficient appliances and consider bulk cooking. Implement a rotating schedule for showers and appliance usage. Consider a smart home system for better control.",
        impact: "Off-peak usage can save up to 30% on electricity costs"
      });
    }

    // Heating source tips
    if (answers.heatingSource === "Electric") {
      tips.push({
        icon: "⚡",
        title: "Electric Heating",
        content: "Consider using a heat pump instead of traditional electric heaters. They can be up to 3 times more efficient. Use programmable thermostats and zone heating. Insulate your home well to prevent heat loss.",
        impact: "Heat pumps can reduce heating costs by up to 50%"
      });
    } else if (answers.heatingSource === "Gas") {
      tips.push({
        icon: "🔥",
        title: "Gas Heating",
        content: "Regularly maintain your gas heating system. Consider installing a programmable thermostat to optimize usage. Check for gas leaks and ensure proper ventilation. Use zone heating when possible.",
        impact: "Proper maintenance can improve efficiency by 15-20%"
      });
    } else if (answers.heatingSource === "Oil") {
      tips.push({
        icon: "⛽",
        title: "Oil Heating",
        content: "Schedule regular maintenance for your oil heating system. Consider upgrading to a more efficient model. Insulate your oil tank and pipes. Use a programmable thermostat to optimize usage.",
        impact: "Newer oil systems can be up to 30% more efficient"
      });
    }

    // AC tips
    if (answers.hasAC === "Yes") {
      tips.push({
        icon: "❄️",
        title: "AC Optimization",
        content: "Set your AC to 24-26°C for optimal efficiency. Use ceiling fans to help circulate cool air. Clean or replace filters monthly. Consider a smart thermostat for better control. Use window coverings to block heat.",
        impact: "Each degree above 24°C can save 3-5% on cooling costs"
      });
    } else {
      tips.push({
        icon: "🌬️",
        title: "Natural Cooling",
        content: "Use cross-ventilation by opening windows on opposite sides. Install ceiling fans for better air circulation. Use window coverings to block heat. Consider portable or window AC units for specific rooms.",
        impact: "Natural cooling can reduce the need for AC by up to 40%"
      });
    }

    // Appliance age tips
    if (answers.applianceAge === "Less than 5 years") {
      tips.push({
        icon: "🔄",
        title: "New Appliance Care",
        content: "Regularly clean and maintain your appliances. Use energy-saving modes when available. Keep refrigerator coils clean and check door seals. Run full loads in dishwasher and washing machine.",
        impact: "Proper maintenance can extend appliance life by 5-10 years"
      });
    } else if (answers.applianceAge === "5-10 years") {
      tips.push({
        icon: "🔍",
        title: "Appliance Monitoring",
        content: "Monitor energy usage of older appliances. Consider replacing the most energy-intensive ones. Clean and maintain regularly. Use energy-saving settings and run during off-peak hours.",
        impact: "Older appliances can use 20-30% more energy than new ones"
      });
    } else if (answers.applianceAge === "More than 10 years") {
      tips.push({
        icon: "🔄",
        title: "Appliance Upgrade",
        content: "Consider replacing old appliances with Energy Star certified models. Newer models can be up to 50% more energy efficient. Look for rebates and tax credits. Prioritize replacing the most used appliances first.",
        impact: "New Energy Star appliances can save up to 50% on energy costs"
      });
    }

    // Add some general tips based on the combination of answers
    if (answers.hasAC === "Yes" && answers.heatingSource === "Electric") {
      tips.push({
        icon: "🌡️",
        title: "HVAC Optimization",
        content: "Consider a heat pump system that can handle both heating and cooling. Use a smart thermostat to optimize temperature settings. Ensure proper insulation and seal air leaks.",
        impact: "Can reduce HVAC costs by up to 40%"
      });
    }

    if (answers.householdSize === "5+" && answers.applianceAge === "More than 10 years") {
      tips.push({
        icon: "🏠",
        title: "Large Family Appliance Strategy",
        content: "Create an appliance upgrade plan, starting with the most used items. Consider energy-efficient models with larger capacities. Implement a schedule for appliance usage to avoid peak hours.",
        impact: "Strategic upgrades can save up to $500 annually"
      });
    }

    // Add some general tips that apply to everyone
    tips.push(
      {
        icon: "💡",
        title: "Lighting",
        content: "Switch to LED bulbs. They use 75% less energy and last 25 times longer than incandescent bulbs. Use motion sensors for outdoor lighting and dimmers where appropriate.",
        impact: "Can reduce lighting costs by up to 75%"
      },
      {
        icon: "🚰",
        title: "Water Heating",
        content: "Lower your water heater temperature to 49°C. For every 10°F reduction, you can save 3-5% on water heating costs. Insulate your water heater and pipes. Fix any leaks promptly.",
        impact: "Can reduce water heating costs by 10-15%"
      },
      {
        icon: "🔌",
        title: "Standby Power",
        content: "Unplug electronics when not in use. Standby power can account for up to 10% of your electricity bill. Use smart power strips to easily control multiple devices.",
        impact: "Can save up to $100 annually on standby power"
      }
    );

    return tips;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-xl shadow-lg backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6 text-green-800">Energy Saving Tips</h1>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === 'chat'
                ? 'bg-green-500 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Ask Questions
          </button>
          <button
            onClick={() => setActiveTab('questionnaire')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === 'questionnaire'
                ? 'bg-green-500 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Get Personalized Tips
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'chat' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="h-96 overflow-y-auto bg-white/80 rounded-lg p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.isUser
                          ? 'bg-green-500 text-white'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.text}</p>
                      {message.tips && (
                        <div className="mt-4 space-y-4">
                          {message.tips.map((tip, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white/80 p-4 rounded-lg shadow-sm transform hover:scale-105 transition-all duration-300"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-2xl">{tip.icon}</span>
                                <h3 className="font-semibold">{tip.title}</h3>
                              </div>
                              <p className="text-green-700">{tip.content}</p>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {commonQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setUserInput(question)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-all duration-300"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask about energy saving tips..."
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                  >
                    Send
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {questionnaireStep < questionnaire.length ? (
                <div className="bg-white/80 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-green-700">
                    {questionnaire[questionnaireStep].question}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questionnaire[questionnaireStep].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuestionnaireAnswer(option)}
                        className="p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all duration-300"
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-green-600">
                    Question {questionnaireStep + 1} of {questionnaire.length}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white/80 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-green-700">
                      Thank you for completing the questionnaire!
                    </h2>
                    <p className="text-green-600 mb-4">
                      Based on your answers, here are personalized tips to help you save energy and reduce your carbon footprint.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setQuestionnaireStep(0);
                        setQuestionnaireAnswers({});
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                    >
                      Start Over
                    </motion.button>
                  </div>

                  {messages[messages.length - 1]?.tips && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {messages[messages.length - 1].tips.map((tip, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/80 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3 mb-4">
                            <span className="text-3xl">{tip.icon}</span>
                            <h3 className="text-lg font-semibold text-green-700">{tip.title}</h3>
                          </div>
                          <p className="text-green-600 mb-4">{tip.content}</p>
                          {tip.impact && (
                            <div className="bg-green-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-green-700">Potential Impact:</p>
                              <p className="text-sm text-green-600">{tip.impact}</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tips; 