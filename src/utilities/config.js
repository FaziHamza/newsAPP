// // live
// export const addresses = {
//   settingsUrl: 'http://208.109.188.83:8062/api/topics-with-subtopics-Mobile',
//   baseUrl: 'http://208.109.188.83:8062/',
// };

import { useSelector } from 'react-redux';

// // local
// export const addresses = {
//   settingsUrl: 'http://localhost/SportifiedSpot/api/topics-with-subtopics-Mobile',
//   baseUrl: 'http://localhost/SportifiedSpot/',
// };
const GetBaseUrl = () => {
  const menu = useSelector((state) => state?.origin?.selectedOrigin);
  return menu?.baseUrl || "https://sportspotengland.dev/v4/";
};
// console.log("Get Base URL",()=>GetBaseUrl());
export const addresses = {
  settingsUrl: 'https://sportspotengland.dev/v4/api/topics-with-subtopics-Mobile',
  baseUrl: 'https://sportspotengland.dev/v4/',
  // baseUrl: GetBaseUrl,
};
