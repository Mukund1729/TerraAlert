import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Shield, Users, Globe, Award, ChevronRight, Play } from 'lucide-react';

const Education = () => {
  const navigate = useNavigate();

  const educationalModules = [
    {
      id: 'disaster-science',
      title: 'Disaster Science Hub',
      icon: Brain,
      color: '#ff6b35',
      description: 'Learn how natural disasters form and their scientific principles',
      topics: ['Earthquake Formation', 'Hurricane Development', 'Wildfire Behavior', 'Flood Dynamics'],
      duration: '15 min',
      difficulty: 'Beginner'
    },
    {
      id: 'preparedness',
      title: 'Emergency Preparedness',
      icon: Shield,
      color: '#4dabf7',
      description: 'Essential skills and knowledge for disaster preparedness',
      topics: ['Emergency Kit Building', 'Evacuation Planning', 'Communication Plans', 'First Aid Basics'],
      duration: '20 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'case-studies',
      title: 'Historical Case Studies',
      icon: BookOpen,
      color: '#ff8787',
      description: 'Learn from past disasters and their lessons',
      topics: ['2004 Indian Ocean Tsunami', 'Hurricane Katrina', 'Japan 2011 Earthquake', 'Australia Bushfires'],
      duration: '25 min',
      difficulty: 'Advanced'
    },
    {
      id: 'community',
      title: 'Community Response',
      icon: Users,
      color: '#9775fa',
      description: 'How communities can work together during disasters',
      topics: ['Neighborhood Planning', 'Volunteer Coordination', 'Resource Sharing', 'Recovery Strategies'],
      duration: '18 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'global-impact',
      title: 'Global Impact & Climate',
      icon: Globe,
      color: '#51cf66',
      description: 'Understanding global disaster patterns and climate change',
      topics: ['Climate Change Effects', 'Global Disaster Trends', 'International Response', 'Future Predictions'],
      duration: '22 min',
      difficulty: 'Advanced'
    },
    {
      id: 'survival-skills',
      title: 'Survival Skills',
      icon: Award,
      color: '#ffd43b',
      description: 'Practical survival skills for emergency situations',
      topics: ['Water Purification', 'Shelter Building', 'Food Safety', 'Navigation'],
      duration: '30 min',
      difficulty: 'Intermediate'
    }
  ];



  const handleModuleClick = (moduleId) => {
    // Navigate to individual module pages
    const routes = {
      'disaster-science': '/education/disaster-science',
      'preparedness': '/education/emergency-preparedness',
      'case-studies': '/education/historical-cases',
      'community': '/community-response',
      'global-impact': '/global-impact',
      'survival-skills': '/survival-skills'
    };
    
    if (routes[moduleId]) {
      navigate(routes[moduleId]);
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
            <span className="text-white">Education</span>
            <span className="text-disaster-red"> Hub</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Learn about disaster science, preparedness, and response through interactive modules and practical tools
          </p>
        </motion.div>

        {/* Learning Modules Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-futuristic font-bold text-white mb-6">Learning Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glassmorphism rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleModuleClick(module.id)}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="p-3 rounded-lg mr-4"
                      style={{ backgroundColor: `${module.color}20` }}
                    >
                      <IconComponent className="h-6 w-6" style={{ color: module.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-disaster-red transition-colors">
                        {module.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{module.duration}</span>
                        <span>•</span>
                        <span>{module.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{module.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {module.topics.slice(0, 2).map((topic, i) => (
                      <span key={i} className="px-2 py-1 bg-disaster-gray/50 rounded text-xs text-gray-300">
                        {topic}
                      </span>
                    ))}
                    {module.topics.length > 2 && (
                      <span className="px-2 py-1 bg-disaster-gray/50 rounded text-xs text-gray-300">
                        +{module.topics.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center text-disaster-red hover:text-red-400 transition-colors">
                      <Play className="h-4 w-4 mr-1" />
                      Start Learning
                    </button>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-disaster-red transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default Education;
