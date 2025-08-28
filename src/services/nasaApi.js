// Multi-Source Disaster Data API Service
const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
const NASA_BASE_URL = 'https://api.nasa.gov';

// Free APIs without keys - CORRECTED ENDPOINTS
const USGS_EARTHQUAKE_API = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';
const FEMA_API = 'https://www.fema.gov/api/open/v2';
const NASA_EONET_API = 'https://eonet.gsfc.nasa.gov/api/v2.1';

class NASAApiService {
  constructor() {
    this.apiKey = NASA_API_KEY;
    this.baseUrl = NASA_BASE_URL;
  }

  // NASA API with your key
  async makeNASARequest(endpoint, params = {}) {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      if (this.apiKey) {
        url.searchParams.append('api_key', this.apiKey);
      }
      
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          url.searchParams.append(key, params[key]);
        }
      });

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error(`NASA API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('NASA API failed:', error.message);
      return null;
    }
  }

  // NASA EONET API (no key needed)
  async makeEONETRequest(endpoint, params = {}) {
    try {
      const url = new URL(`${NASA_EONET_API}${endpoint}`);
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          url.searchParams.append(key, params[key]);
        }
      });

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error(`EONET API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('EONET API failed:', error.message);
      return null;
    }
  }

  // USGS Earthquake API (no key needed) - FIXED ENDPOINT
  async getUSGSEarthquakes(magnitude = 'significant') {
    try {
      // Use USGS GeoJSON feeds - these work without CORS issues
      const feedUrl = `${USGS_EARTHQUAKE_API}/${magnitude}_week.geojson`;
      
      const response = await fetch(feedUrl);
      if (!response.ok) throw new Error(`USGS API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('USGS API failed:', error.message);
      return null;
    }
  }

  // FEMA Disaster API (no key needed)
  async getFEMADisasters(params = {}) {
    try {
      const url = new URL(`${FEMA_API}/DisasterDeclarationsSummaries`);
      const defaultParams = {
        '$filter': `declarationDate ge '${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}'`,
        '$orderby': 'declarationDate desc',
        '$top': 50
      };
      
      const finalParams = { ...defaultParams, ...params };
      Object.keys(finalParams).forEach(key => {
        url.searchParams.append(key, finalParams[key]);
      });

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error(`FEMA API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('FEMA API failed:', error.message);
      return null;
    }
  }

  // Get Earth Imagery (Landsat)
  // Get Earth Imagery (Landsat)
  async getEarthImagery(lat, lon, date = null, dim = 0.10) {
    const params = {
      lat,
      lon,
      dim,
      ...(date && { date })
    };
    
    return this.makeNASARequest('/planetary/earth/imagery', params); // makeRequest को makeNASARequest में बदला गया
  }

  // Get Earth Assets (available dates for location)
  async getEarthAssets(lat, lon, begin = null, end = null) {
    const params = {
      lat,
      lon,
      ...(begin && { begin }),
      ...(end && { end })
    };
    
    return this.makeNASARequest('/planetary/earth/assets', params); // makeRequest को makeNASARequest में बदला गया
  }

  // Get specific event by ID
  async getEventById(eventId) {
    // EONET API से इवेंट ID प्राप्त की जाती है, इसलिए makeEONETRequest का उपयोग करें
    return this.makeEONETRequest(`/events/${eventId}`, {}); 
  }

  // Get EONET events from multiple sources - REAL DATA ONLY
  async getNaturalEvents(status = 'open', limit = 20, days = 30) {
    console.log('Fetching REAL disaster data from multiple sources...');
    
    try {
      // Get real data from all sources
      const [eonetData, earthquakes, femaData] = await Promise.all([
        this.makeEONETRequest('/events', { status, limit, days }),
        this.getUSGSEarthquakes('significant'),
        this.getFEMADisasters()
      ]);
      
      let allEvents = [];
      
      // Process EONET events (NASA real data)
      if (eonetData && eonetData.events) {
        console.log(`✅ EONET: Found ${eonetData.events.length} real events`);
        allEvents = [...eonetData.events];
      }
      
      // Process USGS earthquakes (real data)
      if (earthquakes && earthquakes.features) {
        console.log(`✅ USGS: Found ${earthquakes.features.length} real earthquakes`);
        const earthquakeEvents = earthquakes.features.slice(0, 10).map(eq => ({
          id: eq.id,
          title: `M${eq.properties.mag} Earthquake - ${eq.properties.place}`,
          description: `Magnitude ${eq.properties.mag} earthquake at depth ${eq.geometry.coordinates[2]}km`,
          categories: [{ id: 16, title: "Earthquakes" }],
          geometry: [{
            date: new Date(eq.properties.time).toISOString(),
            coordinates: [eq.geometry.coordinates[1], eq.geometry.coordinates[0]] // lat, lon
          }],
          source: 'USGS',
          magnitude: eq.properties.mag,
          depth: eq.geometry.coordinates[2]
        }));
        allEvents = [...allEvents, ...earthquakeEvents];
      }
      
      // Process FEMA disasters (real data)
      if (femaData && femaData.DisasterDeclarationsSummaries) {
        console.log(`✅ FEMA: Found ${femaData.DisasterDeclarationsSummaries.length} real disasters`);
        const femaEvents = femaData.DisasterDeclarationsSummaries.slice(0, 8).map(disaster => ({
          id: `FEMA_${disaster.disasterNumber}`,
          title: `${disaster.incidentType} - ${disaster.state}, ${disaster.declaredCountyArea}`,
          description: disaster.declarationTitle || `${disaster.incidentType} disaster declaration`,
          categories: [{ id: 99, title: disaster.incidentType }],
          geometry: [{
            date: disaster.declarationDate,
            coordinates: [0, 0] // FEMA doesn't provide exact coordinates
          }],
          source: 'FEMA',
          disasterNumber: disaster.disasterNumber,
          state: disaster.state
        }));
        allEvents = [...allEvents, ...femaEvents];
      }
      
      console.log(`🎯 Total real events combined: ${allEvents.length}`);
      return { 
        events: allEvents.slice(0, limit),
        sources: ['NASA EONET', 'USGS', 'FEMA'],
        totalFound: allEvents.length,
        isRealData: true
      };
      
    } catch (error) {
      console.error('❌ All APIs failed:', error);
      return { events: [], error: 'All data sources unavailable' };
    }
  }

  // Get specific event by ID
  async getEventById(eventId) {
    return this.makeRequest(`/EONET/api/v3/events/${eventId}`, {});
  }

  // Get events by category
  async getEventsByCategory(categoryId, status = 'open', limit = 10, days = 30) {
    return this.makeEONETRequest(`/categories/${categoryId}`, { status, limit, days });
  }

  // Get EONET categories
  async getEventCategories() {
    return this.makeEONETRequest('/categories', {});
  }

  // Get Mars Weather Data (using your NASA key)
  async getMarsWeather() {
    return this.makeNASARequest('/insight_weather/', {
      feedtype: 'json',
      ver: '1.0'
    });
  }

  // Get APOD (using your NASA key)
  async getAPOD(date = null, count = null, start_date = null, end_date = null) {
    const params = {
      ...(date && { date }),
      ...(count && { count }),
      ...(start_date && { start_date }),
      ...(end_date && { end_date })
    };
    
    return this.makeNASARequest('/planetary/apod', params);
  }

  // Get Near Earth Objects (using your NASA key)
  async getNearEarthObjects(start_date, end_date) {
    const params = {
      start_date,
      end_date
    };
    
    return this.makeNASARequest('/neo/rest/v1/feed', params);
  }

  // Get comprehensive disaster data from all sources
  async getAllDisasterData() {
    try {
      const [eonetEvents, earthquakes, femaDisasters] = await Promise.all([
        this.makeEONETRequest('/events', { status: 'open', limit: 50 }),
        this.getUSGSEarthquakes({ limit: 50 }),
        this.getFEMADisasters({ '$top': 30 })
      ]);

      return {
        eonet: eonetEvents?.events || [],
        earthquakes: earthquakes?.features || [],
        fema: femaDisasters?.DisasterDeclarationsSummaries || [],
        totalSources: 3,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching comprehensive disaster data:', error);
      return null;
    }
  }

  // Get specific disaster-related data
  async getDisasterData(disasterType) {
    const categoryMap = {
      'wildfires': 8,
      'earthquakes': 16,
      'volcanoes': 12,
      'floods': 5,
      'storms': 10,
      'droughts': 6,
      'dust-storms': 7,
      'landslides': 14,
      'sea-ice': 15
    };

    const categoryId = categoryMap[disasterType];
    if (!categoryId) {
      throw new Error(`Unsupported disaster type: ${disasterType}`);
    }

    return this.getEventsByCategory(categoryId, 'open', 20, 365);
  }

  // Get climate change indicators
  async getClimateData() {
    try {
      // Get recent natural events that indicate climate change
      const events = await this.getNaturalEvents('all', 50, 365);
      
      // Process and categorize events
      const climateIndicators = {
        wildfires: [],
        extremeWeather: [],
        seaIce: [],
        droughts: [],
        floods: []
      };

      if (events && events.events) {
        events.events.forEach(event => {
          const category = event.categories?.[0]?.title?.toLowerCase();
          
          if (category?.includes('wildfire')) {
            climateIndicators.wildfires.push(event);
          } else if (category?.includes('storm') || category?.includes('cyclone')) {
            climateIndicators.extremeWeather.push(event);
          } else if (category?.includes('sea') && category?.includes('ice')) {
            climateIndicators.seaIce.push(event);
          } else if (category?.includes('drought')) {
            climateIndicators.droughts.push(event);
          } else if (category?.includes('flood')) {
            climateIndicators.floods.push(event);
          }
        });
      }

      return climateIndicators;
    } catch (error) {
      console.error('Error fetching climate data:', error);
      return null;
    }
  }

  // Get real-time Earth monitoring data
  async getEarthMonitoringData() {
    try {
      const [events, categories] = await Promise.all([
        this.getNaturalEvents('open', 30, 30),
        this.getEventCategories()
      ]);

      return {
        activeEvents: events?.events || [],
        categories: categories?.categories || [],
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching Earth monitoring data:', error);
      return null;
    }
  }

  // Get historical disaster statistics
  async getHistoricalDisasterStats(year = null) {
    try {
      const startDate = year ? `${year}-01-01` : new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const endDate = year ? `${year}-12-31` : new Date().toISOString().split('T')[0];
      
      const events = await this.getNaturalEvents('all', 100, year ? 365 : 30);
      
      const stats = {
        totalEvents: 0,
        byCategory: {},
        byMonth: {},
        severityDistribution: { low: 0, medium: 0, high: 0 }
      };

      if (events && events.events) {
        stats.totalEvents = events.events.length;
        
        events.events.forEach(event => {
          // Category statistics
          const category = event.categories?.[0]?.title || 'Unknown';
          stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
          
          // Monthly statistics
          if (event.geometry && event.geometry.length > 0) {
            const date = new Date(event.geometry[0].date);
            const month = date.getMonth();
            stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;
          }
          
          // Severity estimation based on event duration and geometry points
          const geometryPoints = event.geometry?.length || 0;
          if (geometryPoints > 10) {
            stats.severityDistribution.high++;
          } else if (geometryPoints > 3) {
            stats.severityDistribution.medium++;
          } else {
            stats.severityDistribution.low++;
          }
        });
      }

      return stats;
    } catch (error) {
      console.error('Error fetching historical disaster stats:', error);
      return null;
    }
  }

  // Get educational content data
  async getEducationalData(topic) {
    try {
      let data = {};
      
      switch (topic) {
        case 'earthquakes':
          data = await this.getDisasterData('earthquakes');
          break;
        case 'wildfires':
          data = await this.getDisasterData('wildfires');
          break;
        case 'climate':
          data = await this.getClimateData();
          break;
        case 'monitoring':
          data = await this.getEarthMonitoringData();
          break;
        default:
          data = await this.getNaturalEvents('open', 10, 30);
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching educational data for ${topic}:`, error);
      return null;
    }
  }
}

// Create and export singleton instance
const nasaApiService = new NASAApiService();
export default nasaApiService;

// Export individual methods for direct use
export const {
  getEarthImagery,
  getEarthAssets,
  getNaturalEvents,
  getEventById,
  getEventsByCategory,
  getEventCategories,
  getMarsWeather,
  getAPOD,
  getNearEarthObjects,
  getDisasterData,
  getClimateData,
  getEarthMonitoringData,
  getHistoricalDisasterStats,
  getEducationalData
} = nasaApiService;
