import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, Users, RefreshCw, ExternalLink, Clock, Waves, MapPin, Zap, Wind, Thermometer, Droplets, Eye, Sun, Moon, AlertCircle, PieChart, LineChart, Gauge, Flame, FileText } from 'lucide-react';
import { useDisasterData } from '../hooks/useDisasterData';
import { useCountryData } from '../hooks/useCountryData';

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const { earthquakes, weatherAlerts, wildfires, total, loading, lastUpdated, refresh } = useDisasterData();
  const { countryStats, globalStats, loading: countryLoading } = useCountryData();

  // Convert real data to dashboard format
  const getDisasterCards = () => {
    const cards = [];
    
    // Add earthquakes
    earthquakes.slice(0, 2).forEach(eq => {
      cards.push({
        id: eq.id,
        type: 'Earthquake',
        location: eq.location,
        magnitude: eq.magnitude,
        time: eq.time,
        severity: eq.severity === 'high' ? 'High' : eq.severity === 'medium' ? 'Medium' : 'Low',
        affected: `Magnitude ${eq.magnitude}`,
        icon: AlertTriangle,
        color: eq.severity === 'high' ? 'from-orange-500 to-red-600' : 'from-yellow-500 to-orange-600',
        details: {
          depth: `${eq.depth} km`,
          epicenter: eq.location,
          magnitude: eq.magnitude,
          url: eq.url
        }
      });
    });

    // Add weather alerts
    weatherAlerts.slice(0, 1).forEach(alert => {
      cards.push({
        id: alert.id,
        type: alert.type === 'storm' ? 'Storm' : alert.type === 'flood' ? 'Flood' : 'Weather Alert',
        location: alert.location,
        description: alert.description?.substring(0, 50) + '...',
        time: alert.time,
        severity: 'High',
        affected: 'Weather Alert',
        icon: alert.type === 'storm' ? Zap : alert.type === 'flood' ? Waves : AlertTriangle,
        color: alert.type === 'storm' ? 'from-purple-500 to-pink-600' : 'from-blue-500 to-cyan-600',
        details: {
          event: alert.event,
          description: alert.description,
          endTime: alert.endTime
        }
      });
    });

    // Add wildfires
    wildfires.slice(0, 1).forEach(fire => {
      cards.push({
        id: fire.id,
        type: 'Wildfire',
        location: fire.location,
        confidence: `${fire.confidence}% confidence`,
        time: fire.time,
        severity: fire.severity === 'high' ? 'High' : fire.severity === 'medium' ? 'Medium' : 'Low',
        affected: `Brightness: ${fire.brightness}K`,
        icon: Flame,
        color: fire.severity === 'high' ? 'from-red-500 to-orange-600' : 'from-orange-500 to-yellow-600',
        details: {
          confidence: `${fire.confidence}%`,
          brightness: `${fire.brightness}K`,
          severity: fire.severity
        }
      });
    });

    return cards;
  };

  const disasters = getDisasterCards();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-500';
      case 'High': return 'text-orange-500';
      case 'Medium': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-futuristic font-bold mb-4">
            <span className="text-white">Terra</span>
            <span className="text-disaster-red">Alert</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Real-time monitoring of global disasters with interactive data visualization
          </p>
          
          {/* Live Status Indicator */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-400 font-medium">LIVE DATA</span>
            </div>
            {lastUpdated && (
              <span className="text-gray-500">
                Updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={refresh}
              className="p-2 rounded-full hover:bg-disaster-red/20 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4 text-disaster-red" />
            </button>
          </div>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Activity className="w-6 h-6 text-green-500" />
              Live Activity Feed
            </h3>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {[...earthquakes.slice(0, 4), ...weatherAlerts.slice(0, 2)].map((event, index) => (
              <div key={event.id || index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {event.magnitude ? `M${event.magnitude} earthquake` : event.type} in {event.location}
                  </p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  event.severity === 'high' ? 'bg-red-100 text-red-600' :
                  event.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {event.severity || 'Low'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Disaster Reports Grid */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" />
              Disaster Reports
            </h3>
            <div className="flex items-center gap-3">
              <Link 
                to="/reports"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
                View All Reports
              </Link>
              <button 
                onClick={refresh}
                disabled={loading}
                className="p-2 text-gray-500 hover:text-blue-500 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              [...earthquakes.slice(0, 6), ...weatherAlerts.slice(0, 3), ...wildfires.slice(0, 3)].map((event, index) => {
                const getEventIcon = () => {
                  if (event.magnitude) return '🌍';
                  if (event.type === 'weather') return '⛈️';
                  if (event.type === 'wildfire') return '🔥';
                  if (event.type === 'tsunami') return '🌊';
                  if (event.type === 'volcano') return '🌋';
                  if (event.type === 'flood') return '💧';
                  if (event.type === 'cyclone') return '🌀';
                  if (event.type === 'drought') return '🏜️';
                  if (event.type === 'landslide') return '⛰️';
                  return '⚠️';
                };

                const getEventType = () => {
                  if (event.magnitude) return 'earthquake';
                  return event.type || 'disaster';
                };

                return (
                  <motion.div
                    key={event.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-blue-300"
                    onClick={() => window.open(`/reports/${event.id}`, '_blank')}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {getEventIcon()}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        event.severity === 'high' ? 'bg-red-100 text-red-700 border border-red-200' :
                        event.severity === 'medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                        'bg-green-100 text-green-700 border border-green-200'
                      }`}>
                        {event.severity || 'Medium'}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-gray-900 mb-2 text-sm leading-tight group-hover:text-blue-600 transition-colors min-h-[2.5rem] flex items-center">
                      {event.location || event.title}
                    </h4>
                    
                    <p className="text-xs text-gray-600 mb-4 line-clamp-3 leading-relaxed min-h-[3rem]">
                      {event.description || 
                       (event.magnitude ? `Magnitude ${event.magnitude} earthquake detected` : 
                        event.type === 'weather' ? 'Severe weather conditions reported' : 
                        `${getEventType()} event in progress`)}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{new Date(event.time).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-500 group-hover:text-blue-600 font-medium">
                        <ExternalLink className="w-3 h-3" />
                        <span>View</span>
                      </div>
                    </div>
                    
                    {event.magnitude && (
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-medium">Magnitude:</span>
                          <span className="font-bold text-lg text-orange-600">{event.magnitude}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { 
              label: 'Active Disasters', 
              value: loading ? '...' : total.toString(), 
              icon: AlertTriangle 
            },
            { 
              label: 'Countries Affected', 
              value: countryLoading ? '...' : (globalStats.totalCountries || countryStats.length).toString(), 
              icon: MapPin 
            },
            { 
              label: 'Live Earthquakes', 
              value: loading ? '...' : earthquakes.length.toString(), 
              icon: Zap 
            },
            { 
              label: 'Last Update', 
              value: lastUpdated ? new Date(lastUpdated).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              }) : 'Loading...', 
              icon: Clock 
            }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.02 }}
                className="glassmorphism p-6 rounded-xl border border-disaster-red/20 hover:border-disaster-red/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="h-6 w-6 text-disaster-red" />
                  <span className="text-2xl font-futuristic font-bold text-white">
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center gap-2 text-disaster-red">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span className="text-lg font-medium">Loading real-time disaster data...</span>
            </div>
          </motion.div>
        )}


        {/* Live Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 glassmorphism rounded-xl border border-disaster-red/20 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-futuristic font-bold text-white">
              Live Activity Feed
            </h2>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Real-time Updates</span>
            </div>
          </div>
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {(() => {
              const getRecentActivity = () => {
                const activities = [];
                
                earthquakes.slice(0, 3).forEach(eq => {
                  activities.push({
                    id: eq.id,
                    event: `Earthquake M${eq.magnitude} detected in ${eq.location}`,
                    time: eq.time,
                    type: 'earthquake'
                  });
                });
                
                weatherAlerts.slice(0, 2).forEach(alert => {
                  activities.push({
                    id: alert.id,
                    event: `${alert.description || 'Weather Alert'} in ${alert.location}`,
                    time: alert.time,
                    type: alert.type || 'weather'
                  });
                });
                
                wildfires.slice(0, 2).forEach(fire => {
                  activities.push({
                    id: fire.id,
                    event: `Wildfire detected in ${fire.location} (${fire.confidence}% confidence)`,
                    time: fire.time,
                    type: 'wildfire'
                  });
                });
                
                return activities.slice(0, 5);
              };

              const recentActivity = getRecentActivity();

              if (recentActivity.length === 0) {
                return (
                  <div className="text-center py-8 text-gray-400">
                    <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No recent activity detected</p>
                    <p className="text-sm mt-1">Real-time data will appear here</p>
                  </div>
                );
              }

              return recentActivity.map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-disaster-gray/30 hover:bg-disaster-gray/40 transition-colors"
                >
                  <div className="text-disaster-red text-sm font-mono min-w-[80px]">
                    {new Date(item.time).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className="text-gray-300 text-sm flex-grow">{item.event}</div>
                  <div className={`w-2 h-2 rounded-full ${
                    item.type === 'earthquake' ? 'bg-orange-500' :
                    item.type === 'wildfire' ? 'bg-red-500' :
                    item.type === 'storm' ? 'bg-purple-500' :
                    item.type === 'flood' ? 'bg-blue-500' : 'bg-green-500'
                  } animate-pulse`} />
                </motion.div>
              ));
            })()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
