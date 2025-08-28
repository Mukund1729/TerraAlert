// Utility functions for geographical data processing

// Get country from coordinates
export const getCountryFromCoordinates = (lat, lon) => {
  // Simple coordinate-based country detection
  // This is a basic implementation - in production, use a proper geocoding service
  
  if (lat >= 8 && lat <= 37 && lon >= 68 && lon <= 97) {
    return 'India';
  } else if (lat >= 24 && lat <= 49 && lon >= -125 && lon <= -66) {
    return 'USA';
  } else if (lat >= 30 && lat <= 46 && lon >= 129 && lon <= 146) {
    return 'Japan';
  } else if (lat >= -11 && lat <= 6 && lon >= 95 && lon <= 141) {
    return 'Indonesia';
  } else if (lat >= 36 && lat <= 42 && lon >= 26 && lon <= 45) {
    return 'Turkey';
  } else if (lat >= -56 && lat <= -17 && lon >= -109 && lon <= -66) {
    return 'Chile';
  } else if (lat >= 14 && lat <= 32 && lon >= -118 && lon <= -86) {
    return 'Mexico';
  } else if (lat >= -44 && lat <= -10 && lon >= 113 && lon <= 154) {
    return 'Australia';
  } else if (lat >= 35 && lat <= 71 && lon >= 19 && lon <= 169) {
    return 'Russia';
  } else if (lat >= 18 && lat <= 71 && lon >= 73 && lon <= 135) {
    return 'China';
  }
  
  return 'Other';
};

// Get Indian state from coordinates
export const getIndianStateFromCoords = (lat, lon) => {
  // Basic coordinate-based Indian state detection
  if (lat >= 28 && lat <= 30.5 && lon >= 76.5 && lon <= 78.5) {
    return 'Delhi';
  } else if (lat >= 18.5 && lat <= 20.5 && lon >= 72.5 && lon <= 73.5) {
    return 'Maharashtra';
  } else if (lat >= 12.5 && lat <= 13.5 && lon >= 77.5 && lon <= 78.5) {
    return 'Karnataka';
  } else if (lat >= 8 && lat <= 10 && lon >= 76 && lon <= 77.5) {
    return 'Kerala';
  } else if (lat >= 12.5 && lat <= 13.5 && lon >= 79.5 && lon <= 80.5) {
    return 'Tamil Nadu';
  } else if (lat >= 22 && lat <= 24.5 && lon >= 87 && lon <= 89) {
    return 'West Bengal';
  } else if (lat >= 30.5 && lat <= 32.5 && lon >= 76.5 && lon <= 78) {
    return 'Himachal Pradesh';
  } else if (lat >= 29.5 && lat <= 31.5 && lon >= 78 && lon <= 80.5) {
    return 'Uttarakhand';
  } else if (lat >= 25.5 && lat <= 27.5 && lon >= 91 && lon <= 93) {
    return 'Assam';
  } else if (lat >= 23 && lat <= 27 && lon >= 68 && lon <= 75) {
    return 'Rajasthan';
  }
  
  return 'Other';
};

// Enhanced country detection from location string
export const getCountryFromLocation = (location) => {
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
    'Japan': ['Japan', 'Honshu', 'Kyushu', 'Shikoku', 'Tokyo', 'Osaka'],
    'USA': ['California', 'Alaska', 'Nevada', 'Hawaii', 'Oregon', 'Washington', 'Texas', 'Florida'],
    'Indonesia': ['Indonesia', 'Java', 'Sumatra', 'Sulawesi', 'Jakarta'],
    'Chile': ['Chile', 'Chilean', 'Santiago'],
    'Turkey': ['Turkey', 'Turkish', 'Istanbul', 'Ankara'],
    'Greece': ['Greece', 'Greek', 'Athens'],
    'Italy': ['Italy', 'Italian', 'Rome', 'Milan'],
    'Mexico': ['Mexico', 'Mexican', 'Mexico City'],
    'Philippines': ['Philippines', 'Philippine', 'Manila'],
    'New Zealand': ['New Zealand', 'Auckland', 'Wellington'],
    'Iran': ['Iran', 'Iranian', 'Tehran'],
    'China': ['China', 'Chinese', 'Beijing', 'Shanghai'],
    'Pakistan': ['Pakistan', 'Karachi', 'Lahore'],
    'Afghanistan': ['Afghanistan', 'Kabul'],
    'Peru': ['Peru', 'Peruvian', 'Lima'],
    'Ecuador': ['Ecuador', 'Quito'],
    'Russia': ['Russia', 'Russian', 'Siberia', 'Moscow'],
    'Papua New Guinea': ['Papua New Guinea', 'Port Moresby'],
    'Fiji': ['Fiji', 'Suva'],
    'Tonga': ['Tonga'],
    'Vanuatu': ['Vanuatu'],
    'Solomon Islands': ['Solomon Islands'],
    'Australia': ['Australia', 'Sydney', 'Melbourne', 'Brisbane']
  };

  for (const [country, patterns] of Object.entries(countryPatterns)) {
    if (patterns.some(pattern => location.toLowerCase().includes(pattern.toLowerCase()))) {
      return country;
    }
  }

  return 'Other';
};
