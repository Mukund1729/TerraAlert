// nasaApi.js

const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
const NASA_BASE_URL = 'https://api.nasa.gov';
const NASA_EONET_API = 'https://eonet.gsfc.nasa.gov/api/v2.1';

class NASAApiService {
  constructor() {
    this.apiKey = NASA_API_KEY;
    this.baseUrl = NASA_BASE_URL;
  }

  // 🌍 NASA API request
  async makeNASARequest(endpoint, params = {}) {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      if (this.apiKey) url.searchParams.append('api_key', this.apiKey);

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

  // 🌍 EONET API request
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

  // ✅ Example APIs

  // Earth Imagery
  async getEarthImagery(lat, lon, date = null, dim = 0.10) {
    const params = { lat, lon, dim, ...(date && { date }) };
    return this.makeNASARequest('/planetary/earth/imagery', params);
  }

  // Earth Assets
  async getEarthAssets(lat, lon, begin = null, end = null) {
    const params = { lat, lon, ...(begin && { begin }), ...(end && { end }) };
    return this.makeNASARequest('/planetary/earth/assets', params);
  }

  // Astronomy Picture of the Day
  async getAPOD(date = null, count = null, start_date = null, end_date = null) {
    const params = {
      ...(date && { date }),
      ...(count && { count }),
      ...(start_date && { start_date }),
      ...(end_date && { end_date })
    };
    return this.makeNASARequest('/planetary/apod', params);
  }

  // Near Earth Objects
  async getNearEarthObjects(start_date, end_date) {
    return this.makeNASARequest('/neo/rest/v1/feed', { start_date, end_date });
  }

  // Mars Weather
  async getMarsWeather() {
    return this.makeNASARequest('/insight_weather/', { feedtype: 'json', ver: '1.0' });
  }

  // EONET Natural Events
  async getNaturalEvents(status = 'open', limit = 20, days = 30) {
    return this.makeEONETRequest('/events', { status, limit, days });
  }

  // EONET Event Categories
  async getEventCategories() {
    return this.makeEONETRequest('/categories', {});
  }

  // Event by ID
  async getEventById(eventId) {
    return this.makeEONETRequest(`/events/${eventId}`, {});
  }

  // Events by Category
  async getEventsByCategory(categoryId, status = 'open', limit = 10, days = 30) {
    return this.makeEONETRequest(`/categories/${categoryId}`, { status, limit, days });
  }
}

// 🔥 Create Singleton
const nasaApiService = new NASAApiService();

// ✅ Export (default + named)
export default nasaApiService;
export { nasaApiService };
