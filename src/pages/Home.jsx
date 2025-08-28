import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, Globe, Users, RefreshCw, ExternalLink, Clock, Waves, MapPin, Zap, Wind, Thermometer, Droplets, Eye, Sun, Moon, Shield, AlertCircle, PieChart, LineChart, Gauge, BarChart3, ArrowRight, Play } from 'lucide-react';
// Import background image from public folder
import { useDisasterData } from '../hooks/useDisasterData';
import { useCountryData } from '../hooks/useCountryData';
import CountryStatsTable from '../components/CountryStatsTable';
import LiveWorldMap from '../components/LiveWorldMap';
import IndiaFocusPanel from '../components/IndiaFocusPanel';
import Globe3D from '../components/Globe3D';

const Home = () => {
  const { earthquakes, loading: disasterLoading, lastUpdated: disasterLastUpdated, refresh: disasterRefresh } = useDisasterData();
  const { countryStats, globalStats, loading: countryLoading, lastUpdated: countryLastUpdated, refresh: countryRefresh } = useCountryData();
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleStatClick = (type) => {
    setSelectedFilter(type === selectedFilter ? null : type);
    // Scroll to the relevant section
    const element = document.getElementById('global-monitor-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const features = [
    {
      icon: Globe,
      title: 'Real-time Monitoring',
      description: 'Track disasters worldwide with live data visualization'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Advanced algorithms to predict and assess disaster risks'
    },
    {
      icon: BarChart3,
      title: 'Impact Simulation',
      description: 'Simulate disaster scenarios and their potential impact'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dramatic Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/OIP (1).webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            width: '100%'
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          {/* Gradient overlay for dramatic effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-disaster-red/20 via-transparent to-orange-900/30"></div>
        </div>
        
        {/* Background Globe - now more subtle */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <div className="w-[800px] h-[800px]">
            <Globe3D />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-futuristic font-bold drop-shadow-2xl"
          >
            <span className="text-white drop-shadow-lg">Terra</span>
            <span className="text-disaster-red drop-shadow-lg">Alert</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto drop-shadow-lg font-medium"
          >
            Advanced disaster monitoring and simulation platform powered by real-time global data
          </motion.p>

          {/* Real-time Global Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center gap-4 text-center flex-wrap"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStatClick('countries')}
              className={`backdrop-blur-md bg-black/40 border border-white/20 p-4 rounded-lg min-w-[120px] cursor-pointer transition-all duration-300 shadow-2xl ${
                selectedFilter === 'countries' 
                  ? 'border-disaster-red bg-disaster-red/20 shadow-disaster-red/50' 
                  : 'hover:border-disaster-red/60 hover:bg-black/60'
              }`}
            >
              <div className="text-2xl font-bold text-white drop-shadow-lg flex items-center justify-center gap-1">
                {disasterLoading || countryLoading ? '...' : globalStats.totalCountries}
                <Globe className="w-4 h-4" />
              </div>
              <div className="text-sm text-gray-200 font-medium">Countries Affected</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStatClick('earthquakes')}
              className={`backdrop-blur-md bg-black/40 border border-white/20 p-4 rounded-lg min-w-[120px] cursor-pointer transition-all duration-300 shadow-2xl ${
                selectedFilter === 'earthquakes' 
                  ? 'border-yellow-500 bg-yellow-500/20 shadow-yellow-500/50' 
                  : 'hover:border-yellow-500/60 hover:bg-black/60'
              }`}
            >
              <div className={`text-2xl font-bold flex items-center justify-center gap-1 drop-shadow-lg ${
                selectedFilter === 'earthquakes' ? 'text-yellow-400' : 'text-white'
              }`}>
                {disasterLoading || countryLoading ? '...' : globalStats.activeEarthquakes}
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-sm text-gray-200 font-medium">Live Earthquakes</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStatClick('alerts')}
              className={`backdrop-blur-md bg-black/40 border border-white/20 p-4 rounded-lg min-w-[120px] cursor-pointer transition-all duration-300 shadow-2xl ${
                selectedFilter === 'alerts' 
                  ? 'border-blue-500 bg-blue-500/20 shadow-blue-500/50' 
                  : 'hover:border-blue-500/60 hover:bg-black/60'
              }`}
            >
              <div className={`text-2xl font-bold flex items-center justify-center gap-1 drop-shadow-lg ${
                selectedFilter === 'alerts' ? 'text-blue-400' : 'text-white'
              }`}>
                {disasterLoading || countryLoading ? '...' : globalStats.activeAlerts}
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-sm text-gray-200 font-medium">Active Alerts</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStatClick('total')}
              className={`backdrop-blur-md bg-black/40 border border-white/20 p-4 rounded-lg min-w-[120px] cursor-pointer transition-all duration-300 shadow-2xl ${
                selectedFilter === 'total' 
                  ? 'border-green-500 bg-green-500/20 shadow-green-500/50' 
                  : 'hover:border-green-500/60 hover:bg-black/60'
              }`}
            >
              <div className={`text-2xl font-bold flex items-center justify-center gap-1 drop-shadow-lg ${
                selectedFilter === 'total' ? 'text-green-400' : 'text-white'
              }`}>
                {disasterLoading || countryLoading ? '...' : globalStats.totalDisasters}
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-sm text-gray-200 font-medium">Total Events</div>
            </motion.div>
          </motion.div>

          {/* Live Update Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center gap-2 text-sm"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-400">Live Updates</span>
            {disasterLastUpdated && (
              <span className="text-xs text-gray-400">Last updated: {countryLastUpdated ? new Date(countryLastUpdated).toLocaleTimeString() : 'Never'}</span>
            )}
            <button
              onClick={disasterRefresh}
              className="ml-2 p-1 rounded-full hover:bg-red-500/20 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${disasterLoading || countryLoading ? 'animate-spin' : ''}`} />
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/dashboard"
              className="group bg-disaster-red hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/simulation"
              className="group glassmorphism border border-disaster-red/30 hover:border-disaster-red text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Run Simulation</span>
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-4 h-4 bg-disaster-red rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-20 w-6 h-6 bg-red-400 rounded-full opacity-40"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-disaster-red rounded-full opacity-50"
        />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-disaster-gray/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-futuristic font-bold mb-4">
              <span className="text-white">Advanced </span>
              <span className="text-disaster-red">Capabilities</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Harness the power of cutting-edge technology to understand and prepare for natural disasters
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="glassmorphism p-8 rounded-xl border border-disaster-red/20 hover:border-disaster-red/40 transition-all duration-300 group"
                >
                  <div className="bg-disaster-red/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-disaster-red/30 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-disaster-red" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 font-futuristic">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real-time Country Data Section */}
      <section id="global-monitor-section" className="py-20 px-4 bg-disaster-gray/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-futuristic font-bold mb-4">
              <span className="text-white">Live </span>
              <span className="text-disaster-red">Global Monitor</span>
              {selectedFilter && (
                <span className="block text-lg text-gray-400 mt-2">
                  Filtered by: <span className="capitalize text-disaster-red">{selectedFilter}</span>
                  <button 
                    onClick={() => {countryRefresh(); setSelectedFilter(null)}}
                    className="ml-2 text-sm bg-disaster-red/20 hover:bg-disaster-red/30 px-2 py-1 rounded transition-colors"
                  >
                    Clear Filter
                  </button>
                </span>
              )}
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Real-time disaster tracking across countries with live updates every second
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Live World Map */}
            <div className="lg:col-span-2">
              <LiveWorldMap 
                countryStats={countryStats} 
                earthquakes={earthquakes}
              />
            </div>
            
            {/* India Focus Panel */}
            <IndiaFocusPanel 
              indiaData={globalStats.indiaData} 
              loading={countryLoading}
            />
          </div>

          {/* Country Stats Table - Full Width */}
          <div className="mt-8">
            <CountryStatsTable 
              countryStats={countryStats} 
              loading={countryLoading}
              selectedFilter={selectedFilter}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: '24/7', label: 'Monitoring' },
              { number: '150+', label: 'Countries' },
              { number: '99.9%', label: 'Accuracy' },
              { number: '1M+', label: 'Lives Saved' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-futuristic font-bold text-disaster-red mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
