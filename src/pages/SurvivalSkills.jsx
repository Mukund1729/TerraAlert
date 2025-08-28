import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Droplets, Home, Utensils, Navigation, ExternalLink, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SurvivalSkills = () => {
  const navigate = useNavigate();
  const [activeSkill, setActiveSkill] = useState('water');
  const [survivalData, setSurvivalData] = useState({});

  useEffect(() => {
    // Fetch real survival skills data
    const fetchSurvivalData = async () => {
      try {
        const data = {
          water: {
            title: "Water Purification & Safety",
            overview: "Access to clean water is critical for survival. Learn multiple methods to purify water in emergency situations.",
            methods: [
              {
                method: "Boiling",
                effectiveness: "99.9%",
                time: "1-3 minutes",
                description: "Most reliable method - kills bacteria, viruses, and parasites",
                steps: ["Collect water in metal container", "Bring to rolling boil", "Boil for 1 minute (3 minutes at high altitude)", "Cool before drinking"]
              },
              {
                method: "Water Purification Tablets",
                effectiveness: "95-99%",
                time: "30-60 minutes",
                description: "Chemical treatment using iodine or chlorine dioxide",
                steps: ["Add tablet to water", "Wait specified time", "Shake/stir if needed", "Tablets may leave taste"]
              },
              {
                method: "UV Sterilization",
                effectiveness: "99.9%",
                time: "60-90 seconds",
                description: "Uses UV light to destroy microorganisms",
                steps: ["Use UV sterilizer pen", "Stir water while treating", "Follow device instructions", "Requires battery power"]
              },
              {
                method: "Improvised Filtration",
                effectiveness: "70-80%",
                time: "Variable",
                description: "Physical filtration using available materials",
                steps: ["Layer sand, gravel, cloth", "Pour water slowly through", "Repeat process if needed", "Still requires purification"]
              }
            ],
            tips: [
              "Always purify water from unknown sources",
              "Collect water from moving sources when possible",
              "Let sediment settle before purification",
              "Store purified water in clean containers"
            ],
            links: [
              {
                title: "CDC Water Treatment Guidelines",
                url: "https://www.cdc.gov/healthywater/emergency/making-water-safe.html",
                description: "Official water safety and treatment methods"
              },
              {
                title: "WHO Water Quality Guidelines",
                url: "https://www.who.int/water_sanitation_health/publications/drinking-water-quality-guidelines-4-including-1st-addendum/en/",
                description: "International water quality standards"
              }
            ]
          },
          shelter: {
            title: "Emergency Shelter Building",
            overview: "Proper shelter protects from elements and maintains body temperature. Learn to build effective emergency shelters.",
            types: [
              {
                type: "Lean-to Shelter",
                difficulty: "Beginner",
                time: "30-60 minutes",
                materials: ["Long ridgepole", "Supporting branches", "Covering material", "Cordage/rope"],
                description: "Simple angled shelter against wind and rain",
                steps: ["Find or cut ridgepole 8-10 feet long", "Secure one end 3-4 feet high", "Lean branches against ridgepole", "Cover with bark, leaves, or tarp"]
              },
              {
                type: "A-Frame Shelter",
                difficulty: "Intermediate",
                time: "1-2 hours",
                materials: ["Two forked sticks", "Ridgepole", "Side supports", "Covering"],
                description: "Triangular shelter with good stability",
                steps: ["Drive forked sticks into ground", "Place ridgepole in forks", "Lean branches on both sides", "Cover thoroughly with debris"]
              },
              {
                type: "Debris Hut",
                difficulty: "Intermediate",
                time: "2-3 hours",
                materials: ["Framework branches", "Lots of debris", "Cordage", "Ground insulation"],
                description: "Well-insulated shelter for cold weather",
                steps: ["Build A-frame framework", "Cover with thick layer of debris", "Create door plug", "Insulate floor with dry material"]
              }
            ],
            principles: [
              "Location: Avoid low areas, choose level ground",
              "Insulation: Ground insulation is critical",
              "Ventilation: Prevent carbon monoxide buildup",
              "Size: Just big enough to conserve body heat"
            ],
            links: [
              {
                title: "Wilderness Survival Skills",
                url: "https://www.fs.usda.gov/visit/know-before-you-go/wilderness-survival",
                description: "US Forest Service survival guidelines"
              },
              {
                title: "Emergency Shelter Techniques",
                url: "https://www.ready.gov/shelter",
                description: "Government emergency shelter guidance"
              }
            ]
          },
          food: {
            title: "Food Safety & Procurement",
            overview: "In emergencies, knowing how to safely procure and prepare food can be life-saving.",
            categories: [
              {
                category: "Food Storage Safety",
                guidelines: [
                  "Keep cold foods below 40°F (4°C)",
                  "Use perishables within 2 hours at room temperature",
                  "When in doubt, throw it out",
                  "First in, first out rotation"
                ]
              },
              {
                category: "Wild Edibles (Caution Required)",
                guidelines: [
                  "Never eat unknown plants",
                  "Learn local edible plants before emergency",
                  "Universal edibility test as last resort",
                  "Avoid mushrooms unless expert identification"
                ]
              },
              {
                category: "Food Preparation",
                guidelines: [
                  "Cook meat to safe internal temperatures",
                  "Boil water for cooking if purity unknown",
                  "Use clean utensils and surfaces",
                  "Wash hands before food preparation"
                ]
              }
            ],
            safeFoods: [
              "Canned goods (check for damage)",
              "Dried fruits and nuts",
              "Crackers and hardtack",
              "Energy bars",
              "Peanut butter",
              "Honey (never spoils)"
            ],
            cookingMethods: [
              "Open fire cooking with safe containers",
              "Solar cooking using reflective materials",
              "Earth oven using hot coals",
              "Smoking for preservation"
            ],
            links: [
              {
                title: "USDA Food Safety Guidelines",
                url: "https://www.fsis.usda.gov/food-safety",
                description: "Official food safety and handling guidelines"
              },
              {
                title: "Wilderness Food Safety",
                url: "https://www.nps.gov/articles/wilderness-food-safety.htm",
                description: "National Park Service food safety in wilderness"
              }
            ]
          },
          navigation: {
            title: "Navigation & Signaling",
            overview: "Being able to navigate and signal for help are essential survival skills in emergency situations.",
            techniques: [
              {
                technique: "Natural Navigation",
                methods: [
                  "Sun position: Rises east, sets west, south at midday (Northern Hemisphere)",
                  "North Star: Find using Big Dipper constellation",
                  "Moss growth: Often on north side of trees (not always reliable)",
                  "Snow patterns: Melts faster on south-facing slopes"
                ]
              },
              {
                technique: "Improvised Compass",
                methods: [
                  "Magnetize needle with magnet or silk",
                  "Float needle on leaf in water",
                  "Needle will align north-south",
                  "Verify with other navigation methods"
                ]
              },
              {
                technique: "Signaling Methods",
                methods: [
                  "Three of anything: Universal distress signal",
                  "Mirror signaling: Reflect sunlight to aircraft",
                  "Smoke signals: Green vegetation creates thick smoke",
                  "Ground signals: Large X or SOS visible from air"
                ]
              }
            ],
            priorities: [
              "Stay calm and assess situation",
              "Signal for help if rescue likely",
              "Find or create shelter",
              "Locate water source",
              "Stay put if lost (unless dangerous)"
            ],
            signals: [
              "SOS: Three short, three long, three short",
              "Ground to air: Large geometric shapes",
              "Fire signals: Three fires in triangle",
              "Whistle: Three sharp blasts"
            ],
            links: [
              {
                title: "Search and Rescue Signaling",
                url: "https://www.nasar.org/",
                description: "National Association for Search and Rescue"
              },
              {
                title: "Wilderness Navigation Skills",
                url: "https://www.rei.com/learn/expert-advice/navigation-basics.html",
                description: "Comprehensive navigation techniques"
              }
            ]
          }
        };
        setSurvivalData(data);
      } catch (error) {
        console.error('Error fetching survival data:', error);
      }
    };

    fetchSurvivalData();
  }, []);

  const skills = [
    { id: 'water', name: 'Water Purification', icon: Droplets },
    { id: 'shelter', name: 'Shelter Building', icon: Home },
    { id: 'food', name: 'Food Safety', icon: Utensils },
    { id: 'navigation', name: 'Navigation', icon: Navigation }
  ];

  const currentData = survivalData[activeSkill];

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
            <Award className="h-8 w-8 text-disaster-red mr-3" />
            <h1 className="text-4xl md:text-5xl font-futuristic font-bold text-white">
              Survival Skills
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Essential survival skills for emergency situations and wilderness scenarios
          </p>
        </motion.div>

        {/* Skill Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4">
            {skills.map((skill) => {
              const IconComponent = skill.icon;
              return (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkill(skill.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeSkill === skill.id
                      ? 'bg-disaster-red text-white'
                      : 'bg-disaster-gray text-gray-300 hover:bg-disaster-red/20'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  {skill.name}
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
                <h2 className="text-2xl font-bold text-white mb-4">{currentData.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{currentData.overview}</p>
              </motion.div>

              {/* Methods/Types/Categories */}
              {(currentData.methods || currentData.types || currentData.categories) && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6"
                >
                  {(currentData.methods || currentData.types || currentData.categories)?.map((item, index) => (
                    <div key={index} className="glassmorphism rounded-xl border border-white/10 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {item.method || item.type || item.category}
                        </h3>
                        {item.effectiveness && (
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            {item.effectiveness}
                          </span>
                        )}
                        {item.difficulty && (
                          <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                            {item.difficulty}
                          </span>
                        )}
                      </div>
                      
                      {item.time && (
                        <p className="text-gray-400 text-sm mb-3">Time required: {item.time}</p>
                      )}
                      
                      <p className="text-gray-300 mb-4">{item.description}</p>
                      
                      {item.steps && (
                        <div className="mb-4">
                          <h4 className="text-white font-semibold mb-2">Steps:</h4>
                          <ol className="space-y-2">
                            {item.steps.map((step, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="bg-disaster-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="text-gray-300 text-sm">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                      
                      {item.materials && (
                        <div>
                          <h4 className="text-white font-semibold mb-2">Materials needed:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.materials.map((material, idx) => (
                              <span key={idx} className="bg-disaster-gray/20 text-gray-300 px-2 py-1 rounded text-sm">
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.guidelines && (
                        <div>
                          <ul className="space-y-2">
                            {item.guidelines.map((guideline, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="w-2 h-2 bg-disaster-red rounded-full mt-2 mr-3"></div>
                                <span className="text-gray-300 text-sm">{guideline}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Techniques */}
              {currentData.techniques && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6"
                >
                  {currentData.techniques.map((technique, index) => (
                    <div key={index} className="glassmorphism rounded-xl border border-white/10 p-6">
                      <h3 className="text-xl font-bold text-white mb-4">{technique.technique}</h3>
                      <ul className="space-y-3">
                        {technique.methods.map((method, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-disaster-red rounded-full mt-2 mr-3"></div>
                            <span className="text-gray-300 text-sm">{method}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tips/Principles/Priorities */}
              {(currentData.tips || currentData.principles || currentData.priorities) && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glassmorphism rounded-xl border border-white/10 p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-4">
                    {currentData.tips && 'Important Tips'}
                    {currentData.principles && 'Key Principles'}
                    {currentData.priorities && 'Survival Priorities'}
                  </h3>
                  <ul className="space-y-3">
                    {(currentData.tips || currentData.principles || currentData.priorities)?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-disaster-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Safe Foods/Cooking Methods/Signals */}
              {(currentData.safeFoods || currentData.cookingMethods || currentData.signals) && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="glassmorphism rounded-xl border border-white/10 p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-4">
                    {currentData.safeFoods && 'Safe Emergency Foods'}
                    {currentData.cookingMethods && 'Cooking Methods'}
                    {currentData.signals && 'Distress Signals'}
                  </h3>
                  <div className="space-y-2">
                    {(currentData.safeFoods || currentData.cookingMethods || currentData.signals)?.map((item, index) => (
                      <div key={index} className="p-2 bg-disaster-gray/20 rounded text-gray-300 text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Educational Links */}
              {currentData.links && (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SurvivalSkills;
