import { useState, useEffect } from 'react';
import DisasterAPI from '../services/api';

// Custom hook for real-time disaster data
export const useDisasterData = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [wildfires, setWildfires] = useState([]);
  const [tsunamis, setTsunamis] = useState([]);
  const [volcanoes, setVolcanoes] = useState([]);
  const [floods, setFloods] = useState([]);
  const [cyclones, setCyclones] = useState([]);
  const [droughts, setDroughts] = useState([]);
  const [landslides, setLandslides] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await DisasterAPI.getAllDisasters();
      setEarthquakes(data.earthquakes || []);
      setWeatherAlerts(data.weatherAlerts || []);
      setWildfires(data.wildfires || []);
      setTsunamis(data.tsunamis || []);
      setVolcanoes(data.volcanoes || []);
      setFloods(data.floods || []);
      setCyclones(data.cyclones || []);
      setDroughts(data.droughts || []);
      setLandslides(data.landslides || []);
      setTotal(data.total || 0);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching disaster data:', error);
      const fallbackData = DisasterAPI.getFallbackData();
      setEarthquakes(fallbackData.earthquakes || []);
      setWeatherAlerts(fallbackData.weatherAlerts || []);
      setWildfires(fallbackData.wildfires || []);
      setTsunamis(fallbackData.tsunamis || []);
      setVolcanoes(fallbackData.volcanoes || []);
      setFloods(fallbackData.floods || []);
      setCyclones(fallbackData.cyclones || []);
      setDroughts(fallbackData.droughts || []);
      setLandslides(fallbackData.landslides || []);
      setTotal(fallbackData.total || 0);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 60 seconds to reduce API load
    const interval = setInterval(fetchData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    earthquakes,
    weatherAlerts,
    wildfires,
    tsunamis,
    volcanoes,
    floods,
    cyclones,
    droughts,
    landslides,
    total,
    loading,
    lastUpdated,
    refresh
  };
};

// Hook for earthquake data only
export const useEarthquakeData = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const data = await DisasterAPI.getEarthquakes();
        setEarthquakes(data);
      } catch (error) {
        console.error('Error fetching earthquakes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  return { earthquakes, loading };
};
