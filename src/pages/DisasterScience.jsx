import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Wind, Flame, Droplets, BookOpen, ExternalLink, TrendingUp, AlertTriangle, Satellite, Globe, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import nasaApiService from '../services/nasaApi';

const DisasterScience = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('earthquakes');
  const [scienceData, setScienceData] = useState({});
  const [nasaData, setNasaData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch real disaster science data and NASA data
    const fetchScienceData = async () => {
      setLoading(true);
      try {
        // Fetch NASA real-time disaster data
        const [earthquakeData, wildfireData, naturalEvents] = await Promise.all([
          nasaApiService.getDisasterData('earthquakes'),
          nasaApiService.getDisasterData('wildfires'),
          nasaApiService.getNaturalEvents('open', 10, 30)
        ]);

        setNasaData({
          earthquakes: earthquakeData,
          wildfires: wildfireData,
          recentEvents: naturalEvents?.events || []
        });
        // Simulating API call with real disaster science data
        const data = {
          earthquakes: {
            title: "Earthquake Formation & Mechanics",
            icon: Zap,
            color: "#ff6b35",
            overview: "Earthquakes occur when energy stored in Earth's crust is suddenly released, creating seismic waves that shake the ground.",
            keyPoints: [
              "Caused by movement of tectonic plates along fault lines",
              "Magnitude measured on Richter scale (1-10)",
              "Focus point underground called hypocenter",
              "Surface point directly above focus called epicenter",
              "P-waves travel faster than S-waves, causing initial tremor"
            ],
            formation: {
              step1: "Tectonic plates move and create stress along fault lines",
              step2: "Rock layers bend and deform under increasing pressure", 
              step3: "When stress exceeds rock strength, sudden rupture occurs",
              step4: "Energy releases as seismic waves radiating outward",
              step5: "Waves reach surface causing ground shaking"
            },
            facts: [
              "Earth experiences ~500,000 earthquakes annually",
              "Only ~100,000 are strong enough to be felt",
              "Ring of Fire accounts for 90% of world's earthquakes",
              "Deepest recorded earthquake: 700km below surface"
            ],
            recentData: [
              { location: "Turkey-Syria", magnitude: 7.8, date: "Feb 2023", casualties: "50,000+" },
              { location: "Japan", magnitude: 7.4, date: "Mar 2022", casualties: "4" },
              { location: "Haiti", magnitude: 7.2, date: "Aug 2021", casualties: "2,200+" }
            ],
            links: [
              {
                title: "USGS Earthquake Hazards Program",
                url: "https://earthquake.usgs.gov/",
                description: "Real-time earthquake data and educational resources"
              },
              {
                title: "Seismic Safety Commission",
                url: "https://www.seismic.ca.gov/",
                description: "Earthquake preparedness and building safety information"
              }
            ]
          },
          hurricanes: {
            title: "Hurricane Development & Structure",
            icon: Wind,
            color: "#9775fa",
            overview: "Hurricanes are massive rotating storm systems that form over warm ocean waters and can cause devastating wind and flood damage.",
            keyPoints: [
              "Require ocean temperatures above 26.5°C (80°F)",
              "Form between 5-20 degrees latitude from equator",
              "Eye wall contains strongest winds (up to 300+ km/h)",
              "Classified by Saffir-Simpson scale (Categories 1-5)",
              "Season runs June-November in Atlantic"
            ],
            formation: {
              step1: "Warm, moist air rises from ocean surface creating low pressure",
              step2: "Coriolis effect causes rotation as more air is drawn in",
              step3: "Storm intensifies as it feeds on warm ocean energy",
              step4: "Eye wall forms with calm center and violent surrounding winds",
              step5: "Storm can maintain strength over warm water for weeks"
            },
            facts: [
              "Atlantic averages 12 named storms per year",
              "Only ~6 become hurricanes annually",
              "Hurricane Mitch (1998) killed 18,000+ people",
              "Storm surge can reach 6+ meters high"
            ],
            recentData: [
              { location: "Florida (Ian)", category: "Cat 4", date: "Sep 2022", damage: "$113B" },
              { location: "Louisiana (Ida)", category: "Cat 4", date: "Aug 2021", damage: "$75B" },
              { location: "Bahamas (Dorian)", category: "Cat 5", date: "Sep 2019", damage: "$3.4B" }
            ],
            links: [
              {
                title: "National Hurricane Center",
                url: "https://www.nhc.noaa.gov/",
                description: "Official hurricane tracking and forecasts"
              },
              {
                title: "Hurricane Preparedness - Ready.gov",
                url: "https://www.ready.gov/hurricanes",
                description: "Hurricane safety and preparedness guide"
              }
            ]
          },
          wildfires: {
            title: "Wildfire Behavior & Spread",
            icon: Flame,
            color: "#ff8787",
            overview: "Wildfires are uncontrolled fires that spread rapidly through vegetation, influenced by weather, topography, and fuel availability.",
            keyPoints: [
              "Require fuel (vegetation), oxygen, and heat source",
              "Spread faster uphill due to preheating effect",
              "Wind dramatically increases fire spread rate",
              "Crown fires jump between treetops most dangerous",
              "Fire creates its own weather patterns"
            ],
            formation: {
              step1: "Ignition source (lightning, human activity) starts small fire",
              step2: "Fire heats nearby vegetation, releasing flammable gases",
              step3: "Wind carries heat and embers to new fuel sources",
              step4: "Fire intensity increases, creating convection columns",
              step5: "Extreme fires generate their own wind patterns"
            },
            facts: [
              "Lightning causes ~60% of wildfires globally",
              "Humans cause ~40% through accidents/arson",
              "Australia's 2019-20 fires burned 18.6M hectares",
              "Fire can spread at 23+ km/h in grasslands"
            ],
            recentData: [
              { location: "Canada", area: "18.5M hectares", date: "2023", cause: "Lightning/Drought" },
              { location: "Greece", area: "175K hectares", date: "2023", cause: "Extreme Heat" },
              { location: "California", area: "1.3M hectares", date: "2022", cause: "Drought/Wind" }
            ],
            links: [
              {
                title: "National Interagency Fire Center",
                url: "https://www.nifc.gov/",
                description: "Current wildfire information and statistics"
              },
              {
                title: "Firewise USA",
                url: "https://www.nfpa.org/Public-Education/Fire-causes-and-risks/Wildfire/Firewise-USA",
                description: "Wildfire preparedness for communities"
              }
            ]
          },
          floods: {
            title: "Flood Dynamics & Types",
            icon: Droplets,
            color: "#4dabf7",
            overview: "Floods occur when water overflows onto normally dry land, caused by excessive rainfall, storm surge, or dam failures.",
            keyPoints: [
              "Flash floods develop within 6 hours of rainfall",
              "River floods develop over days or weeks",
              "Coastal floods caused by storm surge or tsunamis",
              "Urban floods result from overwhelmed drainage systems",
              "Just 15cm of moving water can knock down adults"
            ],
            formation: {
              step1: "Heavy rainfall exceeds ground absorption capacity",
              step2: "Surface runoff increases, flowing toward low areas",
              step3: "Rivers and streams exceed their channel capacity",
              step4: "Water overflows banks onto floodplains",
              step5: "Urban areas flood when drainage systems overwhelmed"
            },
            facts: [
              "Floods cause 40% of all natural disaster deaths",
              "Flash floods can reach 9+ meters high",
              "2010 Pakistan floods affected 20M people",
              "60cm of water can float most vehicles"
            ],
            recentData: [
              { location: "Pakistan", affected: "33M people", date: "2022", cause: "Monsoon Rains" },
              { location: "Germany/Belgium", deaths: "220+", date: "2021", cause: "Extreme Rainfall" },
              { location: "Australia", area: "Queensland", date: "2022", cause: "La Niña" }
            ],
            links: [
              {
                title: "NOAA Flood Safety",
                url: "https://www.weather.gov/safety/flood",
                description: "Comprehensive flood safety and preparedness information"
              },
              {
                title: "FloodSmart.gov",
                url: "https://www.floodsmart.gov/",
                description: "Flood insurance and risk information"
              }
            ]
          }
        };
        setScienceData(data);
      } catch (error) {
        console.error('Error fetching science data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScienceData();
  }, []);

  const topics = [
    { id: 'earthquakes', name: 'Earthquakes', icon: Zap },
    { id: 'hurricanes', name: 'Hurricanes', icon: Wind },
    { id: 'wildfires', name: 'Wildfires', icon: Flame },
    { id: 'floods', name: 'Floods', icon: Droplets }
  ];

  const currentData = scienceData[selectedTopic];
  const currentNasaData = nasaData[selectedTopic] || {};

  // Helper function to format NASA event data
  const formatNasaEvents = (events) => {
    if (!events || !events.events) return [];
    return events.events.slice(0, 5).map(event => ({
      title: event.title,
      date: event.geometry?.[0]?.date ? new Date(event.geometry[0].date).toLocaleDateString() : 'Unknown',
      location: event.geometry?.[0]?.coordinates ? 
        `${event.geometry[0].coordinates[1]?.toFixed(2)}°, ${event.geometry[0].coordinates[0]?.toFixed(2)}°` : 
        'Unknown',
      category: event.categories?.[0]?.title || 'Natural Event',
      source: 'NASA EONET'
    }));
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
            <Brain className="h-8 w-8 text-disaster-red mr-3" />
            <h1 className="text-4xl md:text-5xl font-futuristic font-bold text-white">
              Disaster Science Hub
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Explore the scientific principles behind natural disasters and understand how they form and behave
          </p>
        </motion.div>

        {/* Topic Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4">
            {topics.map((topic) => {
              const IconComponent = topic.icon;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedTopic === topic.id
                      ? 'bg-disaster-red text-white'
                      : 'bg-disaster-gray text-gray-300 hover:bg-disaster-red/20'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  {topic.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        {currentData && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glassmorphism rounded-xl border border-white/10 p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <currentData.icon className="h-6 w-6 mr-3" style={{ color: currentData.color }} />
                  {currentData.title}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">{currentData.overview}</p>
              </motion.div>

              {/* Formation Process */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glassmorphism rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">Formation Process</h3>
                <div className="space-y-4">
                  {Object.entries(currentData.formation).map(([step, description], index) => (
                    <div key={step} className="flex items-start">
                      <div 
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4"
                        style={{ backgroundColor: currentData.color }}
                      >
                        {index + 1}
                      </div>
                      <p className="text-gray-300 pt-1">{description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Data */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glassmorphism rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">Recent Major Events</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="pb-3 text-gray-300">Location</th>
                        <th className="pb-3 text-gray-300">Details</th>
                        <th className="pb-3 text-gray-300">Date</th>
                        <th className="pb-3 text-gray-300">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.recentData.map((event, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="py-3 text-white font-medium">{event.location}</td>
                          <td className="py-3 text-gray-300">
                            {event.magnitude && `Magnitude ${event.magnitude}`}
                            {event.category && event.category}
                            {event.area && event.area}
                            {event.affected && event.affected}
                          </td>
                          <td className="py-3 text-gray-300">{event.date}</td>
                          <td className="py-3 text-gray-300">
                            {event.casualties || event.damage || event.deaths || event.cause}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Key Points */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glassmorphism rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Key Scientific Points</h3>
                <ul className="space-y-3">
                  {currentData.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div 
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: currentData.color }}
                      ></div>
                      <span className="text-gray-300 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Interesting Facts */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glassmorphism rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Did You Know?</h3>
                <div className="space-y-4">
                  {currentData.facts.map((fact, index) => (
                    <div key={index} className="p-3 bg-disaster-gray/20 rounded-lg">
                      <p className="text-gray-300 text-sm">{fact}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Educational Links */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glassmorphism rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
                  Learn More
                </h3>
                <div className="space-y-3">
                  {currentData.links && currentData.links.map((link, index) => (
                    <div key={index} className="p-3 bg-disaster-gray/20 rounded-lg">
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-disaster-red hover:text-red-400 transition-colors font-medium text-sm mb-1"
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        {link.title}
                      </a>
                      <p className="text-gray-300 text-xs">{link.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterScience;
