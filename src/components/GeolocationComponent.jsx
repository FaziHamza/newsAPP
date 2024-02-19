import React, { useEffect } from 'react';

const GeolocationComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geolocation-db.com/json/');
        if (response.ok) {
          const data = await response.json();
          console.log("GEO",data); // Log the response data to the console
        } else {
          throw new Error('Failed to fetch geolocation data');
        }
      } catch (error) {
        console.error('Error fetching geolocation data:', error);
      }
    };

    fetchData();
  }, []);

  return null; // Since you don't want to render anything, return null
};

export default GeolocationComponent;
