import React from 'react';
import { motion } from 'framer-motion';
import { Globe, AlertTriangle, Zap, Flame } from 'lucide-react';

const CountryStatsTable = ({ countryStats, loading }) => {
  if (loading) {
    return (
      <div className="bg-black/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-red-500/20 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-red-500/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-5 h-5 text-red-400" />
        <h3 className="text-xl font-bold text-white">Country-wise Disasters</h3>
        <div className="ml-auto text-xs text-red-400 animate-pulse">● LIVE</div>
      </div>

      <div className="overflow-hidden">
        <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-red-400 mb-3 px-2">
          <div>COUNTRY</div>
          <div className="text-center">EARTHQUAKES</div>
          <div className="text-center">WEATHER</div>
          <div className="text-center">WILDFIRES</div>
          <div className="text-center">TOTAL</div>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {countryStats.slice(0, 10).map((country, index) => (
            <motion.div
              key={country.country}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-5 gap-4 items-center bg-red-500/5 hover:bg-red-500/10 rounded-lg p-3 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-white font-medium text-sm">{country.country}</span>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-white font-bold">{country.earthquakes}</span>
                </div>
                {country.maxMagnitude > 0 && (
                  <div className="text-xs text-yellow-400">M{country.maxMagnitude.toFixed(1)}</div>
                )}
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-blue-400" />
                  <span className="text-white font-bold">{country.weatherAlerts}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span className="text-white font-bold">{country.wildfires}</span>
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-red-400 font-bold text-lg">{country.total}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {countryStats.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No active disasters detected
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CountryStatsTable;
