import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, AlertTriangle, Flame } from 'lucide-react';

const LiveWorldMap = ({ countryStats, earthquakes }) => {
  // Country coordinates for positioning markers with special India highlighting
  const countryCoordinates = {
    'India': { x: 70, y: 50, special: true }, // Special highlighting for India
    'Japan': { x: 85, y: 35 },
    'USA': { x: 20, y: 40 },
    'Indonesia': { x: 80, y: 65 },
    'Chile': { x: 25, y: 75 },
    'Turkey': { x: 55, y: 35 },
    'Greece': { x: 52, y: 38 },
    'Italy': { x: 50, y: 42 },
    'Mexico': { x: 15, y: 50 },
    'Philippines': { x: 82, y: 55 },
    'New Zealand': { x: 92, y: 80 },
    'Iran': { x: 60, y: 35 },
    'China': { x: 75, y: 35 },
    'Pakistan': { x: 67, y: 45 },
    'Afghanistan': { x: 65, y: 40 },
    'Peru': { x: 25, y: 65 },
    'Ecuador': { x: 22, y: 60 },
    'Russia': { x: 70, y: 25 },
    'Papua New Guinea': { x: 87, y: 65 },
    'Fiji': { x: 95, y: 70 },
    'Tonga': { x: 97, y: 72 },
    'Vanuatu': { x: 90, y: 70 },
    'Solomon Islands': { x: 88, y: 65 }
  };

  const activeCountries = useMemo(() => {
    return countryStats.filter(country => country.total > 0);
  }, [countryStats]);

  const getMarkerColor = (country) => {
    // Special highlighting for India
    if (country.country === 'India') {
      if (country.earthquakes > 0 && country.maxMagnitude > 6) return 'text-orange-500';
      if (country.earthquakes > 0) return 'text-orange-400';
      if (country.weatherAlerts > 0 || country.wildfires > 0) return 'text-orange-300';
      return 'text-orange-500';
    }
    
    if (country.earthquakes > 0 && country.maxMagnitude > 6) return 'text-red-500';
    if (country.earthquakes > 0) return 'text-yellow-500';
    if (country.weatherAlerts > 0) return 'text-blue-500';
    if (country.wildfires > 0) return 'text-orange-500';
    return 'text-gray-500';
  };

  const getMarkerSize = (total, isIndia = false) => {
    // India gets special larger markers
    if (isIndia) {
      if (total > 5) return 'w-5 h-5';
      if (total > 0) return 'w-4 h-4';
      return 'w-3 h-3';
    }
    
    if (total > 10) return 'w-4 h-4';
    if (total > 5) return 'w-3 h-3';
    return 'w-2 h-2';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-400" />
          Live Disaster Map
        </h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-red-400">High Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-yellow-400">Earthquakes</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-blue-400">Weather</span>
          </div>
        </div>
      </div>

      <div className="relative bg-gray-900/50 rounded-lg p-4 overflow-hidden">
        {/* World Map SVG Background */}
        <svg
          viewBox="0 0 100 50"
          className="w-full h-64 opacity-30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified world map paths */}
          <path
            d="M10 20 L15 15 L25 18 L30 25 L25 30 L15 28 Z"
            fill="currentColor"
            className="text-red-500/20"
          />
          <path
            d="M35 15 L45 12 L55 20 L50 28 L40 25 Z"
            fill="currentColor"
            className="text-red-500/20"
          />
          <path
            d="M60 18 L75 15 L85 25 L80 35 L65 30 Z"
            fill="currentColor"
            className="text-red-500/20"
          />
          <path
            d="M15 35 L25 32 L30 40 L25 45 L15 42 Z"
            fill="currentColor"
            className="text-red-500/20"
          />
        </svg>

        {/* Disaster Markers */}
        <div className="absolute inset-0">
          {activeCountries.map((country, index) => {
            const coords = countryCoordinates[country.country];
            if (!coords) return null;

            return (
              <motion.div
                key={country.country}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  left: `${coords.x}%`,
                  top: `${coords.y}%`
                }}
              >
                {/* Pulsing Ring */}
                <div className={`absolute inset-0 rounded-full animate-ping ${getMarkerColor(country)} opacity-20`}>
                  <div className={`w-6 h-6 rounded-full bg-current`}></div>
                </div>

                {/* Main Marker */}
                <div className={`${getMarkerSize(country.total, country.country === 'India')} rounded-full ${getMarkerColor(country)} bg-current ${country.country === 'India' ? 'animate-bounce' : 'animate-pulse'} relative z-10`}>
                  {country.country === 'India' && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-black/90 text-white text-xs rounded-lg p-2 whitespace-nowrap border border-red-500/30">
                    <div className="font-bold text-red-400">{country.country}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {country.earthquakes > 0 && (
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-yellow-400" />
                          {country.earthquakes}
                        </span>
                      )}
                      {country.weatherAlerts > 0 && (
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-blue-400" />
                          {country.weatherAlerts}
                        </span>
                      )}
                      {country.wildfires > 0 && (
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-400" />
                          {country.wildfires}
                        </span>
                      )}
                    </div>
                    {country.maxMagnitude > 0 && (
                      <div className="text-yellow-400 text-xs mt-1">
                        Max: M{country.maxMagnitude.toFixed(1)}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Update Indicator */}
        <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-400 text-xs font-medium">LIVE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveWorldMap;
