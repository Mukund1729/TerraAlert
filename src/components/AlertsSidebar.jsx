import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Flame, Waves, Zap, X, Bell } from 'lucide-react';
import { useDisasterData } from '../hooks/useDisasterData';

const AlertsSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { earthquakes, weatherAlerts, wildfires, total, loading, lastUpdated, refresh } = useDisasterData();
  
  // Combine all alerts into one array
  const getAllAlerts = () => {
    const allAlerts = [];
    
    // Add earthquakes
    earthquakes.forEach(eq => {
      allAlerts.push({
        id: eq.id,
        type: 'Earthquake',
        severity: eq.severity === 'high' ? 'High' : eq.severity === 'medium' ? 'Medium' : 'Low',
        location: eq.location,
        magnitude: eq.magnitude,
        time: eq.time,
        icon: AlertTriangle,
        color: 'text-orange-500'
      });
    });
    
    // Add weather alerts
    weatherAlerts.forEach(alert => {
      allAlerts.push({
        id: alert.id,
        type: alert.type === 'storm' ? 'Storm' : alert.type === 'flood' ? 'Flood' : 'Weather Alert',
        severity: 'High',
        location: alert.location,
        description: alert.description,
        time: alert.time,
        icon: alert.type === 'storm' ? Zap : alert.type === 'flood' ? Waves : AlertTriangle,
        color: alert.type === 'storm' ? 'text-purple-500' : alert.type === 'flood' ? 'text-blue-500' : 'text-yellow-500'
      });
    });
    
    // Add wildfires
    wildfires.forEach(fire => {
      allAlerts.push({
        id: fire.id,
        type: 'Wildfire',
        severity: fire.severity === 'high' ? 'High' : fire.severity === 'medium' ? 'Medium' : 'Low',
        location: fire.location,
        confidence: fire.confidence,
        time: fire.time,
        icon: Flame,
        color: 'text-red-500'
      });
    });
    
    return allAlerts.slice(0, 10); // Limit to 10 alerts
  };

  const alerts = getAllAlerts();

  return (
    <>
      {/* Alert Button - More Visible */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-6 z-50 bg-disaster-red hover:bg-red-600 text-white rounded-full p-4 shadow-lg border-2 border-disaster-red hover:border-red-400 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: isOpen ? "0 0 30px rgba(255, 26, 26, 0.8)" : "0 0 20px rgba(255, 26, 26, 0.5)"
        }}
      >
        <Bell className="h-6 w-6 animate-pulse" />
        <span className="absolute -top-2 -right-2 bg-white text-disaster-red text-sm rounded-full h-7 w-7 flex items-center justify-center font-bold border-2 border-disaster-red">
          {alerts.length}
        </span>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 z-40"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="fixed top-0 right-0 h-full w-96 bg-disaster-dark border-l-4 border-disaster-red z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="bg-disaster-red/10 p-6 border-b border-disaster-red/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-8 w-8 text-disaster-red" />
                    <h2 className="text-2xl font-futuristic font-bold text-white">
                      Live Alerts
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white hover:bg-disaster-red/20 p-2 rounded-full transition-all duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  {alerts.length} active disasters detected
                </p>
              </div>

              {/* Alerts List */}
              <div className="p-4 space-y-4">
                {alerts.map((alert, index) => {
                  const IconComponent = alert.icon;
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-disaster-gray/50 p-4 rounded-lg border border-disaster-red/20 hover:border-disaster-red/50 hover:bg-disaster-gray/70 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-disaster-red/20 p-3 rounded-full">
                          <IconComponent className={`h-6 w-6 ${alert.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-white text-lg">
                              {alert.type}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              alert.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                              alert.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-gray-300 font-medium mb-3">
                            📍 {alert.location}
                          </p>
                          <div className="space-y-1 text-sm text-gray-400">
                            {alert.magnitude && <p>🔸 Magnitude: <span className="text-white">{alert.magnitude}</span></p>}
                            {alert.area && <p>🔸 Area: <span className="text-white">{alert.area}</span></p>}
                            {alert.affected && <p>🔸 Affected: <span className="text-white">{alert.affected}</span></p>}
                            {alert.windSpeed && <p>🔸 Wind Speed: <span className="text-white">{alert.windSpeed}</span></p>}
                            <p className="text-disaster-red font-medium">⏰ {alert.time}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-disaster-red/30 bg-disaster-red/5">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-sm">
                    {loading ? 'Updating...' : `Last updated: ${lastUpdated?.toLocaleTimeString() || 'Never'}`}
                  </p>
                  <button
                    onClick={refresh}
                    disabled={loading}
                    className="text-disaster-red hover:text-red-400 text-sm font-medium disabled:opacity-50"
                  >
                    🔄 Refresh
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AlertsSidebar;
