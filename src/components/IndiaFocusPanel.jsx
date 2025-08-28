import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, AlertTriangle, Flame, Flag, TrendingUp } from 'lucide-react';

const IndiaFocusPanel = ({ indiaData, loading }) => {
  if (loading) {
    return (
      <div className="bg-black/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-orange-500/20 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-orange-500/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!indiaData || indiaData.total === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Flag className="w-5 h-5 text-orange-400" />
          <h3 className="text-xl font-bold text-white">India Status</h3>
          <div className="ml-auto text-xs text-green-400">● ALL CLEAR</div>
        </div>
        <div className="text-center py-8 text-gray-400">
          <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No active disasters detected in India</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Flag className="w-5 h-5 text-orange-400" />
        <h3 className="text-xl font-bold text-white">India Disaster Monitor</h3>
        <div className="ml-auto text-xs text-orange-400 animate-pulse">● ACTIVE</div>
      </div>

      {/* India Summary Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-orange-500/10 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span className="text-white font-bold text-lg">{indiaData.earthquakes.length}</span>
          </div>
          <div className="text-xs text-yellow-400">Earthquakes</div>
        </div>
        
        <div className="bg-orange-500/10 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <AlertTriangle className="w-3 h-3 text-blue-400" />
            <span className="text-white font-bold text-lg">{indiaData.weatherAlerts.length}</span>
          </div>
          <div className="text-xs text-blue-400">Weather</div>
        </div>
        
        <div className="bg-orange-500/10 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flame className="w-3 h-3 text-red-400" />
            <span className="text-white font-bold text-lg">{indiaData.wildfires.length}</span>
          </div>
          <div className="text-xs text-red-400">Wildfires</div>
        </div>
        
        <div className="bg-orange-500/10 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-orange-400" />
            <span className="text-white font-bold text-lg">{indiaData.total}</span>
          </div>
          <div className="text-xs text-orange-400">Total</div>
        </div>
      </div>

      {/* State-wise Breakdown */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          State-wise Breakdown
        </h4>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {indiaData.states?.slice(0, 8).map((state, index) => (
            <motion.div
              key={state.state}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between bg-orange-500/5 hover:bg-orange-500/10 rounded-lg p-2 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                <span className="text-white text-sm font-medium">{state.name}</span>
              </div>
              
              <div className="flex items-center gap-3 text-xs">
                {state.earthquakes > 0 && (
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400">{state.earthquakes}</span>
                  </div>
                )}
                {state.weatherAlerts > 0 && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400">{state.weatherAlerts}</span>
                  </div>
                )}
                {state.wildfires > 0 && (
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-400" />
                    <span className="text-red-400">{state.wildfires}</span>
                  </div>
                )}
                <span className="text-orange-400 font-bold">{state.total}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent India Events */}
      {indiaData.earthquakes.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-orange-400 mb-3">Recent Indian Earthquakes</h4>
          <div className="space-y-2">
            {indiaData.earthquakes.slice(0, 3).map((eq, index) => (
              <motion.div
                key={eq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-yellow-500/10 rounded-lg p-3 border-l-2 border-yellow-500"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium text-sm">{eq.state || 'Unknown State'}</span>
                  <span className="text-yellow-400 font-bold">M{eq.magnitude}</span>
                </div>
                <div className="text-xs text-gray-400">{eq.location}</div>
                <div className="text-xs text-gray-500 mt-1">{eq.time}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default IndiaFocusPanel;
