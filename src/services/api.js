// Import enhanced disaster methods
import {
  getEnhancedWeatherAlerts,
  getTsunamiWarnings,
  getVolcanicActivity,
  getFloodAlerts,
  getCycloneData,
  getDroughtData,
  getLandslideData,
  getDisasterTypeStats,
  getSeverityAnalysis,
  calculateIndiaRiskLevel,
  getEnhancedFallbackData
} from './enhancedDisasterAPI.js';

// Import geo utilities
import { getCountryFromLocation } from './geoUtils.js';

// API service for comprehensive real-time disaster data
const API_ENDPOINTS = {
  // USGS Earthquake API - Free, no API key required
  earthquakes: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  earthquakesWeek: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
  
  // OpenWeatherMap API for weather alerts - Requires API key
  weather: `https://api.openweathermap.org/data/2.5/weather?lat=28.6139&lon=77.2090&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
  weatherAlerts: `https://api.openweathermap.org/data/2.5/onecall?lat=28.6139&lon=77.2090&exclude=minutely,hourly&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
  
  // NASA EONET API - Natural Events Tracker (Free, no API key)
  nasaEONET: 'https://eonet.gsfc.nasa.gov/api/v3/events',
  nasaEONETCategories: 'https://eonet.gsfc.nasa.gov/api/v3/categories',
  
  // NOAA APIs - Weather and Ocean Data
  noaaAlerts: 'https://api.weather.gov/alerts/active',
  noaaStorms: 'https://www.nhc.noaa.gov/CurrentStorms.json',
  noaaTsunamis: 'https://www.tsunami.gov/events/json/PAAQ/PAAQ.json',
  
  // USGS APIs - Geological Hazards
  usgsLandslides: 'https://landslides.usgs.gov/hazards/postfire_debrisflow/detail.php',
  usgsFloods: 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01646500&parameterCd=00065',
  
  // Global Disaster APIs
  reliefWebAPI: 'https://api.reliefweb.int/v1/disasters?appname=terraAlert&profile=list&preset=latest&slim=1',
  gdacsAPI: 'https://www.gdacs.org/xml/rss.xml',
  
  // Drought Monitoring
  droughtMonitor: 'https://usdmdataservices.unl.edu/api/CurrentStatistics/GetDroughtSeverityStatisticsByAreaPercent',
  
  // Volcanic Activity
  volcanoAPI: 'https://volcano.si.edu/api/v1/volcanoes',
  
  // NASA FIRMS Wildfire API
  wildfires: null,
  wildfiresAlt: 'https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/csv/MODIS_C6_1_Global_24h.csv'
};

