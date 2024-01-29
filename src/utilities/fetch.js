import { addresses } from './config';

export const fetchGetFunction = (url) =>
  fetch(url, {
    headers: {
      'content-type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      // 'Access-Control-Allow-Origin': '*',
    },
    cache: 'no-store', // Ignore cached data and force a fresh request
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error', error);
    });

const fetchPostFunction = (url, body) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Access-Control-Allow-Origin': '*',
    },
    cache: 'no-store', // Ignore cached data and force a fresh request

    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error', error);
    });

export const fetchConfig = (baseUrlApi, regionId) => {
  console.log('Address From Fetch  ZZAZAZAZ', baseUrlApi);

  return fetchGetFunction(`${baseUrlApi}/api/Topic/GetTopicWithSubTopic?regionId=${regionId}`);
};

export const fetchArticleTable = (topic) => {
  fetchGetFunction(`${addresses.baseUrl}/GetArticles/${topic}`);
};

export const fetchArticle = (id) => fetchGetFunction(`${addresses.baseUrl}/GetFromArticles/${id}`);

export const fetchNewsTable = (address) => fetchGetFunction(address);

export const fetchNews = (id) => fetchGetFunction(`${addresses.baseUrl}/GetFromNews/${id}`);
export const fetchHighlights = () => {
  const url =
    'https://www.scorebat.com/video-api/v3/competition/england-premier-league/?token=ODE3NDNfMTY5MjUxODgyM18yNDEwMTkwOTQzNGM3NDIxY2MwZjZkNjM3NzNjMGY4NjFmZmNjZTYy';
  return fetch(url).then((response) => response.json());
};

export const fetchFiltered = (requestBody) =>
  fetchPostFunction(`${addresses.baseUrl}/GetFilteredContent`, requestBody);
