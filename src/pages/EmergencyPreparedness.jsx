import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Package, 
  MapPin, 
  Phone, 
  Heart, 
  ArrowLeft, 
  Bell, 
  AlertTriangle, 
  Satellite,
  Play,
  ExternalLink
} from 'lucide-react';
import { nasaApiService } from '../services/nasaApi';
import educationalResources from '../data/educationalResources';

const EmergencyPreparedness = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('emergency-kit');
  const [nasaAlerts, setNasaAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real emergency preparedness data and NASA alerts
    const fetchPreparednessData = async () => {
      setLoading(true);
      try {
        console.log('🔄 Loading REAL disaster data...');
        // Fetch NASA real-time disaster alerts from multiple sources
        const naturalEvents = await nasaApiService.getNaturalEvents('open', 15, 7);
        console.log('📡 API Response:', naturalEvents);
        
        if (naturalEvents && naturalEvents.events) {
          setNasaAlerts(naturalEvents.events);
          console.log(`✅ Loaded ${naturalEvents.events.length} REAL disaster events`);
        } else {
          console.log('❌ No real data received');
          setNasaAlerts([]);
        }
      } catch (error) {
        console.error('Error fetching preparedness data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreparednessData();
  }, []);

  const tabs = [
    { id: 'emergency-kit', name: 'Emergency Kit', icon: Package },
    { id: 'evacuation', name: 'Evacuation Plan', icon: MapPin },
    { id: 'communication', name: 'Communication', icon: Phone },
    { id: 'first-aid', name: 'First Aid', icon: Heart },
    { id: 'education', name: 'Video Training', icon: Play }
  ];

  // Mock preparedness data structure
  const preparednessData = {
    emergencyKit: {
      title: "Emergency Kit Essentials",
      description: "Build a comprehensive emergency kit for your family",
      categories: [
        {
          category: "Water & Food",
          items: [
            "1 gallon of water per person per day (3-day supply)",
            "Non-perishable food (3-day supply)",
            "Manual can opener",
            "Paper plates, cups, plastic utensils"
          ]
        },
        {
          category: "Safety & Tools",
          items: [
            "Flashlight and extra batteries",
            "Battery-powered or hand crank radio",
            "First aid kit",
            "Whistle for signaling help"
          ]
        }
      ]
    },
    evacuation: {
      title: "Evacuation Planning",
      description: "Create and practice your family evacuation plan",
      steps: [
        {
          step: "Identify Safe Locations",
          details: "Choose multiple evacuation destinations in different directions from your home"
        },
        {
          step: "Plan Multiple Routes",
          details: "Map out several evacuation routes in case roads are blocked"
        }
      ]
    },
    communication: {
      title: "Emergency Communication Plan",
      description: "Stay connected with family during emergencies",
      contacts: [
        {
          type: "Out-of-State Contact",
          description: "Choose someone outside your area as a central contact point"
        }
      ],
      methods: [
        "Text messages (often work when calls don't)",
        "Social media check-ins",
        "Emergency radio broadcasts"
      ]
    },
    firstAid: {
      title: "Basic First Aid Skills",
      description: "Essential first aid knowledge for emergency situations",
      skills: [
        {
          skill: "CPR (Cardiopulmonary Resuscitation)",
          importance: "Can save lives during cardiac emergencies",
          steps: [
            "Check for responsiveness and breathing",
            "Call 911 immediately",
            "Place hands on center of chest"
          ]
        }
      ],
      supplies: [
        "Adhesive bandages (various sizes)",
        "Sterile gauze pads",
        "Medical tape"
      ]
    }
  };

  const renderEmergencyKit = () => {
    const kitData = preparednessData.emergencyKit;
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{kitData.title}</h2>
          <p className="text-gray-300">{kitData.description}</p>
        </div>

        <div className="grid lg:grid-cols-1 gap-6">
          {kitData.categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism rounded-xl border border-white/10 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">{category.category}</h3>
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-disaster-red rounded-full mr-3"></div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderEvacuationPlan = () => {
    const evacuationData = preparednessData.evacuation;
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{evacuationData.title}</h2>
          <p className="text-gray-300">{evacuationData.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {evacuationData.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-start">
                <div className="w-8 h-8 bg-disaster-red/20 rounded-full flex items-center justify-center text-disaster-red font-bold mr-4 mt-1">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.step}</h3>
                  <p className="text-gray-300 text-sm">{step.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderCommunicationPlan = () => {
    const commData = preparednessData.communication;
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{commData.title}</h2>
          <p className="text-gray-300">{commData.description}</p>
        </div>

        {/* Contacts */}
        <div className="grid lg:grid-cols-1 gap-4 mb-8">
          {commData.contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism rounded-xl border border-white/10 p-4"
            >
              <h3 className="text-white font-semibold mb-2">{contact.type}</h3>
              <p className="text-gray-300 text-sm">{contact.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Communication Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glassmorphism rounded-xl border border-white/10 p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Communication Methods</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {commData.methods.map((method, index) => (
              <div key={index} className="flex items-center p-3 bg-disaster-gray/20 rounded-lg">
                <Phone className="h-4 w-4 text-disaster-red mr-3" />
                <span className="text-gray-300 text-sm">{method}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  const renderFirstAid = () => {
    const firstAidData = preparednessData.firstAid;
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{firstAidData.title}</h2>
          <p className="text-gray-300">{firstAidData.description}</p>
        </div>

        {/* Skills */}
        <div className="grid lg:grid-cols-2 gap-6">
          {firstAidData.skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism rounded-xl border border-white/10 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-3">{skill.skill}</h3>
              <p className="text-gray-300 text-sm mb-4">{skill.importance}</p>
              <div className="space-y-2">
                {skill.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start">
                    <div className="w-6 h-6 bg-disaster-red/20 rounded-full flex items-center justify-center text-disaster-red text-xs font-bold mr-3 mt-0.5">
                      {stepIndex + 1}
                    </div>
                    <span className="text-gray-300 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Supplies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glassmorphism rounded-xl border border-white/10 p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Essential First Aid Supplies</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {firstAidData.supplies.map((supply, index) => (
              <div key={index} className="flex items-center p-3 bg-disaster-gray/20 rounded-lg">
                <Heart className="h-4 w-4 text-disaster-red mr-3" />
                <span className="text-gray-300 text-sm">{supply}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  const renderEducationalVideos = () => {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Emergency Preparedness Training Videos</h2>
          <p className="text-gray-300">Learn from experts with these essential disaster preparedness videos</p>
        </div>

        {Object.entries(educationalResources).map(([category, data]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphism rounded-xl border border-white/10 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Play className="h-5 w-5 text-disaster-red mr-2" />
              {data.title}
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.videos.map((video, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-disaster-gray/20 rounded-lg p-4 border border-white/5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium text-sm line-clamp-2">{video.title}</h4>
                    <ExternalLink className="h-4 w-4 text-disaster-red flex-shrink-0 ml-2" />
                  </div>
                  
                  <p className="text-gray-400 text-xs mb-2">{video.channel}</p>
                  <p className="text-gray-300 text-xs mb-3 line-clamp-2">{video.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-disaster-red text-xs">{video.duration}</span>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-disaster-red/20 hover:bg-disaster-red/30 text-disaster-red px-3 py-1 rounded-full text-xs transition-colors flex items-center"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Watch
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'emergency-kit': return renderEmergencyKit();
      case 'evacuation': return renderEvacuationPlan();
      case 'communication': return renderCommunicationPlan();
      case 'first-aid': return renderFirstAid();
      case 'education': return renderEducationalVideos();
      default: return renderEmergencyKit();
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
          className="mb-8"
        >
          <button
            onClick={() => navigate('/education')}
            className="flex items-center text-disaster-red hover:text-red-400 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Education Hub
          </button>
          
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-disaster-red mr-3" />
            <h1 className="text-4xl md:text-5xl font-futuristic font-bold text-white">
              Emergency Preparedness
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Essential skills and knowledge for disaster preparedness and emergency response
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-disaster-red text-white'
                      : 'bg-disaster-gray text-gray-300 hover:bg-disaster-red/20'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* NASA Disaster Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="glassmorphism rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Bell className="h-6 w-6 mr-2 text-orange-400" />
              Current Disaster Alerts (NASA)
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-disaster-red"></div>
                <span className="ml-3 text-gray-300">Loading alerts...</span>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nasaAlerts.length > 0 ? (
                  nasaAlerts.slice(0, 6).map((alert, index) => (
                    <div key={index} className="bg-disaster-gray/20 rounded-lg p-4 border-l-2 border-orange-400">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium text-sm">{alert.title}</h4>
                        <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 ml-2" />
                      </div>
                      <p className="text-orange-400 text-xs mb-1">{alert.categories?.[0]?.title}</p>
                      <p className="text-gray-400 text-xs">
                        {alert.geometry?.[0]?.date ? 
                          new Date(alert.geometry[0].date).toLocaleDateString() : 
                          'Ongoing'
                        }
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-4">
                    <Satellite className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No current disaster alerts</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default EmergencyPreparedness;