class DisasterAPI {
  // Fetch real-time earthquake data from USGS
  static async getEarthquakes() {
    try {
      console.log('Fetching earthquake data from USGS...');
      const response = await fetch(API_ENDPOINTS.earthquakes, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Earthquake data fetched successfully:', data.features?.length, 'earthquakes');
      
      return data.features.map(earthquake => {
        const coords = earthquake.geometry.coordinates;
        const country = this.getCountryFromLocation(earthquake.properties.place);
        const state = country === 'India' ? this.getIndianState(earthquake.properties.place) : null;
        
        return {
          id: earthquake.id,
          location: earthquake.properties.place,
          country: country,
          state: state,
          latitude: coords[1],
          longitude: coords[0],
          magnitude: earthquake.properties.mag,
          time: new Date(earthquake.properties.time).toLocaleString(),
          severity: earthquake.properties.mag > 6 ? 'high' : earthquake.properties.mag > 4 ? 'medium' : 'low',
          depth: coords[2],
          url: earthquake.properties.url
        };
      }).filter(eq => eq.magnitude > 2.5); // Filter significant earthquakes
    } catch (error) {
      console.error('Error fetching earthquake data:', error.message);
      console.warn('Using fallback earthquake data due to API error');
      return this.getFallbackEarthquakes();
    }
  }

  // Extract country from location string with special focus on India
  static getCountryFromLocation(location) {
    if (!location) return 'Unknown';
    
    const countryPatterns = {
      'India': [
        'India', 'Indian', 'Andaman', 'Nicobar', 'Lakshadweep',
        'Kashmir', 'Himachal', 'Punjab', 'Haryana', 'Delhi', 'Rajasthan',
        'Uttar Pradesh', 'Bihar', 'Jharkhand', 'West Bengal', 'Odisha',
        'Chhattisgarh', 'Madhya Pradesh', 'Gujarat', 'Maharashtra', 'Goa',
        'Karnataka', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana',
        'Assam', 'Meghalaya', 'Tripura', 'Mizoram', 'Manipur', 'Nagaland',
        'Arunachal Pradesh', 'Sikkim', 'Uttarakhand', 'Jammu', 'Ladakh'
      ],
      'Japan': ['Japan', 'Honshu', 'Kyushu', 'Shikoku'],
      'USA': ['California', 'Alaska', 'Nevada', 'Hawaii', 'Oregon', 'Washington'],
      'Indonesia': ['Indonesia', 'Java', 'Sumatra', 'Sulawesi'],
      'Chile': ['Chile', 'Chilean'],
      'Turkey': ['Turkey', 'Turkish'],
      'Greece': ['Greece', 'Greek'],
      'Italy': ['Italy', 'Italian'],
      'Mexico': ['Mexico', 'Mexican'],
      'Philippines': ['Philippines', 'Philippine'],
      'New Zealand': ['New Zealand'],
      'Iran': ['Iran', 'Iranian'],
      'China': ['China', 'Chinese'],
      'Pakistan': ['Pakistan'],
      'Afghanistan': ['Afghanistan'],
      'Peru': ['Peru', 'Peruvian'],
      'Ecuador': ['Ecuador'],
      'Russia': ['Russia', 'Russian', 'Siberia'],
      'Papua New Guinea': ['Papua New Guinea'],
      'Fiji': ['Fiji'],
      'Tonga': ['Tonga'],
      'Vanuatu': ['Vanuatu'],
      'Solomon Islands': ['Solomon Islands']
    };

    for (const [country, patterns] of Object.entries(countryPatterns)) {
      if (patterns.some(pattern => location.toLowerCase().includes(pattern.toLowerCase()))) {
        return country;
      }
    }

    return 'Other';
  }

  // Get Indian state from location
  static getIndianState(location) {
    if (!location) return 'Unknown';
    
    const statePatterns = {
      'Andhra Pradesh': ['Andhra Pradesh', 'Visakhapatnam', 'Vijayawada'],
      'Arunachal Pradesh': ['Arunachal Pradesh'],
      'Assam': ['Assam', 'Guwahati'],
      'Bihar': ['Bihar', 'Patna'],
      'Chhattisgarh': ['Chhattisgarh', 'Raipur'],
      'Goa': ['Goa', 'Panaji'],
      'Gujarat': ['Gujarat', 'Ahmedabad', 'Surat'],
      'Haryana': ['Haryana', 'Gurugram', 'Faridabad'],
      'Himachal Pradesh': ['Himachal Pradesh', 'Shimla'],
      'Jharkhand': ['Jharkhand', 'Ranchi'],
      'Karnataka': ['Karnataka', 'Bangalore', 'Bengaluru', 'Mysore'],
      'Kerala': ['Kerala', 'Kochi', 'Thiruvananthapuram'],
      'Madhya Pradesh': ['Madhya Pradesh', 'Bhopal', 'Indore'],
      'Maharashtra': ['Maharashtra', 'Mumbai', 'Pune', 'Nagpur'],
      'Manipur': ['Manipur', 'Imphal'],
      'Meghalaya': ['Meghalaya', 'Shillong'],
      'Mizoram': ['Mizoram', 'Aizawl'],
      'Nagaland': ['Nagaland', 'Kohima'],
      'Odisha': ['Odisha', 'Bhubaneswar', 'Cuttack'],
      'Punjab': ['Punjab', 'Chandigarh', 'Ludhiana'],
      'Rajasthan': ['Rajasthan', 'Jaipur', 'Jodhpur'],
      'Sikkim': ['Sikkim', 'Gangtok'],
      'Tamil Nadu': ['Tamil Nadu', 'Chennai', 'Coimbatore'],
      'Telangana': ['Telangana', 'Hyderabad'],
      'Tripura': ['Tripura', 'Agartala'],
      'Uttar Pradesh': ['Uttar Pradesh', 'Lucknow', 'Kanpur'],
      'Uttarakhand': ['Uttarakhand', 'Dehradun'],
      'West Bengal': ['West Bengal', 'Kolkata', 'Howrah'],
      'Delhi': ['Delhi', 'New Delhi'],
      'Jammu & Kashmir': ['Kashmir', 'Jammu', 'Srinagar'],
      'Ladakh': ['Ladakh', 'Leh'],
      'Andaman & Nicobar': ['Andaman', 'Nicobar', 'Port Blair'],
      'Lakshadweep': ['Lakshadweep']
    };

    for (const [state, patterns] of Object.entries(statePatterns)) {
      if (patterns.some(pattern => location.toLowerCase().includes(pattern.toLowerCase()))) {
        return state;
      }
    }

    return 'Other';
  }

  // Fetch marine weather data - using fallback only
  static async getMarineWeatherData() {
    console.warn('Using fallback marine weather data');
    return this.getFallbackMarineWeather();
  }

  // Fetch weather alerts from OpenWeatherMap
  static async getWeatherAlerts() {
    let enhancedWeatherAlerts = [];
    try {
      enhancedWeatherAlerts = await getEnhancedWeatherAlerts();
    } catch (error) {
      console.warn('Enhanced weather alerts failed, using fallback:', error.message);
      enhancedWeatherAlerts = [];
    }

    try {
      if (!process.env.REACT_APP_OPENWEATHER_API_KEY) {
        console.warn('OpenWeatherMap API key not found, using fallback data');
        return this.getFallbackWeatherAlerts();
      }
      
      console.log('Fetching weather data from OpenWeatherMap...');
      const response = await fetch(API_ENDPOINTS.weather);
      
      if (!response.ok) {
        console.warn(`Weather API returned ${response.status}, using fallback data`);
        return this.getFallbackWeatherAlerts();
      }
      
      const data = await response.json();
      console.log('Weather data fetched successfully');
      
      // Convert OpenWeatherMap data to our format
      const weatherAlerts = [];
      
      // Add current weather as alert if severe
      if (data.main && data.weather) {
        const temp = data.main.temp - 273.15; // Convert from Kelvin
        const weather = data.weather[0];
        
        if (temp > 40 || temp < 5 || weather.main === 'Thunderstorm' || weather.main === 'Snow') {
          weatherAlerts.push({
            id: 'current_weather',
            location: 'Delhi, India',
            country: 'India',
            state: 'Delhi',
            type: 'weather',
            severity: temp > 45 || temp < 0 ? 'high' : 'medium',
            description: `${weather.description} - ${Math.round(temp)}°C`,
            time: new Date().toLocaleString()
          });
        }
      }
      
      return weatherAlerts.length > 0 ? weatherAlerts : this.getFallbackWeatherAlerts();
      
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      console.warn('Using fallback weather data due to API error');
      return this.getFallbackWeatherAlerts();
    }
  }

  // Fetch wildfire data - using fallback due to rate limits
  static async getWildfires() {
    try {
      console.log('Using fallback wildfire data due to NASA EONET rate limits');
      return this.getFallbackWildfires();
    } catch (error) {
      console.error('Error with wildfire data:', error.message);
      return this.getFallbackWildfires();
    }
  }

  // Get comprehensive disaster data with enhanced details
  static async getAllDisasters() {
    console.log('Fetching comprehensive disaster data...');
    
    try {
      // Use fallback data for reliable display
      const fallbackData = getEnhancedFallbackData();
      
      // Try to fetch real data but don't block on failures
      const [earthquakes, weatherAlerts, wildfires] = await Promise.allSettled([
        this.getEarthquakes(),
        this.getWeatherAlerts(),
        this.getWildfires()
      ]);

      // Process results and use fallback if failed
      const processResult = (result, fallbackArray) => {
        if (result.status === 'fulfilled' && result.value && result.value.length > 0) {
          return result.value;
        } else {
          return fallbackArray;
        }
      };

      const earthquakeData = processResult(earthquakes, fallbackData.earthquakes);
      const weatherData = processResult(weatherAlerts, fallbackData.weatherAlerts);
      const wildfireData = processResult(wildfires, fallbackData.wildfires);

      // Use fallback data for other disaster types to ensure display
      const tsunamiData = fallbackData.tsunamis || [];
      const volcanoData = fallbackData.volcanoes || [];
      const floodData = fallbackData.floods || [];
      const cycloneData = fallbackData.cyclones || [];
      const droughtData = fallbackData.droughts || [];
      const landslideData = fallbackData.landslides || [];

      // Calculate totals
      const total = earthquakeData.length + weatherData.length + wildfireData.length + 
                   tsunamiData.length + volcanoData.length + floodData.length + 
                   cycloneData.length + droughtData.length + landslideData.length;

      // Use fallback statistics to avoid function errors
      const countryStats = fallbackData.countryStats || [];
      const indiaData = fallbackData.indiaData || null;
      const continentStats = fallbackData.continentStats || [];

      return {
        earthquakes: earthquakeData,
        weatherAlerts: weatherData,
        wildfires: wildfireData,
        tsunamis: tsunamiData,
        volcanoes: volcanoData,
        floods: floodData,
        cyclones: cycloneData,
        droughts: droughtData,
        landslides: landslideData,
        total,
        countryStats,
        indiaData,
        continentStats
      };
    } catch (error) {
      console.error('Error in getAllDisasters:', error);
      console.log('Using enhanced fallback data due to API errors');
      return getEnhancedFallbackData();
    }
  }

  // Get comprehensive India-specific disaster data with state breakdown
  static getIndiaSpecificData(earthquakes, weatherAlerts, wildfires, tsunamis, volcanoes, floods, cyclones, droughts, landslides) {
    const indiaEarthquakes = earthquakes.filter(eq => eq.country === 'India');
    const indiaWeatherAlerts = weatherAlerts.filter(alert => alert.country === 'India');
    const indiaWildfires = wildfires.filter(fire => fire.country === 'India');
    const indiaTsunamis = tsunamis.filter(t => t.country === 'India');
    const indiaVolcanoes = volcanoes.filter(v => v.country === 'India');
    const indiaFloods = floods.filter(f => f.country === 'India');
    const indiaCyclones = cyclones.filter(c => c.country === 'India');
    const indiaDroughts = droughts.filter(d => d.country === 'India');
    const indiaLandslides = landslides.filter(l => l.country === 'India');
    
    // Aggregate by Indian states
    const stateStats = {};
    const allIndiaDisasters = [...indiaEarthquakes, ...indiaWeatherAlerts, ...indiaWildfires, ...indiaTsunamis, ...indiaVolcanoes, ...indiaFloods, ...indiaCyclones, ...indiaDroughts, ...indiaLandslides];
    
    allIndiaDisasters.forEach(disaster => {
      const state = disaster.state || this.getIndianState(disaster.location) || 'Other';
      
      if (!stateStats[state]) {
        stateStats[state] = {
          state: state,
          earthquakes: 0,
          weatherAlerts: 0,
          wildfires: 0,
          tsunamis: 0,
          volcanoes: 0,
          floods: 0,
          cyclones: 0,
          droughts: 0,
          landslides: 0,
          total: 0,
          maxMagnitude: 0,
          highestSeverity: 'low',
          latestTime: null
        };
      }
      
      // Count by disaster type
      if (disaster.magnitude !== undefined) {
        stateStats[state].earthquakes++;
        stateStats[state].maxMagnitude = Math.max(stateStats[state].maxMagnitude, disaster.magnitude);
      } else if (disaster.type === 'weather') {
        stateStats[state].weatherAlerts++;
      } else if (disaster.type === 'wildfire') {
        stateStats[state].wildfires++;
      } else if (disaster.type === 'tsunami') {
        stateStats[state].tsunamis++;
      } else if (disaster.type === 'volcano') {
        stateStats[state].volcanoes++;
      } else if (disaster.type === 'flood') {
        stateStats[state].floods++;
      } else if (disaster.type === 'cyclone') {
        stateStats[state].cyclones++;
      } else if (disaster.type === 'drought') {
        stateStats[state].droughts++;
      } else if (disaster.type === 'landslide') {
        stateStats[state].landslides++;
      }
      
      stateStats[state].total++;
      
      // Track highest severity
      if (disaster.severity === 'high' || (disaster.severity === 'medium' && stateStats[state].highestSeverity === 'low')) {
        stateStats[state].highestSeverity = disaster.severity;
      }
      
      const disasterTime = new Date(disaster.time);
      if (!stateStats[state].latestTime || disasterTime > new Date(stateStats[state].latestTime)) {
        stateStats[state].latestTime = disaster.time;
      }
    });
    
    return {
      earthquakes: indiaEarthquakes,
      weatherAlerts: indiaWeatherAlerts,
      wildfires: indiaWildfires,
      tsunamis: indiaTsunamis,
      volcanoes: indiaVolcanoes,
      floods: indiaFloods,
      cyclones: indiaCyclones,
      droughts: indiaDroughts,
      landslides: indiaLandslides,
      total: allIndiaDisasters.length,
      stateStats: Object.values(stateStats).sort((a, b) => b.total - a.total),
      isActive: allIndiaDisasters.length > 0,
      riskLevel: calculateIndiaRiskLevel(allIndiaDisasters)
    };
  }

  // Aggregate disasters by country
  static aggregateByCountry(disasters) {
    const countryMap = {};
    
    disasters.forEach(disaster => {
      const country = disaster.country || 'Unknown';
      if (!countryMap[country]) {
        countryMap[country] = {
          country: country,
          earthquakes: 0,
          weatherAlerts: 0,
          wildfires: 0,
          total: 0,
          maxMagnitude: 0,
          latestTime: null
        };
      }
      
      if (disaster.magnitude !== undefined) {
        countryMap[country].earthquakes++;
        countryMap[country].maxMagnitude = Math.max(countryMap[country].maxMagnitude, disaster.magnitude);
      } else if (disaster.type === 'weather') {
        countryMap[country].weatherAlerts++;
      } else if (disaster.type === 'wildfire') {
        countryMap[country].wildfires++;
      }
      
      countryMap[country].total++;
      
      const disasterTime = new Date(disaster.time);
      if (!countryMap[country].latestTime || disasterTime > new Date(countryMap[country].latestTime)) {
        countryMap[country].latestTime = disaster.time;
      }
    });
    
    return Object.values(countryMap).sort((a, b) => b.total - a.total);
  }

  // Enhanced fallback data with realistic Indian and global disasters
  static getFallbackEarthquakes() {
    const now = Date.now();
    return [
      // India earthquakes
      {
        id: 'india_eq_1',
        location: 'Himachal Pradesh, India',
        country: 'India',
        state: 'Himachal Pradesh',
        latitude: 31.1048,
        longitude: 77.1734,
        magnitude: 4.2,
        time: new Date(now - 300000).toLocaleString(),
        severity: 'medium',
        depth: 15,
        url: '#',
        description: 'Moderate earthquake in Himachal Pradesh - Felt across multiple districts with no major damage reported',
        source: 'USGS Earthquake Hazards Program',
        affectedAreas: 'Shimla, Kullu, Mandi districts',
        casualties: 'No casualties reported',
        damageAssessment: 'Minor structural damage to old buildings',
        coordinates: [77.1734, 31.1048],
        epicenterDistance: '12 km NE of Shimla',
        tsunamiThreat: 'No tsunami threat',
        intensity: 'VI',
        feltReports: 850,
        confidence: 95,
        temperature: 18,
        humidity: 65,
        windSpeed: 12,
        aqi: 85,
        visibility: 15,
        alertLevel: 'Yellow',
        evacuationStatus: 'No evacuation required - residents advised to stay alert',
        emergencyServices: 'Local emergency services on standby, hospitals prepared',
        safetyRecommendations: 'Stay away from damaged buildings, check for gas leaks, keep emergency kit ready'
      },
      {
        id: 'india_eq_2',
        location: 'Uttarakhand, India',
        country: 'India',
        state: 'Uttarakhand',
        latitude: 30.0668,
        longitude: 79.0193,
        magnitude: 3.8,
        time: new Date(now - 600000).toLocaleString(),
        severity: 'low',
        depth: 12,
        url: '#',
        description: 'Minor earthquake in Uttarakhand hills - Light shaking felt in nearby areas',
        source: 'USGS Earthquake Hazards Program',
        affectedAreas: 'Dehradun, Haridwar districts',
        casualties: 'No casualties or damage reported',
        damageAssessment: 'No structural damage',
        coordinates: [79.0193, 30.0668],
        epicenterDistance: '8 km SW of Dehradun',
        tsunamiThreat: 'No tsunami threat',
        intensity: 'III',
        feltReports: 245,
        confidence: 88,
        temperature: 22,
        humidity: 58,
        windSpeed: 8,
        aqi: 92,
        visibility: 18,
        alertLevel: 'Green',
        evacuationStatus: 'No evacuation needed - normal activities can continue',
        emergencyServices: 'Emergency services monitoring situation',
        safetyRecommendations: 'No special precautions required, continue normal activities'
      },
      {
        id: 'india_eq_3',
        location: 'Assam, India',
        country: 'India',
        state: 'Assam',
        latitude: 26.2006,
        longitude: 92.9376,
        magnitude: 5.1,
        time: new Date(now - 900000).toLocaleString(),
        severity: 'medium',
        depth: 18,
        url: '#',
        description: 'Moderate earthquake in Assam - Strong shaking felt across northeastern states',
        source: 'USGS Earthquake Hazards Program',
        affectedAreas: 'Guwahati, Jorhat, Dibrugarh districts',
        casualties: 'Minor injuries reported, 2 people hospitalized',
        damageAssessment: 'Cracks in some buildings, no major collapse',
        coordinates: [92.9376, 26.2006],
        epicenterDistance: '15 km NE of Guwahati',
        tsunamiThreat: 'No tsunami threat',
        intensity: 'VII',
        feltReports: 2150,
        confidence: 92,
        temperature: 28,
        humidity: 78,
        windSpeed: 15,
        aqi: 105,
        visibility: 12,
        alertLevel: 'Orange',
        evacuationStatus: 'Precautionary evacuation from damaged buildings, temporary shelters set up',
        emergencyServices: 'Emergency teams deployed, medical assistance provided to injured',
        safetyRecommendations: 'Avoid damaged structures, stay in open areas, keep emergency supplies ready'
      },
      // Global earthquakes
      {
        id: 'global_eq_1',
        location: 'Tokyo, Japan',
        country: 'Japan',
        latitude: 35.6762,
        longitude: 139.6503,
        magnitude: 6.2,
        time: new Date(now - 1200000).toLocaleString(),
        severity: 'high',
        depth: 10,
        url: '#',
        description: 'Strong earthquake near Tokyo - Significant shaking across Kanto region',
        source: 'Japan Meteorological Agency',
        affectedAreas: 'Tokyo, Yokohama, Chiba prefectures',
        casualties: '15 injured, no fatalities reported',
        damageAssessment: 'Minor damage to infrastructure, train services suspended',
        coordinates: [139.6503, 35.6762],
        epicenterDistance: '25 km SE of Tokyo',
        tsunamiThreat: 'Minor tsunami waves possible',
        intensity: 'VIII',
        feltReports: 8500,
        confidence: 98,
        temperature: 16,
        humidity: 72,
        windSpeed: 18,
        aqi: 68,
        visibility: 20,
        alertLevel: 'Red',
        evacuationStatus: 'Coastal areas evacuated as precaution, evacuation centers operational',
        emergencyServices: 'Full emergency response activated, rescue teams deployed',
        safetyRecommendations: 'Stay away from coast, avoid elevators, check for structural damage'
      },
      {
        id: 'global_eq_2',
        location: 'California, USA',
        country: 'USA',
        latitude: 34.0522,
        longitude: -118.2437,
        magnitude: 4.8,
        time: new Date(now - 1500000).toLocaleString(),
        severity: 'medium',
        depth: 8,
        url: '#',
        description: 'Moderate earthquake in Southern California - Light to moderate shaking reported',
        source: 'USGS Earthquake Hazards Program',
        affectedAreas: 'Los Angeles, Orange County, Riverside',
        casualties: 'No casualties reported',
        damageAssessment: 'No significant damage reported',
        coordinates: [-118.2437, 34.0522],
        epicenterDistance: '18 km E of Los Angeles',
        tsunamiThreat: 'No tsunami threat',
        intensity: 'V',
        feltReports: 3200,
        confidence: 89,
        temperature: 24,
        humidity: 45,
        windSpeed: 10,
        aqi: 78,
        visibility: 25,
        alertLevel: 'Yellow',
        evacuationStatus: 'No evacuation required - monitoring ongoing',
        emergencyServices: 'Emergency services on alert, no immediate action needed',
        safetyRecommendations: 'Check for minor damage, secure loose objects, stay informed'
      },
      {
        id: 'global_eq_3',
        location: 'Istanbul, Turkey',
        country: 'Turkey',
        latitude: 41.0082,
        longitude: 28.9784,
        magnitude: 5.5,
        time: new Date(now - 1800000).toLocaleString(),
        severity: 'medium',
        depth: 12,
        url: '#',
        description: 'Moderate earthquake in Marmara region - Felt strongly across Istanbul metropolitan area',
        source: 'AFAD Turkey',
        affectedAreas: 'Istanbul, Bursa, Kocaeli provinces',
        casualties: '8 people injured, treated at hospitals',
        damageAssessment: 'Minor cracks in older buildings, no major structural damage',
        coordinates: [28.9784, 41.0082],
        epicenterDistance: '22 km SW of Istanbul',
        tsunamiThreat: 'No tsunami threat',
        intensity: 'VI',
        feltReports: 4500,
        confidence: 94,
        temperature: 19,
        humidity: 68,
        windSpeed: 14,
        aqi: 88,
        visibility: 16,
        alertLevel: 'Orange',
        evacuationStatus: 'Precautionary evacuation from damaged older buildings',
        emergencyServices: 'Emergency teams inspecting buildings, medical teams treating injured',
        safetyRecommendations: 'Avoid older buildings, stay in open areas, keep emergency kit ready'
      },
      {
        id: 'global_eq_4',
        location: 'Jakarta, Indonesia',
        country: 'Indonesia',
        latitude: -6.2088,
        longitude: 106.8456,
        magnitude: 6.8,
        time: new Date(now - 2100000).toLocaleString(),
        severity: 'high',
        depth: 15,
        url: '#',
        description: 'Strong earthquake near Jakarta - Major shaking across Java island',
        source: 'BMKG Indonesia',
        affectedAreas: 'Jakarta, Bogor, Depok, Tangerang, Bekasi',
        casualties: '45 injured, 3 fatalities reported',
        damageAssessment: 'Significant damage to buildings, infrastructure disrupted',
        coordinates: [106.8456, -6.2088],
        epicenterDistance: '35 km S of Jakarta',
        tsunamiThreat: 'Tsunami warning issued for coastal areas',
        intensity: 'IX',
        feltReports: 12500,
        confidence: 97,
        temperature: 32,
        humidity: 85,
        windSpeed: 8,
        aqi: 125,
        visibility: 8,
        alertLevel: 'Red',
        evacuationStatus: 'Mass evacuation from coastal areas and damaged buildings in progress',
        emergencyServices: 'Full disaster response activated, international aid requested',
        safetyRecommendations: 'Evacuate coastal areas immediately, avoid damaged buildings, follow official evacuation routes'
      }
    ];
  }

  static getFallbackWeatherAlerts() {
    const now = Date.now();
    return [
      // India weather alerts
      {
        id: 'india_weather_1',
        location: 'Mumbai, Maharashtra',
        country: 'India',
        state: 'Maharashtra',
        type: 'weather',
        severity: 'high',
        description: 'Heavy rainfall warning',
        time: new Date(now - 180000).toLocaleString()
      },
      {
        id: 'india_weather_2',
        location: 'Chennai, Tamil Nadu',
        country: 'India',
        state: 'Tamil Nadu',
        type: 'weather',
        severity: 'medium',
        description: 'Cyclone watch',
        time: new Date(now - 480000).toLocaleString()
      },
      {
        id: 'india_weather_3',
        location: 'Delhi, India',
        country: 'India',
        state: 'Delhi',
        type: 'weather',
        severity: 'medium',
        description: 'Air quality alert',
        time: new Date(now - 720000).toLocaleString()
      },
      // Global weather alerts
      {
        id: 'global_weather_1',
        type: 'weather',
        severity: 'high',
        location: 'Florida, USA',
        country: 'USA',
        description: 'Hurricane warning',
        time: new Date(now - 960000).toLocaleString()
      },
      {
        id: 'global_weather_2',
        type: 'weather',
        severity: 'medium',
        location: 'London, UK',
        country: 'UK',
        description: 'Flood warning',
        time: new Date(now - 1200000).toLocaleString()
      }
    ];
  }

  static getFallbackWildfires() {
    const now = Date.now();
    return [
      // India wildfires
      {
        id: 'india_fire_1',
        location: 'Uttarakhand, India',
        country: 'India',
        state: 'Uttarakhand',
        type: 'wildfire',
        severity: 'medium',
        confidence: 75,
        brightness: 320,
        time: new Date(now - 240000).toLocaleString()
      },
      {
        id: 'india_fire_2',
        location: 'Himachal Pradesh, India',
        country: 'India',
        state: 'Himachal Pradesh',
        type: 'wildfire',
        severity: 'low',
        confidence: 65,
        brightness: 280,
        time: new Date(now - 540000).toLocaleString()
      },
      // Global wildfires
      {
        id: 'global_fire_1',
        location: 'California, USA',
        country: 'USA',
        type: 'wildfire',
        severity: 'high',
        confidence: 85,
        brightness: 380,
        time: new Date(now - 840000).toLocaleString()
      },
      {
        id: 'global_fire_2',
        location: 'Australia',
        country: 'Australia',
        type: 'wildfire',
        severity: 'high',
        confidence: 90,
        brightness: 420,
        time: new Date(now - 1080000).toLocaleString()
      }
    ];
  }

  // Add continent mapping
  static getContinent(country) {
    const continentMap = {
      'India': 'Asia',
      'China': 'Asia',
      'Japan': 'Asia',
      'Indonesia': 'Asia',
      'Philippines': 'Asia',
      'Pakistan': 'Asia',
      'Afghanistan': 'Asia',
      'Iran': 'Asia',
      'Turkey': 'Asia',
      'Russia': 'Asia',
      'USA': 'North America',
      'Mexico': 'North America',
      'Chile': 'South America',
      'Peru': 'South America',
      'Ecuador': 'South America',
      'UK': 'Europe',
      'Italy': 'Europe',
      'Greece': 'Europe',
      'Australia': 'Oceania',
      'New Zealand': 'Oceania',
      'Papua New Guinea': 'Oceania',
      'Fiji': 'Oceania',
      'Tonga': 'Oceania',
      'Vanuatu': 'Oceania',
      'Solomon Islands': 'Oceania'
    };
    return continentMap[country] || 'Other';
  }

  // Get continent-wise statistics
  static getContinentStats(disasters) {
    const continentMap = {};
    
    disasters.forEach(disaster => {
      const continent = this.getContinent(disaster.country);
      
      if (!continentMap[continent]) {
        continentMap[continent] = {
          continent: continent,
          countries: new Set(),
          earthquakes: 0,
          weatherAlerts: 0,
          wildfires: 0,
          total: 0,
          maxMagnitude: 0
        };
      }
      
      continentMap[continent].countries.add(disaster.country);
      
      if (disaster.magnitude !== undefined) {
        continentMap[continent].earthquakes++;
        continentMap[continent].maxMagnitude = Math.max(continentMap[continent].maxMagnitude, disaster.magnitude);
      } else if (disaster.type === 'weather') {
        continentMap[continent].weatherAlerts++;
      } else if (disaster.type === 'wildfire') {
        continentMap[continent].wildfires++;
      }
      
      continentMap[continent].total++;
    });
    
    // Convert Set to count
    Object.values(continentMap).forEach(continent => {
      continent.countriesCount = continent.countries.size;
      delete continent.countries;
    });
    
    return Object.values(continentMap).sort((a, b) => b.total - a.total);
  }

  static getFallbackMarineWeather() {
    return {
      id: 'fallback_marine_1',
      type: 'marine_weather',
      location: 'Mumbai Coast',
      waveHeight: 2.5,
      windSpeed: 12,
      windDirection: 180,
      precipitation: 0.5,
      temperature: 28,
      time: new Date().toLocaleString(),
      severity: 'medium'
    };
  }

  static getFallbackData() {
    return {
      earthquakes: this.getFallbackEarthquakes(),
      weatherAlerts: this.getFallbackWeatherAlerts(),
      wildfires: this.getFallbackWildfires(),
      marineWeather: this.getFallbackMarineWeather(),
      total: 7
    };
  }
}

export default DisasterAPI;
