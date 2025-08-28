import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, AlertTriangle, TrendingUp, Eye, Download, Share2, Filter, Search } from 'lucide-react';
import { useDisasterData } from '../hooks/useDisasterData';
import { downloadReportPDF } from '../utils/pdfGenerator';

const Reports = () => {
  const { reportId } = useParams();
  const [searchParams] = useSearchParams();
  const { earthquakes, weatherAlerts, wildfires, tsunamis, volcanoes, floods, cyclones, droughts, landslides, loading } = useDisasterData();
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Handle continent filter from URL
  useEffect(() => {
    const continent = searchParams.get('continent');
    if (continent) {
      setSearchTerm(continent);
    }
  }, [searchParams]);

  // Memoize allReports to prevent infinite re-renders
  const allReports = useMemo(() => [
    ...(earthquakes || []).map(eq => ({ ...eq, type: 'earthquake', icon: '🌍', color: 'bg-orange-500' })),
    ...(weatherAlerts || []).map(w => ({ ...w, type: 'weather', icon: '⛈️', color: 'bg-blue-500' })),
    ...(wildfires || []).map(w => ({ ...w, type: 'wildfire', icon: '🔥', color: 'bg-red-500' })),
    ...(tsunamis || []).map(t => ({ ...t, type: 'tsunami', icon: '🌊', color: 'bg-cyan-500' })),
    ...(volcanoes || []).map(v => ({ ...v, type: 'volcano', icon: '🌋', color: 'bg-purple-500' })),
    ...(floods || []).map(f => ({ ...f, type: 'flood', icon: '💧', color: 'bg-blue-600' })),
    ...(cyclones || []).map(c => ({ ...c, type: 'cyclone', icon: '🌀', color: 'bg-gray-600' })),
    ...(droughts || []).map(d => ({ ...d, type: 'drought', icon: '🏜️', color: 'bg-yellow-600' })),
    ...(landslides || []).map(l => ({ ...l, type: 'landslide', icon: '⛰️', color: 'bg-brown-500' }))
  ], [earthquakes, weatherAlerts, wildfires, tsunamis, volcanoes, floods, cyclones, droughts, landslides]);

  // Filter reports with null checks and continent filtering
  const filteredReports = (allReports || []).filter(report => {
    if (!report) return false;
    const matchesType = filterType === 'all' || report.type === filterType;
    
    // Enhanced search to include continent-based filtering
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (report.location || '').toLowerCase().includes(searchLower) ||
                         (report.description || '').toLowerCase().includes(searchLower) ||
                         (report.country || '').toLowerCase().includes(searchLower) ||
                         (report.state || '').toLowerCase().includes(searchLower);
    
    // Continent-specific filtering
    let matchesContinent = true;
    if (searchLower === 'asia') {
      const asianCountries = ['india', 'japan', 'china', 'indonesia', 'thailand', 'philippines', 'malaysia', 'singapore', 'vietnam', 'south korea', 'north korea', 'myanmar', 'cambodia', 'laos', 'bangladesh', 'pakistan', 'afghanistan', 'nepal', 'bhutan', 'sri lanka', 'maldives'];
      matchesContinent = asianCountries.some(country => (report.country || '').toLowerCase().includes(country)) ||
                        (report.location || '').toLowerCase().includes('asia');
    } else if (searchLower === 'north america') {
      const northAmericanCountries = ['usa', 'united states', 'canada', 'mexico', 'california', 'texas', 'florida', 'new york'];
      matchesContinent = northAmericanCountries.some(country => (report.country || '').toLowerCase().includes(country)) ||
                        (report.location || '').toLowerCase().includes('america');
    } else if (searchLower === 'europe') {
      const europeanCountries = ['turkey', 'germany', 'france', 'italy', 'spain', 'uk', 'united kingdom', 'greece', 'poland', 'romania', 'netherlands', 'belgium', 'portugal', 'czech republic', 'hungary', 'austria', 'switzerland', 'sweden', 'norway', 'denmark', 'finland', 'ireland', 'croatia', 'serbia', 'bulgaria', 'slovakia', 'slovenia', 'estonia', 'latvia', 'lithuania', 'luxembourg', 'malta', 'cyprus'];
      matchesContinent = europeanCountries.some(country => (report.country || '').toLowerCase().includes(country)) ||
                        (report.location || '').toLowerCase().includes('europe');
    } else if (searchLower === 'oceania') {
      const oceaniaCountries = ['australia', 'new zealand', 'fiji', 'papua new guinea', 'samoa', 'tonga', 'vanuatu', 'solomon islands', 'palau', 'micronesia', 'marshall islands', 'kiribati', 'tuvalu', 'nauru'];
      matchesContinent = oceaniaCountries.some(country => (report.country || '').toLowerCase().includes(country)) ||
                        (report.location || '').toLowerCase().includes('oceania');
    } else if (searchLower === 'africa') {
      const africanCountries = ['south africa', 'nigeria', 'egypt', 'kenya', 'ethiopia', 'ghana', 'morocco', 'algeria', 'tunisia', 'libya', 'sudan', 'uganda', 'tanzania', 'mozambique', 'madagascar', 'cameroon', 'ivory coast', 'niger', 'burkina faso', 'mali', 'malawi', 'zambia', 'zimbabwe', 'botswana', 'namibia', 'senegal', 'guinea', 'benin', 'burundi', 'rwanda', 'somalia', 'eritrea', 'djibouti', 'gambia', 'cape verde', 'sao tome and principe', 'seychelles', 'mauritius', 'comoros'];
      matchesContinent = africanCountries.some(country => (report.country || '').toLowerCase().includes(country)) ||
                        (report.location || '').toLowerCase().includes('africa');
    } else if (searchLower === 'south america') {
      const southAmericanCountries = ['brazil', 'argentina', 'chile', 'peru', 'colombia', 'venezuela', 'ecuador', 'bolivia', 'paraguay', 'uruguay', 'guyana', 'suriname', 'french guiana'];
      matchesContinent = southAmericanCountries.some(country => (report.country || '').toLowerCase().includes(country)) ||
                        (report.location || '').toLowerCase().includes('south america');
    }
    
    return matchesType && (matchesSearch || matchesContinent);
  });

  useEffect(() => {
    if (reportId && allReports.length > 0) {
      const report = allReports.find(r => r.id === reportId);
      setSelectedReport(report);
    }
  }, [reportId, allReports]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-100';
      case 'medium': return 'text-yellow-500 bg-yellow-100';
      case 'low': return 'text-green-500 bg-green-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const downloadReport = (report) => {
    downloadReportPDF(report);
  };

  const shareReport = async (report) => {
    const shareData = {
      title: `TerraAlert: ${report.type} in ${report.location}`,
      text: `${report.description} - Severity: ${report.severity}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
        fallbackShare(shareData);
      }
    } else {
      fallbackShare(shareData);
    }
  };

  const fallbackShare = (shareData) => {
    const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Report details copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Report details copied to clipboard!');
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      earthquake: 'bg-orange-500',
      weather: 'bg-blue-500',
      wildfire: 'bg-red-500',
      tsunami: 'bg-cyan-500',
      volcano: 'bg-purple-500',
      flood: 'bg-blue-600',
      cyclone: 'bg-gray-600',
      drought: 'bg-yellow-600',
      landslide: 'bg-brown-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  if (selectedReport) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => setSelectedReport(null)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Reports
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => downloadReport(selectedReport)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button 
                onClick={() => shareReport(selectedReport)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Report Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${getTypeColor(selectedReport.type)} rounded-full flex items-center justify-center text-2xl`}>
                  {selectedReport.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedReport.location}</h1>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(selectedReport.severity)}`}>
                      {selectedReport.severity?.toUpperCase()} SEVERITY
                    </span>
                    <span className="text-gray-500 capitalize">{selectedReport.type} Event</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Information Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-700">Time</span>
                </div>
                <p className="text-gray-600">{selectedReport.time}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-700">Location</span>
                </div>
                <p className="text-gray-600">{selectedReport.country}</p>
                {selectedReport.state && <p className="text-sm text-gray-500">{selectedReport.state}</p>}
              </div>

              {selectedReport.magnitude && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-700">Magnitude</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{selectedReport.magnitude}</p>
                </div>
              )}

              {selectedReport.windSpeed && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-700">Wind Speed</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{selectedReport.windSpeed} km/h</p>
                </div>
              )}

              {selectedReport.temperature && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-700">Temperature</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{selectedReport.temperature}°C</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {selectedReport.description || `${selectedReport.type} event detected in ${selectedReport.location}. Monitoring systems have recorded this event and relevant authorities have been notified.`}
              </p>
            </div>

            {/* Additional Details */}
            {/* Comprehensive Details Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {/* Event Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Event Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Event ID:</span>
                    <span className="font-medium">{selectedReport.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Source:</span>
                    <span className="font-medium">{selectedReport.source || 'TerraAlert'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Event Type:</span>
                    <span className="font-medium capitalize">{selectedReport.type}</span>
                  </div>
                  {selectedReport.depth && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Depth:</span>
                      <span className="font-medium">{selectedReport.depth} km</span>
                    </div>
                  )}
                  {selectedReport.confidence && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Confidence:</span>
                      <span className="font-medium">{selectedReport.confidence}%</span>
                    </div>
                  )}
                  {selectedReport.intensity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Intensity:</span>
                      <span className="font-medium">{selectedReport.intensity}</span>
                    </div>
                  )}
                  {selectedReport.epicenterDistance && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Epicenter:</span>
                      <span className="font-medium text-sm">{selectedReport.epicenterDistance}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Impact Assessment */}
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  Impact Assessment
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Level:</span>
                    <span className={`font-medium px-2 py-1 rounded text-sm ${selectedReport.severity === 'high' ? 'text-red-600 bg-red-200' : selectedReport.severity === 'medium' ? 'text-yellow-600 bg-yellow-200' : 'text-green-600 bg-green-200'}`}>
                      {selectedReport.severity?.toUpperCase()}
                    </span>
                  </div>
                  {selectedReport.affectedAreas && (
                    <div>
                      <span className="text-gray-600 block mb-1">Affected Areas:</span>
                      <span className="font-medium text-sm">{selectedReport.affectedAreas}</span>
                    </div>
                  )}
                  {selectedReport.casualties && (
                    <div>
                      <span className="text-gray-600 block mb-1">Casualties:</span>
                      <span className="font-medium text-sm">{selectedReport.casualties}</span>
                    </div>
                  )}
                  {selectedReport.damageAssessment && (
                    <div>
                      <span className="text-gray-600 block mb-1">Damage Assessment:</span>
                      <span className="font-medium text-sm">{selectedReport.damageAssessment}</span>
                    </div>
                  )}
                  {selectedReport.feltReports && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Felt Reports:</span>
                      <span className="font-medium">{selectedReport.feltReports.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Geographic Information */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  Geographic Info
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 block mb-1">Location:</span>
                    <span className="font-medium">{selectedReport.location}</span>
                  </div>
                  {selectedReport.country && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Country:</span>
                      <span className="font-medium">{selectedReport.country}</span>
                    </div>
                  )}
                  {selectedReport.state && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">State/Region:</span>
                      <span className="font-medium">{selectedReport.state}</span>
                    </div>
                  )}
                  {selectedReport.coordinates && (
                    <div>
                      <span className="text-gray-600 block mb-1">Coordinates:</span>
                      <span className="font-medium text-sm">
                        {selectedReport.coordinates[1]?.toFixed(4)}, {selectedReport.coordinates[0]?.toFixed(4)}
                      </span>
                    </div>
                  )}
                  {selectedReport.latitude && selectedReport.longitude && (
                    <div>
                      <span className="text-gray-600 block mb-1">Lat/Long:</span>
                      <span className="font-medium text-sm">
                        {selectedReport.latitude?.toFixed(4)}, {selectedReport.longitude?.toFixed(4)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information Sections */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Environmental Data */}
              {(selectedReport.temperature || selectedReport.humidity || selectedReport.windSpeed || selectedReport.aqi) && (
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    Environmental Data
                  </h3>
                  <div className="space-y-3">
                    {selectedReport.temperature && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Temperature:</span>
                        <span className="font-medium">{selectedReport.temperature}°C</span>
                      </div>
                    )}
                    {selectedReport.humidity && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Humidity:</span>
                        <span className="font-medium">{selectedReport.humidity}%</span>
                      </div>
                    )}
                    {selectedReport.windSpeed && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Wind Speed:</span>
                        <span className="font-medium">{selectedReport.windSpeed} km/h</span>
                      </div>
                    )}
                    {selectedReport.aqi && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Air Quality Index:</span>
                        <span className={`font-medium ${selectedReport.aqi > 150 ? 'text-red-600' : selectedReport.aqi > 100 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {selectedReport.aqi}
                        </span>
                      </div>
                    )}
                    {selectedReport.visibility && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Visibility:</span>
                        <span className="font-medium">{selectedReport.visibility} km</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Safety & Warnings */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Safety & Warnings
                </h3>
                <div className="space-y-3">
                  {selectedReport.tsunamiThreat && (
                    <div>
                      <span className="text-gray-600 block mb-1">Tsunami Threat:</span>
                      <span className={`font-medium ${selectedReport.tsunamiThreat.includes('warning') ? 'text-red-600' : 'text-green-600'}`}>
                        {selectedReport.tsunamiThreat}
                      </span>
                    </div>
                  )}
                  {selectedReport.alertLevel && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Alert Level:</span>
                      <span className="font-medium">{selectedReport.alertLevel}</span>
                    </div>
                  )}
                  {selectedReport.evacuationStatus && (
                    <div>
                      <span className="text-gray-600 block mb-1">Evacuation Status:</span>
                      <span className="font-medium text-sm">{selectedReport.evacuationStatus}</span>
                    </div>
                  )}
                  {selectedReport.emergencyServices && (
                    <div>
                      <span className="text-gray-600 block mb-1">Emergency Services:</span>
                      <span className="font-medium text-sm">{selectedReport.emergencyServices}</span>
                    </div>
                  )}
                  {selectedReport.safetyRecommendations && (
                    <div>
                      <span className="text-gray-600 block mb-1">Safety Recommendations:</span>
                      <span className="font-medium text-sm">{selectedReport.safetyRecommendations}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Full Description */}
            {selectedReport.description && (
              <div className="bg-white border rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedReport.description}</p>
              </div>
            )}

            {/* Technical Data */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-gray-500" />
                Technical Information
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <span className="text-gray-600 block mb-1">Report Generated:</span>
                  <span className="font-medium text-sm">{new Date().toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-1">Data Source:</span>
                  <span className="font-medium text-sm">{selectedReport.source || 'TerraAlert System'}</span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-1">Last Updated:</span>
                  <span className="font-medium text-sm">{selectedReport.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Disaster Reports</h1>
            <p className="text-gray-600">Comprehensive disaster monitoring and reporting system</p>
          </div>
          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reports by location or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="earthquake">Earthquakes</option>
                <option value="weather">Weather Alerts</option>
                <option value="wildfire">Wildfires</option>
                <option value="tsunami">Tsunamis</option>
                <option value="volcano">Volcanoes</option>
                <option value="flood">Floods</option>
                <option value="cyclone">Cyclones</option>
                <option value="drought">Droughts</option>
                <option value="landslide">Landslides</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedReport(report)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${getTypeColor(report.type)} rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                      {report.icon}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                      {report.severity?.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{report.location}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {report.description || `${report.type} event detected`}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{report.time}</span>
                    <div className="flex items-center gap-1 text-blue-500 group-hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </div>
                  </div>

                  {report.magnitude && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Magnitude:</span>
                        <span className="font-bold text-orange-600">{report.magnitude}</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredReports.length === 0 && !loading && (
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reports Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
