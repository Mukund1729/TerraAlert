// Enhanced disaster data fetching methods for comprehensive coverage
import { getCountryFromCoordinates, getIndianStateFromCoords } from './geoUtils.js';

// Fetch enhanced weather alerts from NOAA API
export const getEnhancedWeatherAlerts = async () => {
  try {
    console.log('Fetching weather alerts from NOAA...');
    const response = await fetch('https://api.weather.gov/alerts/active');
    
    if (!response.ok) {
      throw new Error(`NOAA API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('NOAA weather alerts fetched:', data.features?.length || 0);
    
    return data.features?.slice(0, 10).map(alert => {
      const props = alert.properties;
      return {
        id: alert.id,
        location: props.areaDesc || 'Unknown Location',
        country: 'USA', // NOAA covers US primarily
        type: 'weather',
        severity: props.severity?.toLowerCase() || 'medium',
        description: props.headline || props.event,
        time: new Date(props.sent).toLocaleString(),
        expires: new Date(props.expires).toLocaleString(),
        urgency: props.urgency,
        certainty: props.certainty,
        source: 'NOAA'
      };
    }) || [];
    
  } catch (error) {
    console.error('Error fetching NOAA weather alerts:', error);
    return getEnhancedFallbackWeatherAlerts();
  }
};

// Fetch tsunami warnings from NOAA
export const getTsunamiWarnings = async () => {
  try {
    console.log('Fetching tsunami warnings from NOAA...');
    const response = await fetch('https://www.tsunami.gov/events/json/PAAQ/PAAQ.json');
    
    if (!response.ok) {
      throw new Error(`Tsunami API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Tsunami warnings fetched:', data.length || 0);
    
    return data?.slice(0, 5).map(warning => ({
      id: warning.eventId || `tsunami_${Date.now()}`,
      location: warning.location || 'Pacific Ocean',
      country: 'International Waters',
      type: 'tsunami',
      severity: warning.magnitude > 7.5 ? 'high' : 'medium',
      description: `Tsunami warning - Magnitude ${warning.magnitude}`,
      time: new Date(warning.time).toLocaleString(),
      waveHeight: warning.waveHeight || 'Unknown',
      magnitude: warning.magnitude,
      source: 'NOAA Tsunami Warning Center'
    })) || getFallbackTsunamiWarnings();
    
  } catch (error) {
    console.error('Error fetching tsunami warnings:', error);
    return getFallbackTsunamiWarnings();
  }
};

// Fetch volcanic activity from NASA EONET
export const getVolcanicActivity = async () => {
  try {
    console.log('Fetching volcanic activity from NASA EONET...');
    const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?category=volcanoes&status=open&limit=10');
    
    if (!response.ok) {
      throw new Error(`NASA EONET Volcano API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Volcanic activity data fetched:', data.events?.length || 0);
    
    return data.events?.map(event => {
      const coords = event.geometry?.[0]?.coordinates || [0, 0];
      const country = getCountryFromCoordinates(coords[1], coords[0]);
      
      return {
        id: event.id,
        location: event.title,
        country: country,
        state: country === 'India' ? getIndianStateFromCoords(coords[1], coords[0]) : null,
        type: 'volcano',
        severity: 'high',
        description: event.description || 'Volcanic activity detected',
        time: new Date(event.geometry?.[0]?.date || Date.now()).toLocaleString(),
        latitude: coords[1],
        longitude: coords[0],
        alertLevel: 3,
        source: 'NASA EONET'
      };
    }) || [];
    
  } catch (error) {
    console.error('Error fetching volcanic activity:', error);
    return getFallbackVolcanicActivity();
  }
};

// Fetch flood alerts from ReliefWeb API
export const getFloodAlerts = async () => {
  try {
    console.log('Fetching flood alerts from ReliefWeb...');
    const response = await fetch('https://api.reliefweb.int/v1/disasters?appname=terraAlert&profile=list&preset=latest&slim=1&filter[field]=type.name&filter[value]=Flood&limit=8');
    
    if (!response.ok) {
      throw new Error(`ReliefWeb API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Flood alerts fetched:', data.data?.length || 0);
    
    return data.data?.map(disaster => ({
      id: disaster.id,
      location: disaster.fields?.country?.[0]?.name || 'Unknown Location',
      country: disaster.fields?.country?.[0]?.name || 'Unknown',
      type: 'flood',
      severity: 'medium',
      description: disaster.fields?.name || 'Flood event',
      time: new Date(disaster.fields?.date?.created || Date.now()).toLocaleString(),
      affectedAreas: disaster.fields?.country?.length || 1,
      source: 'ReliefWeb'
    })) || getFallbackFloodAlerts();
    
  } catch (error) {
    console.error('Error fetching flood alerts:', error);
    return getFallbackFloodAlerts();
  }
};

// Fetch cyclone data from NASA EONET
export const getCycloneData = async () => {
  try {
    console.log('Fetching cyclone data from NASA EONET...');
    const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?category=storms&status=open&limit=8');
    
    if (!response.ok) {
      throw new Error(`NASA EONET Storm API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Cyclone data fetched:', data.events?.length || 0);
    
    return data.events?.map(event => {
      const coords = event.geometry?.[0]?.coordinates || [0, 0];
      const country = getCountryFromCoordinates(coords[1], coords[0]);
      
      return {
        id: event.id,
        location: event.title,
        country: country,
        state: country === 'India' ? getIndianStateFromCoords(coords[1], coords[0]) : null,
        type: 'cyclone',
        severity: 'high',
        description: event.description || 'Storm system detected',
        time: new Date(event.geometry?.[0]?.date || Date.now()).toLocaleString(),
        latitude: coords[1],
        longitude: coords[0],
        category: 2,
        windSpeed: 120,
        source: 'NASA EONET'
      };
    }) || [];
    
  } catch (error) {
    console.error('Error fetching cyclone data:', error);
    return getFallbackCycloneData();
  }
};

// Fetch drought data from ReliefWeb
export const getDroughtData = async () => {
  try {
    console.log('Fetching drought data from ReliefWeb...');
    const response = await fetch('https://api.reliefweb.int/v1/disasters?appname=terraAlert&profile=list&preset=latest&slim=1&filter[field]=type.name&filter[value]=Drought&limit=5');
    
    if (!response.ok) {
      throw new Error(`ReliefWeb Drought API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Drought data fetched:', data.data?.length || 0);
    
    return data.data?.map(disaster => ({
      id: disaster.id,
      location: disaster.fields?.country?.[0]?.name || 'Unknown Location',
      country: disaster.fields?.country?.[0]?.name || 'Unknown',
      type: 'drought',
      severity: 'medium',
      description: disaster.fields?.name || 'Drought conditions',
      time: new Date(disaster.fields?.date?.created || Date.now()).toLocaleString(),
      rainfallDeficit: 45,
      affectedPopulation: 'Unknown',
      source: 'ReliefWeb'
    })) || getFallbackDroughtData();
    
  } catch (error) {
    console.error('Error fetching drought data:', error);
    return getFallbackDroughtData();
  }
};

// Fetch landslide data from ReliefWeb
export const getLandslideData = async () => {
  try {
    console.log('Fetching landslide data from ReliefWeb...');
    const response = await fetch('https://api.reliefweb.int/v1/disasters?appname=terraAlert&profile=list&preset=latest&slim=1&filter[field]=type.name&filter[value]=Landslide&limit=5');
    
    if (!response.ok) {
      throw new Error(`ReliefWeb Landslide API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Landslide data fetched:', data.data?.length || 0);
    
    return data.data?.map(disaster => ({
      id: disaster.id,
      location: disaster.fields?.country?.[0]?.name || 'Unknown Location',
      country: disaster.fields?.country?.[0]?.name || 'Unknown',
      type: 'landslide',
      severity: 'high',
      description: disaster.fields?.name || 'Landslide event',
      time: new Date(disaster.fields?.date?.created || Date.now()).toLocaleString(),
      casualties: 'Unknown',
      roadsClosed: 'Unknown',
      source: 'ReliefWeb'
    })) || getFallbackLandslideData();
    
  } catch (error) {
    console.error('Error fetching landslide data:', error);
    return getFallbackLandslideData();
  }
};

// Get disaster type statistics
export const getDisasterTypeStats = (disasters) => {
  const typeStats = {
    earthquakes: { count: 0, highSeverity: 0, countries: new Set() },
    weather: { count: 0, highSeverity: 0, countries: new Set() },
    wildfires: { count: 0, highSeverity: 0, countries: new Set() },
    tsunamis: { count: 0, highSeverity: 0, countries: new Set() },
    volcanoes: { count: 0, highSeverity: 0, countries: new Set() },
    floods: { count: 0, highSeverity: 0, countries: new Set() },
    cyclones: { count: 0, highSeverity: 0, countries: new Set() },
    droughts: { count: 0, highSeverity: 0, countries: new Set() },
    landslides: { count: 0, highSeverity: 0, countries: new Set() }
  };

  disasters.forEach(disaster => {
    const type = disaster.magnitude !== undefined ? 'earthquakes' : disaster.type;
    if (typeStats[type]) {
      typeStats[type].count++;
      typeStats[type].countries.add(disaster.country);
      if (disaster.severity === 'high') {
        typeStats[type].highSeverity++;
      }
    }
  });

  // Convert Sets to counts
  Object.keys(typeStats).forEach(type => {
    typeStats[type].countriesAffected = typeStats[type].countries.size;
    delete typeStats[type].countries;
  });

  return typeStats;
};

// Get severity analysis
export const getSeverityAnalysis = (disasters) => {
  const severityCount = { low: 0, medium: 0, high: 0 };
  const severityByType = {};

  disasters.forEach(disaster => {
    const severity = disaster.severity || 'low';
    severityCount[severity]++;

    const type = disaster.magnitude !== undefined ? 'earthquakes' : disaster.type;
    if (!severityByType[type]) {
      severityByType[type] = { low: 0, medium: 0, high: 0 };
    }
    severityByType[type][severity]++;
  });

  return {
    overall: severityCount,
    byType: severityByType,
    totalDisasters: disasters.length,
    riskLevel: severityCount.high > 5 ? 'critical' : severityCount.high > 2 ? 'high' : 'moderate'
  };
};

// Calculate India risk level
export const calculateIndiaRiskLevel = (disasters) => {
  const highSeverityCount = disasters.filter(d => d.severity === 'high').length;
  const totalCount = disasters.length;
  
  if (highSeverityCount >= 3 || totalCount >= 10) return 'critical';
  if (highSeverityCount >= 1 || totalCount >= 5) return 'high';
  if (totalCount >= 2) return 'moderate';
  return 'low';
};

// Enhanced fallback data with comprehensive disaster types
export const getEnhancedFallbackWeatherAlerts = () => {
  const now = Date.now();
  return [
    {
      id: 'weather_1',
      location: 'Mumbai, Maharashtra',
      country: 'India',
      state: 'Maharashtra',
      type: 'weather',
      severity: 'high',
      description: 'Severe thunderstorm with heavy rainfall - 150mm expected in next 6 hours',
      time: new Date(now - 180000).toLocaleString(),
      windSpeed: 85,
      temperature: 28,
      humidity: 92,
      heatIndex: 48,
      source: 'India Meteorological Department',
      affectedAreas: 'Mumbai, Thane, Navi Mumbai',
      casualties: 'No casualties reported',
      alertLevel: 'Red Alert',
      visibility: '2 km',
      rainFallExpected: '150mm',
      duration: '6-8 hours',
      coordinates: [72.8777, 19.0760]
    },
    {
      id: 'weather_2',
      location: 'Chennai, Tamil Nadu',
      country: 'India',
      state: 'Tamil Nadu',
      type: 'weather',
      severity: 'high',
      description: 'Cyclone Michaung approaching - Category 2 storm with sustained winds of 120 km/h',
      time: new Date(now - 480000).toLocaleString(),
      windSpeed: 120,
      temperature: 26,
      humidity: 88,
      source: 'India Meteorological Department',
      affectedAreas: 'Chennai, Kanchipuram, Tiruvallur',
      casualties: 'Evacuation of 15,000 people completed',
      alertLevel: 'Orange Alert',
      stormCategory: 'Category 2',
      landfallTime: 'Expected in 12 hours',
      surgePotential: '2-3 meters above normal',
      coordinates: [80.2707, 13.0827]
    },
    {
      id: 'weather_3',
      location: 'Delhi, India',
      country: 'India',
      state: 'Delhi',
      type: 'weather',
      severity: 'medium',
      description: 'Dense fog and severe air pollution - AQI 350 (Hazardous)',
      time: new Date(now - 720000).toLocaleString(),
      visibility: 50,
      aqi: 350,
      source: 'Central Pollution Control Board',
      affectedAreas: 'NCR region including Gurgaon, Noida',
      casualties: 'No direct casualties, health advisory issued',
      alertLevel: 'Yellow Alert',
      healthImpact: 'Severe - Avoid outdoor activities',
      temperature: 8,
      humidity: 95,
      coordinates: [77.1025, 28.7041]
    },
    {
      id: 'weather_4',
      location: 'Kolkata, West Bengal',
      country: 'India',
      state: 'West Bengal',
      type: 'weather',
      severity: 'medium',
      description: 'Severe heat wave conditions - Temperature reaching 42°C with high humidity',
      time: new Date(now - 960000).toLocaleString(),
      temperature: 42,
      heatIndex: 48,
      source: 'India Meteorological Department',
      affectedAreas: 'Kolkata, Howrah, North 24 Parganas',
      casualties: '3 heat-related hospitalizations reported',
      alertLevel: 'Orange Alert',
      healthAdvisory: 'Stay indoors during peak hours (11 AM - 4 PM)',
      humidity: 78,
      uvIndex: 11,
      coordinates: [88.3639, 22.5726]
    }
  ];
};

export const getFallbackTsunamiWarnings = () => {
  const now = Date.now();
  return [
    {
      id: 'tsunami_1',
      location: 'Andaman & Nicobar Islands, India',
      country: 'India',
      state: 'Andaman & Nicobar',
      type: 'tsunami',
      severity: 'high',
      description: 'Tsunami watch issued - 7.2 magnitude earthquake detected',
      time: new Date(now - 300000).toLocaleString(),
      waveHeight: 2.5,
      arrivalTime: '45 minutes'
    },
    {
      id: 'tsunami_2',
      location: 'Pacific Ocean - Japan Coast',
      country: 'Japan',
      type: 'tsunami',
      severity: 'medium',
      description: 'Minor tsunami waves detected - 1.2m height',
      time: new Date(now - 600000).toLocaleString(),
      waveHeight: 1.2,
      arrivalTime: 'Arrived'
    }
  ];
};

export const getFallbackVolcanicActivity = () => {
  const now = Date.now();
  return [
    {
      id: 'volcano_1',
      location: 'Barren Island, Andaman & Nicobar',
      country: 'India',
      state: 'Andaman & Nicobar',
      type: 'volcano',
      severity: 'medium',
      description: 'Increased volcanic activity - Alert Level 2',
      time: new Date(now - 1200000).toLocaleString(),
      alertLevel: 2,
      lastEruption: '2023-05-15'
    },
    {
      id: 'volcano_2',
      location: 'Mount Fuji, Japan',
      country: 'Japan',
      type: 'volcano',
      severity: 'low',
      description: 'Seismic activity detected - Monitoring increased',
      time: new Date(now - 1800000).toLocaleString(),
      alertLevel: 1,
      seismicActivity: 'Elevated'
    }
  ];
};

export const getFallbackFloodAlerts = () => {
  const now = Date.now();
  return [
    {
      id: 'flood_1',
      location: 'Kerala, India',
      country: 'India',
      state: 'Kerala',
      type: 'flood',
      severity: 'high',
      description: 'Flash flood warning - Rivers above danger level',
      time: new Date(now - 240000).toLocaleString(),
      waterLevel: 'Above danger',
      affectedAreas: 'Kochi, Alappuzha'
    },
    {
      id: 'flood_2',
      location: 'Assam, India',
      country: 'India',
      state: 'Assam',
      type: 'flood',
      severity: 'medium',
      description: 'Brahmaputra river flooding - 50,000 people affected',
      time: new Date(now - 480000).toLocaleString(),
      waterLevel: 'Above normal',
      affectedPopulation: 50000
    },
    {
      id: 'flood_3',
      location: 'Bihar, India',
      country: 'India',
      state: 'Bihar',
      type: 'flood',
      severity: 'medium',
      description: 'Monsoon flooding in multiple districts',
      time: new Date(now - 720000).toLocaleString(),
      affectedDistricts: 8
    }
  ];
};

export const getFallbackCycloneData = () => {
  const now = Date.now();
  return [
    {
      id: 'cyclone_1',
      location: 'Bay of Bengal - Approaching Odisha',
      country: 'India',
      state: 'Odisha',
      type: 'cyclone',
      severity: 'high',
      description: 'Cyclone Yaas - Category 3, landfall expected in 18 hours',
      time: new Date(now - 360000).toLocaleString(),
      category: 3,
      windSpeed: 150,
      landfallTime: '18 hours'
    },
    {
      id: 'cyclone_2',
      location: 'Arabian Sea - West Coast India',
      country: 'India',
      state: 'Gujarat',
      type: 'cyclone',
      severity: 'medium',
      description: 'Tropical depression forming - Monitoring required',
      time: new Date(now - 720000).toLocaleString(),
      category: 1,
      windSpeed: 85
    }
  ];
};

export const getFallbackDroughtData = () => {
  const now = Date.now();
  return [
    {
      id: 'drought_1',
      location: 'Maharashtra, India',
      country: 'India',
      state: 'Maharashtra',
      type: 'drought',
      severity: 'high',
      description: 'Severe drought conditions - 60% rainfall deficit',
      time: new Date(now - 2592000000).toLocaleString(), // 30 days ago
      rainfallDeficit: 60,
      affectedDistricts: 15
    },
    {
      id: 'drought_2',
      location: 'Karnataka, India',
      country: 'India',
      state: 'Karnataka',
      type: 'drought',
      severity: 'medium',
      description: 'Moderate drought - Agricultural impact reported',
      time: new Date(now - 1728000000).toLocaleString(), // 20 days ago
      rainfallDeficit: 40,
      cropDamage: 'Moderate'
    }
  ];
};

export const getFallbackLandslideData = () => {
  const now = Date.now();
  return [
    {
      id: 'landslide_1',
      location: 'Himachal Pradesh, India',
      country: 'India',
      state: 'Himachal Pradesh',
      type: 'landslide',
      severity: 'high',
      description: 'Major landslide blocks highway - 20 people missing',
      time: new Date(now - 480000).toLocaleString(),
      casualties: 20,
      roadsClosed: 3
    },
    {
      id: 'landslide_2',
      location: 'Uttarakhand, India',
      country: 'India',
      state: 'Uttarakhand',
      type: 'landslide',
      severity: 'medium',
      description: 'Landslide warning issued due to heavy rainfall',
      time: new Date(now - 720000).toLocaleString(),
      riskLevel: 'High',
      evacuationOrdered: true
    }
  ];
};

// Enhanced fallback data combining all disaster types
export const getEnhancedFallbackData = () => {
  return {
    earthquakes: [
      // Enhanced earthquake data with more details
      {
        id: 'eq_1',
        location: 'Himachal Pradesh, India',
        country: 'India',
        state: 'Himachal Pradesh',
        latitude: 31.1048,
        longitude: 77.1734,
        magnitude: 5.2,
        time: new Date(Date.now() - 300000).toLocaleString(),
        severity: 'medium',
        depth: 15,
        intensity: 'VI',
        feltReports: 1250,
        url: '#',
        description: 'Moderate earthquake in Himachal Pradesh - Felt across multiple districts with no major damage reported',
        source: 'USGS Earthquake Hazards Program',
        affectedAreas: 'Shimla, Kullu, Mandi districts',
        casualties: 'No casualties reported',
        damageAssessment: 'Minor structural damage to old buildings',
        coordinates: [77.1734, 31.1048],
        epicenterDistance: '12 km NE of Shimla',
        tsunamiThreat: 'No tsunami threat'
      }
    ],
    weatherAlerts: getEnhancedFallbackWeatherAlerts(),
    wildfires: [
      {
        id: 'india_fire_1',
        location: 'Uttarakhand, India',
        country: 'India',
        state: 'Uttarakhand',
        type: 'wildfire',
        severity: 'high',
        confidence: 85,
        brightness: 350,
        area: 500,
        time: new Date(Date.now() - 240000).toLocaleString(),
        description: 'Forest fire detected in Uttarakhand hills - Dry conditions and high winds contributing to rapid spread',
        source: 'NASA FIRMS',
        affectedAreas: 'Nainital, Almora districts',
        casualties: 'No casualties reported',
        evacuationStatus: 'Precautionary evacuation of 3 villages',
        fireIntensity: 'High',
        windSpeed: 25,
        humidity: 15,
        temperature: 35,
        coordinates: [79.0193, 30.0668]
      }
    ],
    tsunamis: getFallbackTsunamiWarnings(),
    volcanoes: getFallbackVolcanicActivity(),
    floods: getFallbackFloodAlerts(),
    cyclones: getFallbackCycloneData(),
    droughts: getFallbackDroughtData(),
    landslides: getFallbackLandslideData(),
    total: 25,
    countryStats: [
      {
        country: 'Japan',
        earthquakes: 3,
        weatherAlerts: 2,
        wildfires: 1,
        tsunamis: 1,
        volcanoes: 2,
        floods: 0,
        cyclones: 1,
        droughts: 0,
        landslides: 1,
        total: 11,
        maxMagnitude: 5.2
      },
      {
        country: 'USA',
        earthquakes: 2,
        weatherAlerts: 5,
        wildfires: 3,
        tsunamis: 0,
        volcanoes: 1,
        floods: 2,
        cyclones: 2,
        droughts: 1,
        landslides: 0,
        total: 16,
        maxMagnitude: 4.8
      },
      {
        country: 'Turkey',
        earthquakes: 1,
        weatherAlerts: 1,
        wildfires: 0,
        tsunamis: 0,
        volcanoes: 0,
        floods: 1,
        cyclones: 0,
        droughts: 0,
        landslides: 2,
        total: 5,
        maxMagnitude: 6.1
      },
      {
        country: 'India',
        earthquakes: 1,
        weatherAlerts: 3,
        wildfires: 0,
        tsunamis: 0,
        volcanoes: 0,
        floods: 2,
        cyclones: 1,
        droughts: 1,
        landslides: 0,
        total: 8,
        maxMagnitude: 4.2
      },
      {
        country: 'Mexico',
        earthquakes: 1,
        weatherAlerts: 1,
        wildfires: 2,
        tsunamis: 0,
        volcanoes: 1,
        floods: 0,
        cyclones: 1,
        droughts: 0,
        landslides: 0,
        total: 6,
        maxMagnitude: 5.8
      },
      {
        country: 'Australia',
        earthquakes: 0,
        weatherAlerts: 2,
        wildfires: 4,
        tsunamis: 0,
        volcanoes: 0,
        floods: 1,
        cyclones: 1,
        droughts: 2,
        landslides: 0,
        total: 10,
        maxMagnitude: 0
      },
      {
        country: 'Indonesia',
        earthquakes: 2,
        weatherAlerts: 1,
        wildfires: 1,
        tsunamis: 1,
        volcanoes: 3,
        floods: 1,
        cyclones: 0,
        droughts: 0,
        landslides: 1,
        total: 10,
        maxMagnitude: 5.5
      },
      {
        country: 'Philippines',
        earthquakes: 1,
        weatherAlerts: 2,
        wildfires: 0,
        tsunamis: 0,
        volcanoes: 2,
        floods: 1,
        cyclones: 2,
        droughts: 0,
        landslides: 1,
        total: 9,
        maxMagnitude: 4.9
      },
      {
        country: 'Chile',
        earthquakes: 2,
        weatherAlerts: 1,
        wildfires: 1,
        tsunamis: 0,
        volcanoes: 1,
        floods: 0,
        cyclones: 0,
        droughts: 1,
        landslides: 1,
        total: 7,
        maxMagnitude: 5.3
      },
      {
        country: 'Italy',
        earthquakes: 1,
        weatherAlerts: 2,
        wildfires: 1,
        tsunamis: 0,
        volcanoes: 1,
        floods: 1,
        cyclones: 0,
        droughts: 0,
        landslides: 1,
        total: 7,
        maxMagnitude: 4.1
      }
    ],
    indiaData: {
      total: 15,
      earthquakes: [
        {
          id: 'india_eq_1',
          location: 'Himachal Pradesh, India',
          country: 'India',
          state: 'Himachal Pradesh',
          magnitude: 5.2,
          time: new Date(Date.now() - 300000).toLocaleString(),
          severity: 'medium'
        }
      ],
      weatherAlerts: [
        {
          id: 'india_weather_1',
          location: 'Mumbai, Maharashtra',
          country: 'India',
          state: 'Maharashtra',
          severity: 'high',
          description: 'Severe thunderstorm with heavy rainfall',
          time: new Date(Date.now() - 180000).toLocaleString()
        },
        {
          id: 'india_weather_2',
          location: 'Chennai, Tamil Nadu',
          country: 'India',
          state: 'Tamil Nadu',
          severity: 'high',
          description: 'Cyclone Michaung approaching',
          time: new Date(Date.now() - 480000).toLocaleString()
        },
        {
          id: 'india_weather_3',
          location: 'Delhi, India',
          country: 'India',
          state: 'Delhi',
          severity: 'medium',
          description: 'Dense fog and air quality deterioration',
          time: new Date(Date.now() - 720000).toLocaleString()
        }
      ],
      wildfires: [
        {
          id: 'india_fire_1',
          location: 'Uttarakhand, India',
          country: 'India',
          state: 'Uttarakhand',
          confidence: 85,
          time: new Date(Date.now() - 240000).toLocaleString()
        }
      ],
      states: [
        { 
          state: 'Delhi',
          name: 'Delhi', 
          earthquakes: 0,
          weatherAlerts: 1,
          wildfires: 0,
          floods: 0,
          cyclones: 0,
          droughts: 0,
          tsunamis: 0,
          volcanoes: 0,
          landslides: 0,
          total: 1,
          riskLevel: 'Medium'
        },
        { 
          state: 'Maharashtra',
          name: 'Maharashtra', 
          earthquakes: 0,
          weatherAlerts: 1,
          wildfires: 0,
          floods: 0,
          cyclones: 0,
          droughts: 1,
          tsunamis: 0,
          volcanoes: 0,
          landslides: 0,
          total: 2,
          riskLevel: 'High'
        },
        { 
          state: 'Tamil Nadu',
          name: 'Tamil Nadu', 
          earthquakes: 0,
          weatherAlerts: 1,
          wildfires: 0,
          floods: 0,
          cyclones: 0,
          droughts: 0,
          tsunamis: 0,
          volcanoes: 0,
          landslides: 0,
          total: 1,
          riskLevel: 'Medium'
        },
        { 
          state: 'Kerala',
          name: 'Kerala', 
          earthquakes: 0,
          weatherAlerts: 0,
          wildfires: 0,
          floods: 1,
          cyclones: 0,
          droughts: 0,
          tsunamis: 0,
          volcanoes: 0,
          landslides: 0,
          total: 1,
          riskLevel: 'Medium'
        },
        { 
          state: 'Odisha',
          name: 'Odisha', 
          earthquakes: 0,
          weatherAlerts: 0,
          wildfires: 0,
          floods: 0,
          cyclones: 1,
          droughts: 0,
          tsunamis: 0,
          volcanoes: 0,
          landslides: 0,
          total: 1,
          riskLevel: 'High'
        },
        { 
          state: 'Gujarat',
          name: 'Gujarat', 
          earthquakes: 0,
          weatherAlerts: 0,
          wildfires: 0,
          floods: 0,
          cyclones: 1,
          droughts: 0,
          tsunamis: 0,
          volcanoes: 0,
          landslides: 0,
          total: 1,
          riskLevel: 'Medium'
        },
        { 
          state: 'Uttarakhand',
          name: 'Uttarakhand', 
          earthquakes: 0,
          weatherAlerts: 0,
          wildfires: 1,
          floods: 0,
          cyclones: 0,
          droughts: 0,
          tsunamis: 0,
          volcanoes: 0,
          landslides: 1,
          total: 2,
          riskLevel: 'Medium'
        },
        { 
          state: 'Himachal Pradesh',
          name: 'Himachal Pradesh', 
          earthquakes: 1,
          weatherAlerts: 0,
          wildfires: 0,
          floods: 0,
          cyclones: 0,
          droughts: 0,
          tsunamis: 0,
          volcanoes: 0,
          landslides: 1,
          total: 2,
          riskLevel: 'Medium'
        },
        { 
          state: 'Assam',
          name: 'Assam', 
          earthquakes: 0,
          weatherAlerts: 0,
          wildfires: 0,
          floods: 1,
          cyclones: 0,
          droughts: 0,
          tsunamis: 0,
          volcanoes: 0,
          landslides: 0,
          total: 1,
          riskLevel: 'Medium'
        },
        { 
          state: 'Bihar',
          name: 'Bihar', 
          earthquakes: 0,
          weatherAlerts: 0,
          wildfires: 0,
          floods: 1,
          cyclones: 0,
          droughts: 0,
          tsunamis: 0,
          volcanoes: 0,
          landslides: 0,
          total: 1,
          riskLevel: 'Low'
        },
        { 
          state: 'West Bengal',
          name: 'West Bengal', 
          earthquakes: 0,
          weatherAlerts: 1,
          wildfires: 0,
          floods: 0,
          cyclones: 0,
          droughts: 0,
          tsunamis: 0,
          volcanoes: 0,
          landslides: 0,
          total: 1,
          riskLevel: 'Low'
        },
        { 
          state: 'Andaman & Nicobar',
          name: 'Andaman & Nicobar Islands', 
          earthquakes: 0,
          weatherAlerts: 0,
          wildfires: 0,
          floods: 0,
          cyclones: 0,
          droughts: 0,
          tsunamis: 1,
          volcanoes: 1,
          landslides: 0,
          total: 2,
          riskLevel: 'High'
        }
      ]
    },
    continentStats: [
      { 
        continent: 'Asia', 
        countriesCount: 4, 
        total: 38,
        earthquakes: 8,
        weatherAlerts: 12,
        wildfires: 5,
        floods: 6,
        cyclones: 4,
        tsunamis: 2,
        volcanoes: 1,
        droughts: 0,
        landslides: 0,
        maxMagnitude: 6.8
      },
      { 
        continent: 'North America', 
        countriesCount: 2, 
        total: 22,
        earthquakes: 3,
        weatherAlerts: 8,
        wildfires: 6,
        floods: 2,
        cyclones: 2,
        tsunamis: 0,
        volcanoes: 1,
        droughts: 0,
        landslides: 0,
        maxMagnitude: 4.8
      },
      { 
        continent: 'Oceania', 
        countriesCount: 1, 
        total: 10,
        earthquakes: 0,
        weatherAlerts: 2,
        wildfires: 4,
        floods: 1,
        cyclones: 1,
        tsunamis: 0,
        volcanoes: 0,
        droughts: 2,
        landslides: 0,
        maxMagnitude: 0
      },
      { 
        continent: 'Europe', 
        countriesCount: 1, 
        total: 7,
        earthquakes: 1,
        weatherAlerts: 2,
        wildfires: 1,
        floods: 1,
        cyclones: 0,
        tsunamis: 0,
        volcanoes: 1,
        droughts: 0,
        landslides: 1,
        maxMagnitude: 4.1
      },
      { 
        continent: 'South America', 
        countriesCount: 1, 
        total: 7,
        earthquakes: 2,
        weatherAlerts: 1,
        wildfires: 1,
        floods: 0,
        cyclones: 0,
        tsunamis: 0,
        volcanoes: 1,
        droughts: 1,
        landslides: 1,
        maxMagnitude: 5.3
      }
    ]
  };
};
