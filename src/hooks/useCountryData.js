import { useState, useEffect } from 'react';
import DisasterAPI from '../services/api';

// Hook for real-time country-wise disaster data
export const useCountryData = () => {
  const [countryStats, setCountryStats] = useState([]);
  const [globalStats, setGlobalStats] = useState({
    totalCountries: 0,
    totalDisasters: 0,
    activeEarthquakes: 0,
    activeAlerts: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchCountryData = async () => {
    try {
      const data = await DisasterAPI.getAllDisasters();
      
      setCountryStats(data.countryStats || []);
      // Calculate unique countries from all disaster data
      const allDisasters = [
        ...(data.earthquakes || []),
        ...(data.weatherAlerts || []),
        ...(data.wildfires || []),
        ...(data.tsunamis || []),
        ...(data.volcanoes || []),
        ...(data.floods || []),
        ...(data.cyclones || []),
        ...(data.droughts || []),
        ...(data.landslides || [])
      ];
      
      const uniqueCountries = new Set(allDisasters.map(disaster => disaster.country).filter(Boolean));
      
      setGlobalStats({
        totalCountries: uniqueCountries.size || 15, // Fallback to reasonable number
        totalDisasters: data.total || 0,
        activeEarthquakes: data.earthquakes?.length || 0,
        activeAlerts: (data.weatherAlerts?.length || 0) + (data.wildfires?.length || 0),
        indiaData: data.indiaData || null,
        continentStats: data.continentStats || []
      });
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching country data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountryData();
    
    // Update every 60 seconds to reduce API load
    const interval = setInterval(fetchCountryData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    countryStats,
    globalStats,
    loading,
    lastUpdated,
    refresh: fetchCountryData
  };
};
