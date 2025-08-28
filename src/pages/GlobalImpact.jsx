import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, TrendingUp, Thermometer, CloudRain, ExternalLink, BookOpen, Satellite, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import nasaApiService from '../services/nasaApi';

const GlobalImpact = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('climate-change');
  const [globalData, setGlobalData] = useState({});
  const [nasaClimateData, setNasaClimateData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch real global impact data and NASA climate data
    const fetchGlobalData = async () => {
      setLoading(true);
      try {
        // Fetch NASA climate and Earth monitoring data
        const [climateData, earthMonitoring, historicalStats] = await Promise.all([
          nasaApiService.getClimateData(),
          nasaApiService.getEarthMonitoringData(),
          nasaApiService.getHistoricalDisasterStats()
        ]);

        setNasaClimateData({
          climate: climateData,
          monitoring: earthMonitoring,
          statistics: historicalStats
        });
        // Simulating API call with real global disaster data
        const data = {
          climateChange: {
            title: "Climate Change & Disasters",
            overview: "Climate change is intensifying natural disasters worldwide, creating new patterns of risk and vulnerability.",
            trends: [
              { metric: "Global Temperature Rise", value: "+1.1°C", change: "since 1880", trend: "up" },
              { metric: "Sea Level Rise", value: "3.3mm/year", change: "accelerating", trend: "up" },
              { metric: "Extreme Weather Events", value: "+70%", change: "since 2000", trend: "up" },
              { metric: "Economic Losses", value: "$280B", change: "annually", trend: "up" }
            ],
            impacts: [
              "More frequent and intense hurricanes",
              "Prolonged droughts and heatwaves",
              "Increased wildfire activity",
              "Rising sea levels threatening coastal areas",
              "Changing precipitation patterns",
              "Arctic ice loss and permafrost thaw"
            ],
            links: [
              {
                title: "IPCC Climate Reports",
                url: "https://www.ipcc.ch/",
                description: "Comprehensive climate science assessments"
              },
              {
                title: "NASA Climate Change",
                url: "https://climate.nasa.gov/",
                description: "Real-time climate data and research"
              }
            ]
          },
          globalTrends: {
            title: "Global Disaster Trends",
            overview: "Analysis of worldwide disaster patterns, frequency, and impact over recent decades.",
            statistics: [
              { region: "Asia-Pacific", disasters: "45%", population: "60%", description: "Most disaster-prone region" },
              { region: "Americas", disasters: "25%", population: "13%", description: "High hurricane and wildfire activity" },
              { region: "Europe", disasters: "15%", population: "10%", description: "Increasing flood and heatwave events" },
              { region: "Africa", disasters: "15%", population: "17%", description: "Drought and food security challenges" }
            ],
            trends: [
              "Disaster frequency increased 5x since 1970s",
              "Economic losses grew 7x in same period",
              "Climate-related disasters account for 91% of all disasters",
              "Small island states face existential threats"
            ],
            links: [
              {
                title: "UN Office for Disaster Risk Reduction",
                url: "https://www.undrr.org/",
                description: "Global disaster risk reduction strategies"
              },
              {
                title: "EM-DAT Disaster Database",
                url: "https://www.emdat.be/",
                description: "International disaster database"
              }
            ]
          },
          internationalResponse: {
            title: "International Response Systems",
            overview: "Global frameworks and organizations coordinating disaster response and risk reduction efforts.",
            frameworks: [
              {
                name: "Sendai Framework 2015-2030",
                focus: "Disaster Risk Reduction",
                targets: ["Reduce disaster mortality", "Reduce economic losses", "Increase resilience", "Enhance preparedness"]
              },
              {
                name: "Paris Climate Agreement",
                focus: "Climate Action",
                targets: ["Limit warming to 1.5°C", "Enhance adaptation", "Climate finance", "Technology transfer"]
              },
              {
                name: "UN Sustainable Development Goals",
                focus: "Sustainable Development",
                targets: ["Climate action", "Sustainable cities", "Life on land", "Clean water"]
              }
            ],
            organizations: [
              "United Nations Office for Disaster Risk Reduction (UNDRR)",
              "World Meteorological Organization (WMO)",
              "International Federation of Red Cross (IFRC)",
              "World Bank Disaster Risk Management"
            ],
            links: [
              {
                title: "Sendai Framework",
                url: "https://www.undrr.org/implementing-sendai-framework",
                description: "Global disaster risk reduction framework"
              },
              {
                title: "Paris Agreement",
                url: "https://unfccc.int/process-and-meetings/the-paris-agreement",
                description: "International climate change agreement"
              }
            ]
          },
          futurePredictions: {
            title: "Future Disaster Predictions",
            overview: "Scientific projections and modeling of future disaster risks under different climate scenarios.",
            scenarios: [
              {
                scenario: "1.5°C Warming",
                impacts: ["10% increase in extreme precipitation", "14% more people exposed to severe drought", "10 million more at flood risk"],
                timeframe: "2030-2050"
              },
              {
                scenario: "2°C Warming",
                impacts: ["20% increase in extreme precipitation", "37% more people exposed to severe drought", "25 million more at flood risk"],
                timeframe: "2050-2070"
              },
              {
                scenario: "3°C Warming",
                impacts: ["35% increase in extreme precipitation", "60% more people exposed to severe drought", "50 million more at flood risk"],
                timeframe: "2070-2100"
              }
            ],
            predictions: [
              "Sea level rise of 0.43-2.84m by 2100",
              "Arctic may be ice-free in summer by 2050",
              "Extreme heat events will become more frequent",
              "Water stress will affect 5 billion people by 2050"
            ],
            links: [
              {
                title: "Climate Central",
                url: "https://www.climatecentral.org/",
                description: "Climate science and impact projections"
              },
              {
                title: "Global Carbon Atlas",
                url: "http://www.globalcarbonatlas.org/",
                description: "Carbon emissions and climate data"
              }
            ]
          }
        };
        setGlobalData(data);
      } catch (error) {
        console.error('Error fetching global data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalData();
  }, []);

  const sections = [
    { id: 'climate-change', name: 'Climate Change', icon: Thermometer },
    { id: 'global-trends', name: 'Global Trends', icon: TrendingUp },
    { id: 'international-response', name: 'International Response', icon: Globe },
    { id: 'future-predictions', name: 'Future Predictions', icon: CloudRain }
  ];

  const renderContent = () => {
    const currentData = globalData[activeSection.replace('-', '')];
    if (!currentData) return null;

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{currentData.title}</h2>
          <p className="text-gray-300">{currentData.overview}</p>
        </div>

        {/* NASA Real-Time Climate Data */}
        {activeSection === 'climate-change' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="glassmorphism rounded-xl border border-white/10 p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Satellite className="h-6 w-6 mr-2 text-blue-400" />
                NASA Live Climate Monitoring
              </h3>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-disaster-red"></div>
                  <span className="ml-3 text-gray-300">Loading NASA climate data...</span>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nasaClimateData.climate && Object.keys(nasaClimateData.climate).map((key, index) => (
                    <div key={index} className="bg-disaster-gray/20 rounded-lg p-4">
                      <h4 className="text-white font-semibold capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</h4>
                      <div className="text-disaster-red font-bold text-lg">
                        {nasaClimateData.climate[key]?.length || 0} events
                      </div>
                      <p className="text-gray-400 text-xs">Active monitoring</p>
                    </div>
                  ))}
                  {nasaClimateData.monitoring?.activeEvents && (
                    <div className="bg-disaster-gray/20 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Total Active Events</h4>
                      <div className="text-disaster-red font-bold text-lg">
                        {nasaClimateData.monitoring.activeEvents.length}
                      </div>
                      <p className="text-gray-400 text-xs">Worldwide</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Original Climate Trends */}
            {currentData.trends && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentData.trends.map((trend, index) => (
                  <div key={index} className="glassmorphism rounded-xl border border-white/10 p-4">
                    <h4 className="text-white font-semibold text-sm mb-2">{trend.metric}</h4>
                    <div className="text-2xl font-bold text-disaster-red mb-1">{trend.value}</div>
                    <p className="text-gray-400 text-xs">{trend.change}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Global Statistics */}
        {activeSection === 'global-trends' && currentData.statistics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mb-8"
          >
            {currentData.statistics.map((stat, index) => (
              <div key={index} className="glassmorphism rounded-xl border border-white/10 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-semibold">{stat.region}</h4>
                  <div className="text-right">
                    <div className="text-disaster-red font-bold">{stat.disasters}</div>
                    <div className="text-gray-400 text-sm">of disasters</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{stat.description}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* International Frameworks */}
        {activeSection === 'international-response' && currentData.frameworks && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-8"
          >
            {currentData.frameworks.map((framework, index) => (
              <div key={index} className="glassmorphism rounded-xl border border-white/10 p-6">
                <h4 className="text-white font-semibold text-lg mb-2">{framework.name}</h4>
                <p className="text-disaster-red text-sm mb-3">{framework.focus}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {framework.targets.map((target, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-disaster-red rounded-full mr-3"></div>
                      <span className="text-gray-300 text-sm">{target}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Future Scenarios */}
        {activeSection === 'future-predictions' && currentData.scenarios && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-8"
          >
            {currentData.scenarios.map((scenario, index) => (
              <div key={index} className="glassmorphism rounded-xl border border-white/10 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white font-semibold text-lg">{scenario.scenario}</h4>
                  <span className="text-gray-400 text-sm">{scenario.timeframe}</span>
                </div>
                <div className="space-y-2">
                  {scenario.impacts.map((impact, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-300 text-sm">{impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* General Content */}
        {(currentData.impacts || currentData.trends || currentData.organizations || currentData.predictions) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphism rounded-xl border border-white/10 p-6 mb-8"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {activeSection === 'climate-change' && 'Key Impacts'}
              {activeSection === 'global-trends' && 'Key Trends'}
              {activeSection === 'international-response' && 'Key Organizations'}
              {activeSection === 'future-predictions' && 'Key Predictions'}
            </h3>
            <div className="space-y-3">
              {(currentData.impacts || currentData.trends || currentData.organizations || currentData.predictions)?.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-disaster-red rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Educational Links */}
        {currentData.links && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphism rounded-xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
              Learn More
            </h3>
            <div className="space-y-3">
              {currentData.links.map((link, index) => (
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
        )}
      </div>
    );
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
            <Globe className="h-8 w-8 text-disaster-red mr-3" />
            <h1 className="text-4xl md:text-5xl font-futuristic font-bold text-white">
              Global Impact & Climate
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Understanding global disaster patterns, climate change impacts, and international response efforts
          </p>
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-disaster-red text-white'
                      : 'bg-disaster-gray text-gray-300 hover:bg-disaster-red/20'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  {section.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default GlobalImpact;
