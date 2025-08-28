import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { Play, Pause, Square, Settings, TrendingUp, AlertTriangle, RotateCcw } from 'lucide-react';
import { useDisasterData } from '../hooks/useDisasterData';

const Simulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState('earthquake');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [simulationData, setSimulationData] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const { earthquakes, weatherAlerts, wildfires, total } = useDisasterData();

  const disasterTypes = [
    { 
      id: 'earthquake', 
      name: 'Earthquake', 
      color: '#ff6b35',
      theme: {
        primary: '#ff6b35',
        secondary: '#ff8c42',
        accent: '#ffa726',
        gradient: 'from-orange-900 via-red-900 to-slate-900'
      }
    },
    { 
      id: 'flood', 
      name: 'Flood', 
      color: '#4dabf7',
      theme: {
        primary: '#4dabf7',
        secondary: '#339af0',
        accent: '#74c0fc',
        gradient: 'from-blue-900 via-cyan-900 to-slate-900'
      }
    },
    { 
      id: 'wildfire', 
      name: 'Wildfire', 
      color: '#ff8787',
      theme: {
        primary: '#ff8787',
        secondary: '#ff6b6b',
        accent: '#ffa8a8',
        gradient: 'from-red-900 via-orange-900 to-slate-900'
      }
    },
    { 
      id: 'hurricane', 
      name: 'Hurricane', 
      color: '#9775fa',
      theme: {
        primary: '#9775fa',
        secondary: '#845ef7',
        accent: '#b197fc',
        gradient: 'from-purple-900 via-indigo-900 to-slate-900'
      }
    }
  ];

  const getRegionMultiplier = (region) => {
    const multipliers = {
      'global': { population: 1, infrastructure: 1, preparedness: 1 },
      'asia': { population: 1.5, infrastructure: 0.8, preparedness: 0.7 },
      'north-america': { population: 0.8, infrastructure: 1.2, preparedness: 1.3 },
      'europe': { population: 0.9, infrastructure: 1.1, preparedness: 1.2 },
      'south-america': { population: 1.1, infrastructure: 0.7, preparedness: 0.6 },
      'africa': { population: 1.3, infrastructure: 0.5, preparedness: 0.4 },
      'oceania': { population: 0.6, infrastructure: 1.0, preparedness: 1.1 },
      'india': { population: 2.0, infrastructure: 0.6, preparedness: 0.5 },
      'usa': { population: 0.8, infrastructure: 1.3, preparedness: 1.4 },
      'japan': { population: 1.2, infrastructure: 1.4, preparedness: 1.5 },
      'indonesia': { population: 1.8, infrastructure: 0.7, preparedness: 0.6 },
      'turkey': { population: 1.1, infrastructure: 0.8, preparedness: 0.7 },
      'china': { population: 1.6, infrastructure: 0.9, preparedness: 0.8 }
    };
    return multipliers[region] || multipliers['global'];
  };

  const getRegionPopulation = (region) => {
    const populations = {
      'global': '780',
      'asia': '460',
      'north-america': '37',
      'europe': '74',
      'south-america': '43',
      'africa': '134',
      'oceania': '4.5',
      'india': '140',
      'usa': '33',
      'japan': '12.5',
      'indonesia': '27',
      'turkey': '8.4',
      'china': '142'
    };
    return populations[region] || populations['global'];
  };

  const getRegionInfrastructure = (region) => {
    const infrastructure = {
      'global': '72',
      'asia': '65',
      'north-america': '88',
      'europe': '85',
      'south-america': '58',
      'africa': '45',
      'oceania': '78',
      'india': '55',
      'usa': '92',
      'japan': '95',
      'indonesia': '62',
      'turkey': '68',
      'china': '75'
    };
    return infrastructure[region] || infrastructure['global'];
  };

  const getRegionReadiness = (region) => {
    const readiness = {
      'global': '68',
      'asia': '62',
      'north-america': '85',
      'europe': '82',
      'south-america': '52',
      'africa': '38',
      'oceania': '76',
      'india': '48',
      'usa': '88',
      'japan': '92',
      'indonesia': '56',
      'turkey': '64',
      'china': '71'
    };
    return readiness[region] || readiness['global'];
  };

  const generateSimulationData = (disaster, region, time) => {
    const baseData = [];
    const regionMultiplier = getRegionMultiplier(region);
    
    for (let i = 0; i <= time; i++) {
      let casualties, evacuated, infrastructure;
      
      switch (disaster) {
        case 'earthquake':
          casualties = Math.floor((Math.random() * 100 + i * 15) * regionMultiplier.population);
          evacuated = Math.floor((Math.random() * 1000 + i * 200) * regionMultiplier.population);
          infrastructure = Math.max(0, (100 - i * 8) * regionMultiplier.infrastructure);
          break;
        case 'flood':
          casualties = Math.floor((Math.random() * 50 + i * 8) * regionMultiplier.population);
          evacuated = Math.floor((Math.random() * 2000 + i * 300) * regionMultiplier.population);
          infrastructure = Math.max(0, (100 - i * 6) * regionMultiplier.infrastructure);
          break;
        case 'wildfire':
          casualties = Math.floor((Math.random() * 30 + i * 5) * regionMultiplier.population);
          evacuated = Math.floor((Math.random() * 800 + i * 150) * regionMultiplier.population);
          infrastructure = Math.max(0, (100 - i * 10) * regionMultiplier.infrastructure);
          break;
        case 'hurricane':
          casualties = Math.floor((Math.random() * 80 + i * 12) * regionMultiplier.population);
          evacuated = Math.floor((Math.random() * 1500 + i * 250) * regionMultiplier.population);
          infrastructure = Math.max(0, (100 - i * 7) * regionMultiplier.infrastructure);
          break;
        default:
          casualties = 0;
          evacuated = 0;
          infrastructure = 100;
      }

      // Apply preparedness factor to reduce casualties
      casualties = Math.floor(casualties / regionMultiplier.preparedness);
      
      baseData.push({
        time: i,
        casualties,
        evacuated,
        infrastructure: Math.floor(infrastructure),
        economicLoss: casualties * 10000 + (100 - infrastructure) * 50000,
        region: region
      });
    }
    return baseData;
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          setSimulationData(generateSimulationData(selectedDisaster, selectedRegion, newTime));
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, selectedDisaster, selectedRegion]);

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentTime(0);
    setSimulationData([]);
  };

  const impactData = [
    { name: 'Casualties', value: simulationData[currentTime]?.casualties || 0, color: '#ff6b6b' },
    { name: 'Evacuated', value: simulationData[currentTime]?.evacuated || 0, color: '#4ecdc4' },
    { name: 'Economic Loss', value: (simulationData[currentTime]?.economicLoss || 0) / 1000000, color: '#45b7d1' }
  ];

  const currentTheme = disasterTypes.find(d => d.id === selectedDisaster)?.theme || disasterTypes[0].theme;

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-futuristic font-bold mb-4">
            <span className="text-white">Terra</span>
            <span className="text-disaster-red">Alert</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Run real-time disaster simulations to understand impact and prepare response strategies
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glassmorphism rounded-xl border p-6 mb-8"
          style={{ borderColor: `${currentTheme.primary}40` }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              {/* Disaster Selection */}
              <div className="flex flex-col space-y-2">
                <label className="text-white font-semibold">Select Disaster Type:</label>
                <div className="flex flex-wrap gap-2">
                  {disasterTypes.map((disaster) => (
                    <button
                      key={disaster.id}
                      onClick={() => {
                        setSelectedDisaster(disaster.id);
                        resetSimulation();
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedDisaster === disaster.id
                          ? 'bg-disaster-red text-white'
                          : 'bg-disaster-gray text-gray-300 hover:bg-disaster-red/20'
                      }`}
                    >
                      {disaster.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region Selection */}
              <div className="flex flex-col space-y-2">
                <label className="text-white font-semibold">Select Region:</label>
                <select 
                  className="px-4 py-2 rounded-lg bg-disaster-gray text-white border border-disaster-red/30 focus:border-disaster-red focus:outline-none"
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  value={selectedRegion}
                >
                  <option value="global">Global</option>
                  <option value="asia">Asia</option>
                  <option value="north-america">North America</option>
                  <option value="europe">Europe</option>
                  <option value="south-america">South America</option>
                  <option value="africa">Africa</option>
                  <option value="oceania">Oceania</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="japan">Japan</option>
                  <option value="indonesia">Indonesia</option>
                  <option value="turkey">Turkey</option>
                  <option value="china">China</option>
                </select>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center space-x-2 bg-disaster-red hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span>{isRunning ? 'Pause' : 'Start'}</span>
              </button>
              
              <button
                onClick={resetSimulation}
                className="flex items-center space-x-2 glassmorphism border border-disaster-red/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:border-disaster-red"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Time Display */}
          <div className="mt-4 text-center">
            <div className="text-2xl font-futuristic font-bold text-disaster-red">
              Time: {currentTime} hours
            </div>
            <div className="text-gray-300">
              Simulating {disasterTypes.find(d => d.id === selectedDisaster)?.name} impact in {selectedRegion === 'global' ? 'Global' : selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1).replace('-', ' ')}
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Impact Over Time */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glassmorphism rounded-xl border border-disaster-red/20 p-6"
          >
            <h3 className="text-xl font-futuristic font-bold text-white mb-4 flex items-center">
              <TrendingUp className="h-6 w-6 text-disaster-red mr-2" />
              Impact Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={simulationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #ff1a1a',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="casualties" 
                  stroke="#ff6b6b" 
                  strokeWidth={3}
                  dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="evacuated" 
                  stroke="#4ecdc4" 
                  strokeWidth={3}
                  dot={{ fill: '#4ecdc4', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Infrastructure Damage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glassmorphism rounded-xl border border-disaster-red/20 p-6"
          >
            <h3 className="text-xl font-futuristic font-bold text-white mb-4">
              Infrastructure Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={simulationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #ff1a1a',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="infrastructure" 
                  stroke="#45b7d1" 
                  fill="#45b7d1" 
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Economic Impact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glassmorphism rounded-xl border border-disaster-red/20 p-6"
          >
            <h3 className="text-xl font-futuristic font-bold text-white mb-4">
              Economic Loss (Millions USD)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={simulationData.slice(-10)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #ff1a1a',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${(value/1000000).toFixed(1)}M`, 'Economic Loss']}
                />
                <Bar 
                  dataKey="economicLoss" 
                  fill="#ff8787"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Current Impact Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glassmorphism rounded-xl border border-disaster-red/20 p-6"
          >
            <h3 className="text-xl font-futuristic font-bold text-white mb-4">
              Current Impact Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {impactData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-futuristic font-bold" style={{ color: item.color }}>
                    {item.name === 'Economic Loss' ? `$${item.value.toFixed(1)}M` : item.value.toLocaleString()}
                  </div>
                  <div className="text-gray-300 text-sm">{item.name}</div>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={impactData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {impactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #ff1a1a',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Simulation Parameters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 glassmorphism rounded-xl border border-disaster-red/20 p-6"
        >
          <h3 className="text-xl font-futuristic font-bold text-white mb-4 flex items-center">
            <Settings className="h-6 w-6 text-disaster-red mr-2" />
            Simulation Parameters
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <label className="block text-white font-semibold mb-3">Population Density</label>
              <div className="bg-disaster-gray/30 rounded-lg p-4 border border-disaster-red/20">
                <div className="text-3xl font-futuristic font-bold text-disaster-red mb-1">
                  {getRegionPopulation(selectedRegion)}
                </div>
                <div className="text-gray-300 text-sm">Crore People</div>
              </div>
            </div>
            <div className="text-center">
              <label className="block text-white font-semibold mb-3">Infrastructure Quality</label>
              <div className="bg-disaster-gray/30 rounded-lg p-4 border border-disaster-red/20">
                <div className="text-3xl font-futuristic font-bold text-blue-400 mb-1">
                  {getRegionInfrastructure(selectedRegion)}%
                </div>
                <div className="text-gray-300 text-sm">Quality Index</div>
              </div>
            </div>
            <div className="text-center">
              <label className="block text-white font-semibold mb-3">Response Readiness</label>
              <div className="bg-disaster-gray/30 rounded-lg p-4 border border-disaster-red/20">
                <div className="text-3xl font-futuristic font-bold text-green-400 mb-1">
                  {getRegionReadiness(selectedRegion)}%
                </div>
                <div className="text-gray-300 text-sm">Preparedness Level</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Simulation;
