import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Users, TrendingDown, ExternalLink, BookOpen, AlertTriangle, Satellite, Database, DollarSign, AlertCircle, Calendar, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import nasaApiService from '../services/nasaApi';

const HistoricalCases = () => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState('2004-tsunami');
  const [historicalData, setHistoricalData] = useState({});

  useEffect(() => {
    // Fetch real historical disaster case studies
    const fetchHistoricalData = async () => {
      try {
        const data = {
          '2004-tsunami': {
            title: "2004 Indian Ocean Tsunami",
            date: "December 26, 2004",
            location: "Indian Ocean Basin",
            type: "Tsunami",
            magnitude: "9.1-9.3 Earthquake",
            casualties: "230,000+",
            affected: "14 countries",
            economicLoss: "$15 billion",
            overview: "The 2004 Indian Ocean tsunami was one of the deadliest natural disasters in recorded history, triggered by a massive undersea earthquake off the coast of Sumatra.",
            timeline: [
              { time: "00:58 UTC", event: "9.1 magnitude earthquake strikes off Sumatra", impact: "Seafloor displacement creates tsunami waves" },
              { time: "01:14 UTC", event: "First waves hit Sumatra coast", impact: "Immediate devastation in Banda Aceh" },
              { time: "02:00 UTC", event: "Waves reach Thailand and Myanmar", impact: "Tourist areas severely affected" },
              { time: "03:30 UTC", event: "Tsunami hits Sri Lanka and India", impact: "Coastal communities destroyed" },
              { time: "07:00 UTC", event: "Waves reach Somalia and Tanzania", impact: "East African coast impacted" }
            ],
            impacts: {
              human: {
                deaths: "230,000+ confirmed deaths",
                missing: "125,000+ missing persons",
                displaced: "1.7 million people displaced",
                orphaned: "Thousands of children orphaned"
              },
              economic: {
                infrastructure: "$7 billion in infrastructure damage",
                tourism: "$2 billion tourism industry losses",
                fishing: "$1 billion fishing industry losses",
                agriculture: "$500 million agricultural losses"
              },
              environmental: {
                coastal: "Extensive coastal erosion and habitat destruction",
                coral: "Coral reef systems severely damaged",
                groundwater: "Saltwater intrusion into freshwater sources",
                mangroves: "Mangrove forests destroyed"
              }
            },
            lessons: [
              "Early warning systems are crucial for tsunami-prone regions",
              "International cooperation essential for disaster response",
              "Community education about natural warning signs saves lives",
              "Building codes must account for tsunami risk in coastal areas",
              "Tourism industry needs disaster preparedness protocols"
            ],
            improvements: [
              "Indian Ocean Tsunami Warning System established in 2006",
              "Enhanced seismic monitoring networks deployed",
              "Community-based early warning systems implemented",
              "Improved building codes for tsunami-resistant construction",
              "Regular evacuation drills in coastal communities"
            ]
          },
          '2005-katrina': {
            title: "Hurricane Katrina",
            date: "August 23-30, 2005",
            location: "Gulf Coast, USA",
            type: "Hurricane",
            magnitude: "Category 5 (peak), Category 3 (landfall)",
            casualties: "1,833",
            affected: "Louisiana, Mississippi, Alabama",
            economicLoss: "$125 billion",
            overview: "Hurricane Katrina was one of the most devastating hurricanes in U.S. history, causing catastrophic flooding in New Orleans due to levee failures.",
            timeline: [
              { time: "Aug 23", event: "Tropical Depression forms", impact: "Storm begins organizing over Bahamas" },
              { time: "Aug 25", event: "Makes first landfall in Florida", impact: "Category 1, causes flooding and power outages" },
              { time: "Aug 28", event: "Strengthens to Category 5", impact: "Becomes extremely dangerous storm in Gulf" },
              { time: "Aug 29", event: "Landfall near New Orleans", impact: "Category 3, storm surge overwhelms levees" },
              { time: "Aug 30", event: "Levee failures flood 80% of New Orleans", impact: "Catastrophic flooding traps residents" }
            ],
            impacts: {
              human: {
                deaths: "1,833 fatalities",
                missing: "705 people reported missing",
                displaced: "1 million people evacuated",
                homeless: "300,000+ homes destroyed"
              },
              economic: {
                infrastructure: "$40 billion in infrastructure damage",
                housing: "$50 billion in residential damage",
                business: "$20 billion in commercial losses",
                insurance: "$80 billion in insurance claims"
              },
              environmental: {
                flooding: "80% of New Orleans flooded",
                contamination: "Toxic floodwater contamination",
                wetlands: "Extensive wetland damage",
                wildlife: "Habitat destruction along Gulf Coast"
              }
            },
            lessons: [
              "Infrastructure maintenance is critical for disaster resilience",
              "Evacuation plans must account for vulnerable populations",
              "Federal, state, and local coordination is essential",
              "Social inequality affects disaster vulnerability and recovery",
              "Climate change may increase hurricane intensity"
            ],
            improvements: [
              "$14.5 billion Hurricane and Storm Damage Risk Reduction System",
              "Enhanced levee system with improved pumping stations",
              "Better evacuation procedures for vulnerable populations",
              "Improved emergency communication systems",
              "Stricter building codes in flood-prone areas"
            ]
          },
          '2011-tohoku': {
            title: "2011 Tōhoku Earthquake and Tsunami",
            date: "March 11, 2011",
            location: "Tōhoku region, Japan",
            type: "Earthquake & Tsunami",
            magnitude: "9.1 Earthquake",
            casualties: "19,759",
            affected: "Northeastern Japan",
            economicLoss: "$235 billion",
            overview: "The most powerful earthquake ever recorded in Japan triggered a devastating tsunami and nuclear disaster at Fukushima Daiichi Nuclear Power Plant.",
            timeline: [
              { time: "14:46 JST", event: "9.1 magnitude earthquake strikes", impact: "Strongest earthquake in Japan's recorded history" },
              { time: "15:27 JST", event: "First tsunami waves reach coast", impact: "Waves up to 40 meters high in some areas" },
              { time: "15:36 JST", event: "Fukushima Daiichi loses power", impact: "Nuclear cooling systems fail" },
              { time: "15:41 JST", event: "Tsunami overtops seawalls", impact: "Widespread flooding begins" },
              { time: "21:23 JST", event: "Nuclear emergency declared", impact: "Evacuation zone established around plant" }
            ],
            impacts: {
              human: {
                deaths: "19,759 confirmed deaths",
                missing: "2,553 people still missing",
                displaced: "470,000 people evacuated",
                nuclear: "154,000 evacuated from nuclear zone"
              },
              economic: {
                infrastructure: "$100 billion in infrastructure damage",
                nuclear: "$50 billion nuclear cleanup costs",
                manufacturing: "$30 billion industrial losses",
                agriculture: "$25 billion agricultural damage"
              },
              environmental: {
                radiation: "Nuclear contamination over 20km radius",
                marine: "Radioactive water released into ocean",
                debris: "25 million tons of debris generated",
                ecosystem: "Coastal ecosystem destruction"
              }
            },
            lessons: [
              "Multiple hazards can compound disaster impacts",
              "Nuclear facilities need robust tsunami protection",
              "Early warning systems saved thousands of lives",
              "International cooperation crucial for nuclear emergencies",
              "Long-term recovery requires sustained commitment"
            ],
            improvements: [
              "Enhanced tsunami barriers and seawalls constructed",
              "Stricter nuclear safety regulations implemented",
              "Improved multi-hazard early warning systems",
              "Better evacuation procedures for nuclear emergencies",
              "Strengthened international nuclear safety cooperation"
            ]
          },
          '2010-haiti': {
            title: "2010 Haiti Earthquake",
            date: "January 12, 2010",
            location: "Port-au-Prince, Haiti",
            type: "Earthquake",
            magnitude: "7.0",
            casualties: "316,000",
            affected: "3 million people",
            economicLoss: "$8 billion",
            overview: "A devastating earthquake struck near Haiti's capital, causing widespread destruction in one of the world's poorest countries with limited disaster preparedness.",
            timeline: [
              { time: "16:53 local", event: "7.0 magnitude earthquake strikes", impact: "Epicenter 25km west of Port-au-Prince" },
              { time: "17:00", event: "Presidential palace collapses", impact: "Government infrastructure destroyed" },
              { time: "18:00", event: "UN headquarters collapses", impact: "International aid coordination disrupted" },
              { time: "20:00", event: "Major aftershock (5.9)", impact: "Further building collapses" },
              { time: "Jan 20", event: "6.1 aftershock", impact: "Hampers rescue operations" }
            ],
            impacts: {
              human: {
                deaths: "316,000 estimated deaths",
                injured: "300,000+ injured",
                displaced: "1.5 million homeless",
                orphaned: "Thousands of children orphaned"
              },
              economic: {
                infrastructure: "$4 billion infrastructure damage",
                housing: "$2 billion residential destruction",
                government: "$1 billion government facilities lost",
                economy: "GDP reduced by 5.1%"
              },
              environmental: {
                rubble: "20 million cubic meters of debris",
                water: "Water system severely damaged",
                sanitation: "Sewage systems destroyed",
                deforestation: "Increased pressure on forests for fuel"
              }
            },
            lessons: [
              "Poverty and poor construction amplify earthquake impacts",
              "International aid coordination needs improvement",
              "Local capacity building is essential for recovery",
              "Building codes must be enforced in seismic zones",
              "Disaster preparedness requires long-term investment"
            ],
            improvements: [
              "Seismic building code development and enforcement",
              "Enhanced international disaster response protocols",
              "Community-based disaster risk reduction programs",
              "Improved early warning and communication systems",
              "Strengthened local emergency response capacity"
            ]
          }
        };
        setHistoricalData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
  }, []);

  const cases = [
    { id: '2004-tsunami', name: '2004 Indian Ocean Tsunami', year: '2004' },
    { id: '2005-katrina', name: 'Hurricane Katrina', year: '2005' },
    { id: '2011-tohoku', name: '2011 Tōhoku Earthquake', year: '2011' },
    { id: '2010-haiti', name: '2010 Haiti Earthquake', year: '2010' }
  ];

  const currentCase = historicalData[selectedCase];

  const getImpactIcon = (category) => {
    switch (category) {
      case 'human': return Users;
      case 'economic': return DollarSign;
      case 'environmental': return AlertCircle;
      default: return AlertCircle;
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
            <Clock className="h-8 w-8 text-disaster-red mr-3" />
            <h1 className="text-4xl md:text-5xl font-futuristic font-bold text-white">
              Historical Case Studies
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Learn from major disasters throughout history to understand impacts, responses, and lessons learned
          </p>
        </motion.div>

        {/* Case Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cases.map((caseItem) => (
              <button
                key={caseItem.id}
                onClick={() => setSelectedCase(caseItem.id)}
                className={`p-4 rounded-lg font-medium transition-all duration-300 text-left ${
                  selectedCase === caseItem.id
                    ? 'bg-disaster-red text-white'
                    : 'bg-disaster-gray text-gray-300 hover:bg-disaster-red/20'
                }`}
              >
                <div className="text-sm opacity-75">{caseItem.year}</div>
                <div className="font-semibold">{caseItem.name}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        {currentCase && (
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
                <h2 className="text-2xl font-bold text-white mb-4">{currentCase.title}</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    {currentCase.date}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    {currentCase.location}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {currentCase.magnitude}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users className="h-4 w-4 mr-2" />
                    {currentCase.casualties} casualties
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{currentCase.overview}</p>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glassmorphism rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">Timeline of Events</h3>
                <div className="space-y-6">
                  {currentCase.timeline.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-20 text-disaster-red font-bold text-sm">
                        {event.time}
                      </div>
                      <div className="flex-1 ml-4">
                        <h4 className="text-white font-semibold mb-1">{event.event}</h4>
                        <p className="text-gray-300 text-sm">{event.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Impacts */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glassmorphism rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">Impact Assessment</h3>
                <div className="space-y-6">
                  {Object.entries(currentCase.impacts).map(([category, impacts]) => {
                    const IconComponent = getImpactIcon(category);
                    return (
                      <div key={category}>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center capitalize">
                          <IconComponent className="h-5 w-5 mr-2 text-disaster-red" />
                          {category} Impact
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {Object.entries(impacts).map(([key, value]) => (
                            <div key={key} className="p-3 bg-disaster-gray/20 rounded-lg">
                              <div className="text-gray-400 text-xs uppercase tracking-wide">{key}</div>
                              <div className="text-white font-medium">{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Key Statistics */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glassmorphism rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Key Statistics</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-disaster-gray/20 rounded-lg">
                    <div className="text-gray-400 text-xs">Economic Loss</div>
                    <div className="text-white font-bold text-lg">{currentCase.economicLoss}</div>
                  </div>
                  <div className="p-3 bg-disaster-gray/20 rounded-lg">
                    <div className="text-gray-400 text-xs">People Affected</div>
                    <div className="text-white font-bold text-lg">{currentCase.affected}</div>
                  </div>
                  <div className="p-3 bg-disaster-gray/20 rounded-lg">
                    <div className="text-gray-400 text-xs">Disaster Type</div>
                    <div className="text-white font-bold text-lg">{currentCase.type}</div>
                  </div>
                </div>
              </motion.div>

              {/* Lessons Learned */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glassmorphism rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Lessons Learned</h3>
                <ul className="space-y-3">
                  {currentCase.lessons.map((lesson, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-disaster-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Improvements Made */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glassmorphism rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                  Improvements Made
                </h3>
                <ul className="space-y-3">
                  {currentCase.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalCases;
