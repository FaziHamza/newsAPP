import React, { useEffect } from 'react';

const GeolocationComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geolocation-db.com/json/');
        if (response.ok) {
          const data = await response.json();
          PostData(data)
          // console.log"GEO",data); // Log the response data to the console
        } else {
          throw new Error('Failed to fetch geolocation data');
        }
      } catch (error) {
        console.error('Error fetching geolocation data:', error);
      }
    };
    const PostData = async (jsondata) => {
      try {
         // Add timestamp to JSON data
          jsondata.timestamp = new Date().toISOString();
          jsondata.mode = navigator.userAgent =='MyCustomWebViewMarker' ?"Mobile-APP" : "Browser";
          jsondata.userdetail = navigator.userAgent + JSON.stringify(navigator.userAgentData)
        const response = await fetch('https://sportifiedspot.com/api/Account/UserLocation', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Access-Control-Allow-Origin': '*',
          },
          cache: 'no-store', // Ignore cached data and force a fresh request
          body: JSON.stringify(jsondata),
        })
        if (response.ok) {
          const data = await response.json();
          
          // console.log"Data Post",data); // Log the response data to the console
        } else {
          throw new Error('Failed to Post Data  ');
        }
      } catch (error) {
        console.error('Error Post Data:', error);
      }
    }

    fetchData();
  }, []);

  return null; // Since you don't want to render anything, return null
};

export default GeolocationComponent;
