import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Heart, HelpingHand, MessageCircle, Building, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommunityResponse = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('response-phases');
  const [communityData, setCommunityData] = useState({});

  useEffect(() => {
    // Fetch real community response data
    const fetchCommunityData = async () => {
      try {
        const data = {
          responsePhases: {
            title: "Community Response Phases",
            description: "Understanding the different phases of community disaster response and recovery",
            phases: [
              {
                phase: "Immediate Response (0-72 hours)",
                icon: Zap,
                color: "#ff4757",
                activities: [
                  "Search and rescue operations",
                  "Emergency medical care",
                  "Evacuation and shelter setup",
                  "Damage assessment",
                  "Emergency communications"
                ],
                keyPlayers: ["First responders", "Emergency services", "Local government", "Volunteers"],
                challenges: ["Limited resources", "Communication breakdown", "Access restrictions", "Coordination issues"]
              },
              {
                phase: "Short-term Recovery (Days to Weeks)",
                icon: Building,
                color: "#ffa726",
                activities: [
                  "Debris removal",
                  "Utility restoration",
                  "Temporary housing",
                  "Food and water distribution",
                  "Mental health support"
                ],
                keyPlayers: ["Relief organizations", "Government agencies", "Community groups", "Businesses"],
                challenges: ["Resource allocation", "Volunteer coordination", "Supply chain disruption", "Bureaucracy"]
              },
              {
                phase: "Long-term Recovery (Months to Years)",
                icon: Heart,
                color: "#42a5f5",
                activities: [
                  "Infrastructure rebuilding",
                  "Economic recovery",
                  "Community planning",
                  "Resilience building",
                  "Lessons learned integration"
                ],
                keyPlayers: ["Urban planners", "Construction companies", "Insurance companies", "Community leaders"],
                challenges: ["Funding gaps", "Regulatory compliance", "Community disagreements", "Sustainability"]
              }
            ]
          },
          organizationRoles: {
            title: "Key Organizations & Their Roles",
            description: "Understanding the roles of different organizations in disaster response",
            organizations: [
              {
                name: "Red Cross/Red Crescent",
                type: "International Humanitarian",
                roles: [
                  "Emergency shelter and relief supplies",
                  "Blood donation coordination",
                  "Family reunification services",
                  "Disaster preparedness training",
                  "International disaster response"
                ],
                strengths: ["Global network", "Established protocols", "Volunteer base", "Neutral status"],
                limitations: ["Resource constraints", "Coordination challenges", "Local capacity gaps"]
              },
              {
                name: "Local Emergency Management",
                type: "Government Agency",
                roles: [
                  "Disaster planning and coordination",
                  "Warning system management",
                  "Resource allocation",
                  "Evacuation coordination",
                  "Recovery planning"
                ],
                strengths: ["Local knowledge", "Authority", "Resource access", "Coordination power"],
                limitations: ["Bureaucracy", "Political constraints", "Limited resources", "Capacity issues"]
              },
              {
                name: "Faith-Based Organizations",
                type: "Community Groups",
                roles: [
                  "Shelter and feeding operations",
                  "Emotional and spiritual support",
                  "Volunteer mobilization",
                  "Community outreach",
                  "Long-term recovery support"
                ],
                strengths: ["Community trust", "Volunteer networks", "Local presence", "Moral authority"],
                limitations: ["Limited resources", "Capacity constraints", "Coordination challenges"]
              },
              {
                name: "Community-Based Organizations",
                type: "Local Groups",
                roles: [
                  "Vulnerable population support",
                  "Cultural competency",
                  "Local knowledge sharing",
                  "Advocacy and representation",
                  "Grassroots mobilization"
                ],
                strengths: ["Cultural understanding", "Community trust", "Flexibility", "Local networks"],
                limitations: ["Resource limitations", "Capacity issues", "Sustainability challenges"]
              }
            ]
          },
          volunteerGuide: {
            title: "Effective Volunteering Guide",
            description: "How to volunteer effectively during disaster response and recovery",
            preparation: [
              {
                category: "Skills Development",
                items: [
                  "First aid and CPR certification",
                  "Disaster response training",
                  "Communication skills",
                  "Cultural competency training",
                  "Stress management techniques"
                ]
              },
              {
                category: "Personal Readiness",
                items: [
                  "Physical fitness assessment",
                  "Mental health preparation",
                  "Family emergency plan",
                  "Financial preparation",
                  "Equipment and supplies"
                ]
              }
            ],
            bestPractices: [
              "Register with established organizations",
              "Follow chain of command",
              "Respect affected communities",
              "Practice cultural sensitivity",
              "Maintain personal safety",
              "Document activities appropriately",
              "Communicate regularly with coordinators",
              "Be flexible and adaptable"
            ],
            commonMistakes: [
              "Self-deploying without coordination",
              "Bringing inappropriate donations",
              "Ignoring safety protocols",
              "Working beyond personal limits",
              "Bypassing local organizations",
              "Taking photos without permission",
              "Making promises you can't keep",
              "Staying longer than planned without coordination"
            ]
          },
          psychosocialSupport: {
            title: "Psychological First Aid",
            description: "Providing emotional and psychological support during disasters",
            principles: [
              {
                principle: "Contact and Engagement",
                description: "Approach people in a non-intrusive, compassionate manner",
                actions: ["Introduce yourself and role", "Ask about immediate needs", "Listen actively", "Respect personal space"]
              },
              {
                principle: "Safety and Comfort",
                description: "Promote immediate and ongoing safety and provide physical comfort",
                actions: ["Ensure physical safety", "Provide basic needs", "Offer comfort items", "Create calm environment"]
              },
              {
                principle: "Stabilization",
                description: "Help calm and orient emotionally overwhelmed survivors",
                actions: ["Use grounding techniques", "Provide accurate information", "Normalize reactions", "Encourage self-care"]
              },
              {
                principle: "Information Gathering",
                description: "Identify immediate needs and concerns to tailor response",
                actions: ["Ask about current situation", "Identify resources needed", "Assess coping abilities", "Understand cultural context"]
              }
            ]
          }
        };
        setCommunityData(data);
      } catch (error) {
        console.error('Error fetching community data:', error);
      }
    };

    fetchCommunityData();
  }, []);

  const sections = [
    { id: 'response-phases', name: 'Response Phases', icon: Zap },
    { id: 'organizations', name: 'Key Organizations', icon: Building },
    { id: 'volunteering', name: 'Volunteering Guide', icon: HelpingHand },
    { id: 'psychological', name: 'Psychological Support', icon: Heart }
  ];

  const renderResponsePhases = () => {
    const phaseData = communityData.responsePhases;
    if (!phaseData) return null;

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{phaseData.title}</h2>
          <p className="text-gray-300">{phaseData.description}</p>
        </div>

        {phaseData.phases.map((phase, index) => {
          const IconComponent = phase.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glassmorphism rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center mb-4">
                <IconComponent className="h-6 w-6 mr-3" style={{ color: phase.color }} />
                <h3 className="text-xl font-bold text-white">{phase.phase}</h3>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Activities</h4>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: phase.color }}></div>
                        <span className="text-gray-300 text-sm">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Players</h4>
                  <div className="space-y-2">
                    {phase.keyPlayers.map((player, idx) => (
                      <div key={idx} className="p-2 bg-disaster-gray/20 rounded text-gray-300 text-sm">
                        {player}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Common Challenges</h4>
                  <ul className="space-y-2">
                    {phase.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3"></div>
                        <span className="text-gray-300 text-sm">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'response-phases': return renderResponsePhases();
      default: return <div className="text-white">Content coming soon...</div>;
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
            <Users className="h-8 w-8 text-disaster-red mr-3" />
            <h1 className="text-4xl md:text-5xl font-futuristic font-bold text-white">
              Community Response
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Learn how communities organize, respond, and recover from disasters together
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

export default CommunityResponse;
