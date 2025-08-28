import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Globe, TrendingUp, AlertTriangle, Users, Clock, Zap, Flame, RefreshCw, Droplets, Wind, Flag, BarChart3 } from 'lucide-react';
import { useCountryData } from '../hooks/useCountryData';
import { useDisasterData } from '../hooks/useDisasterData';

const IndiaMonitor = () => {
  const { globalStats, loading: countryLoading } = useCountryData();
  const { total, loading, lastUpdated, refresh } = useDisasterData();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const navigate = useNavigate();

  const handleStatClick = (type) => {
    setSelectedFilter(type === selectedFilter ? null : type);
    // Scroll to the relevant section
    const element = document.getElementById('india-breakdown-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContinentClick = (continent) => {
    // Navigate to Reports page with continent filter
    navigate(`/reports?continent=${encodeURIComponent(continent.toLowerCase())}`);
  };

  // Filter India-specific data
  const indiaData = globalStats.indiaData;
  const continentStats = globalStats.continentStats || [];
  
  // Get Asia stats (India's continent)
  const asiaStats = continentStats.find(c => c.continent === 'Asia') || {};

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flag className="w-8 h-8 text-orange-400" />
            <h1 className="text-5xl font-futuristic font-bold">
              <span className="text-white">India </span>
              <span className="text-orange-400">Disaster Monitor</span>
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Comprehensive real-time disaster monitoring system for India with state-wise breakdown and continental comparison
          </p>
          
          {/* Live Status */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-400 font-medium">LIVE MONITORING</span>
            </div>
            {lastUpdated && (
              <span className="text-gray-500">
                Last Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={refresh}
              className="p-2 rounded-full hover:bg-orange-500/20 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-orange-400" />
            </button>
          </div>
        </motion.div>

        {/* India Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStatClick('total')}
            className={`bg-black/20 backdrop-blur-sm border rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
              selectedFilter === 'total' 
                ? 'border-orange-500 bg-orange-500/20' 
                : 'border-orange-500/30 hover:border-orange-500/60'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <BarChart3 className="w-6 h-6 text-orange-400" />
              <span className="text-3xl font-bold text-orange-400">
                {loading ? '...' : (indiaData?.total || 0)}
              </span>
            </div>
            <div className="text-gray-300 font-medium">Total Events</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStatClick('earthquakes')}
            className={`bg-black/20 backdrop-blur-sm border rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
              selectedFilter === 'earthquakes' 
                ? 'border-yellow-500 bg-yellow-500/20' 
                : 'border-yellow-500/30 hover:border-yellow-500/60'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-3xl font-bold text-yellow-400">
                {loading ? '...' : (indiaData?.earthquakes?.length || 0)}
              </span>
            </div>
            <div className="text-gray-300 font-medium">Earthquakes</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStatClick('alerts')}
            className={`bg-black/20 backdrop-blur-sm border rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
              selectedFilter === 'alerts' 
                ? 'border-blue-500 bg-blue-500/20' 
                : 'border-blue-500/30 hover:border-blue-500/60'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="w-6 h-6 text-blue-400" />
              <span className="text-3xl font-bold text-blue-400">
                {loading ? '...' : (indiaData?.weatherAlerts?.length || 0)}
              </span>
            </div>
            <div className="text-gray-300 font-medium">Weather Alerts</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStatClick('wildfires')}
            className={`bg-black/20 backdrop-blur-sm border rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
              selectedFilter === 'wildfires' 
                ? 'border-red-500 bg-red-500/20' 
                : 'border-red-500/30 hover:border-red-500/60'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-6 h-6 text-red-400" />
              <span className="text-3xl font-bold text-red-400">
                {loading ? '...' : (indiaData?.wildfires?.length || 0)}
              </span>
            </div>
            <div className="text-gray-300 font-medium">Wildfires</div>
          </motion.div>
        </motion.div>

        <div id="india-breakdown-section" className="grid lg:grid-cols-3 gap-8">
          
          {/* India State-wise Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-black/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-orange-400" />
              <h3 className="text-2xl font-bold text-white">State-wise Disaster Breakdown</h3>
              {selectedFilter && (
                <div className="ml-2 text-sm bg-orange-500/20 px-2 py-1 rounded">
                  <span className="capitalize text-orange-400">{selectedFilter}</span>
                  <button 
                    onClick={() => setSelectedFilter(null)}
                    className="ml-2 text-xs hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className="ml-auto text-xs text-orange-400 animate-pulse">● LIVE</div>
            </div>

            {loading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-16 bg-orange-500/10 rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {indiaData?.states?.slice(0, 15)
                  .filter(state => {
                    if (!selectedFilter) return true;
                    switch(selectedFilter) {
                      case 'earthquakes': return state.earthquakes > 0;
                      case 'alerts': return state.weatherAlerts > 0;
                      case 'wildfires': return state.wildfires > 0;
                      case 'total': return state.total > 0;
                      default: return true;
                    }
                  })
                  .map((state, index) => (
                  <motion.div
                    key={state.state}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                      selectedFilter 
                        ? 'bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30'
                        : 'bg-orange-500/5 hover:bg-orange-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
                        <div>
                          <h4 className="text-white font-semibold text-lg">{state.name}</h4>
                          <p className="text-gray-400 text-sm">Risk Level: {state.riskLevel}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {state.earthquakes > 0 && (
                          <div className="flex items-center gap-1 bg-yellow-500/20 rounded-full px-3 py-1">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 font-bold">{state.earthquakes}</span>
                          </div>
                        )}
                        
                        {state.weatherAlerts > 0 && (
                          <div className="flex items-center gap-1 bg-blue-500/20 rounded-full px-3 py-1">
                            <AlertTriangle className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 font-bold">{state.weatherAlerts}</span>
                          </div>
                        )}
                        
                        {state.wildfires > 0 && (
                          <div className="flex items-center gap-1 bg-red-500/20 rounded-full px-3 py-1">
                            <Flame className="w-4 h-4 text-red-400" />
                            <span className="text-red-400 font-bold">{state.wildfires}</span>
                          </div>
                        )}
                        
                        {state.floods > 0 && (
                          <div className="flex items-center gap-1 bg-cyan-500/20 rounded-full px-3 py-1">
                            <Droplets className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-400 font-bold">{state.floods}</span>
                          </div>
                        )}
                        
                        {state.cyclones > 0 && (
                          <div className="flex items-center gap-1 bg-purple-500/20 rounded-full px-3 py-1">
                            <Wind className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400 font-bold">{state.cyclones}</span>
                          </div>
                        )}
                        
                        <div className="text-orange-400 font-bold text-xl min-w-[3rem] text-center">
                          {state.total}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {(!indiaData?.states || indiaData.states.length === 0) && (
                    <div className="text-center py-12 text-gray-400">
                      <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No active disasters detected in Indian states</p>
                      <p className="text-sm mt-2">Data updates every 60 seconds</p>
                    </div>
                  )}
              </div>
            )}
          </motion.div>

          {/* Continent Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Continental Overview</h3>
            </div>

            <div className="space-y-4">
              {continentStats.slice(0, 6).map((continent, index) => (
                <motion.div
                  key={continent.continent}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleContinentClick(continent.continent)}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    continent.continent === 'Asia' 
                      ? 'bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20' 
                      : 'bg-gray-500/10 border-gray-500/30 hover:bg-gray-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold ${
                      continent.continent === 'Asia' ? 'text-orange-400' : 'text-white'
                    }`}>
                      {continent.continent}
                      {continent.continent === 'Asia' && (
                        <span className="ml-2 text-xs bg-orange-500/20 px-2 py-1 rounded-full">
                          INDIA
                        </span>
                      )}
                    </h4>
                    <span className={`font-bold text-lg ${
                      continent.continent === 'Asia' ? 'text-orange-400' : 'text-gray-300'
                    }`}>
                      {continent.total}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-400 mb-2">
                    {continent.countriesCount} countries affected
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs">
                    {continent.earthquakes > 0 && (
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        {continent.earthquakes}
                      </span>
                    )}
                    {continent.weatherAlerts > 0 && (
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-blue-400" />
                        {continent.weatherAlerts}
                      </span>
                    )}
                    {continent.wildfires > 0 && (
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-red-400" />
                        {continent.wildfires}
                      </span>
                    )}
                  </div>
                  
                  {continent.maxMagnitude > 0 && (
                    <div className="text-xs text-yellow-400 mt-2">
                      Max Earthquake: M{continent.maxMagnitude.toFixed(1)}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent India Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-black/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <h3 className="text-2xl font-bold text-white">Recent Indian Disasters</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Recent Earthquakes */}
            <div className={selectedFilter && selectedFilter !== 'earthquakes' ? 'opacity-50' : ''}>
              <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Earthquakes
              </h4>
              <div className="space-y-2">
                {indiaData?.earthquakes?.slice(0, 3).map((eq, index) => (
                  <motion.div
                    key={eq.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium text-sm">{eq.state}</span>
                      <span className="text-yellow-400 font-bold">M{eq.magnitude}</span>
                    </div>
                    <div className="text-xs text-gray-400">{eq.location}</div>
                    <div className="text-xs text-gray-500 mt-1">{eq.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Weather Alerts */}
            <div className={selectedFilter && selectedFilter !== 'alerts' ? 'opacity-50' : ''}>
              <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Weather Alerts
              </h4>
              <div className="space-y-2">
                {indiaData?.weatherAlerts?.slice(0, 3).map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium text-sm">{alert.state}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        alert.severity === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{alert.description}</div>
                    <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Wildfires */}
            <div className={selectedFilter && selectedFilter !== 'wildfires' ? 'opacity-50' : ''}>
              <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Wildfires
              </h4>
              <div className="space-y-2">
                {indiaData?.wildfires?.slice(0, 3).map((fire, index) => (
                  <motion.div
                    key={fire.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium text-sm">{fire.state}</span>
                      <span className="text-red-400 font-bold text-xs">{fire.confidence}%</span>
                    </div>
                    <div className="text-xs text-gray-400">{fire.location}</div>
                    <div className="text-xs text-gray-500 mt-1">{fire.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IndiaMonitor;
