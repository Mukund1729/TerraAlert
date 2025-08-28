import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, BookOpen, Users, Zap, Heart, Award, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-disaster-dark via-black to-disaster-dark text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-futuristic font-bold mb-6"
          >
            About <span className="text-disaster-red">TerraAlert</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            Real-time disaster monitoring and awareness platform designed to keep people safe and informed
          </motion.p>
        </div>
      </motion.div>

      {/* Creator Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="bg-gradient-to-r from-disaster-red/10 to-blue-500/10 backdrop-blur-sm border border-disaster-red/30 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-disaster-red to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Created by <span className="text-disaster-red">Mukund Mangal</span></h2>
          <p className="text-gray-300 text-lg">
            Passionate developer committed to leveraging technology for disaster preparedness and community safety
          </p>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-disaster-red">Mission</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            TerraAlert provides instant updates on earthquakes, floods, cyclones, wildfires, and other natural disasters using live data from trusted global APIs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/40 backdrop-blur-sm border border-disaster-red/30 rounded-xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-disaster-red to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-disaster-red">Awareness</h3>
            <p className="text-gray-300 leading-relaxed">
              Deliver timely and accurate disaster alerts to keep communities informed about potential threats in real-time.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Safety</h3>
            <p className="text-gray-300 leading-relaxed">
              Help individuals and communities prepare before it's too late with comprehensive disaster monitoring and alerts.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-green-400">Education</h3>
            <p className="text-gray-300 leading-relaxed">
              Provide resources, simulations, and guides on disaster management to build resilient communities.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Platform <span className="text-disaster-red">Features</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <Globe className="w-12 h-12 text-disaster-red mx-auto mb-4" />
            <h4 className="text-lg font-bold mb-2">Real-time Monitoring</h4>
            <p className="text-gray-400 text-sm">Live disaster data from global APIs</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold mb-2">Multi-Disaster Coverage</h4>
            <p className="text-gray-400 text-sm">9 disaster types monitored</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold mb-2">Interactive Dashboard</h4>
            <p className="text-gray-400 text-sm">Comprehensive data visualization</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <Heart className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold mb-2">Community Focus</h4>
            <p className="text-gray-400 text-sm">Built for public safety</p>
          </div>
        </div>
      </motion.div>

      {/* Technology Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="bg-gradient-to-r from-black/40 to-disaster-dark/40 backdrop-blur-sm border border-disaster-red/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="text-disaster-red">Technology</span> & Data Sources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-disaster-red">Data Sources</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• USGS Earthquake API</li>
                <li>• NASA EONET Natural Events</li>
                <li>• NOAA Weather Alerts</li>
                <li>• OpenWeatherMap API</li>
                <li>• ReliefWeb Disaster Data</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Technologies</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• React.js Frontend</li>
                <li>• Real-time API Integration</li>
                <li>• Responsive Design</li>
                <li>• Interactive Visualizations</li>
                <li>• Modern UI/UX</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vision Statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center"
      >
        <div className="bg-gradient-to-r from-disaster-red/10 to-blue-500/10 backdrop-blur-sm border border-disaster-red/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            "By combining technology, data, and awareness, TerraAlert empowers you to stay one step ahead of natural calamities."
          </p>
          <p className="text-lg text-gray-400">
            Together, we build safer, more resilient communities through the power of information and preparedness.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
