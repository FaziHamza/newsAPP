import { addresses } from './config';

const fetchGetFunction = (url) =>
  fetch(url, {
    headers: {
      'content-type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Access-Control-Allow-Origin': 'http://localhost:5173',
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
      debugger
      return data;
    })
    .catch((error) => {
      console.error('Error', error);
    });

export const fetchConfig = (windowHref) => fetchGetFunction(`${addresses.baseUrl}api/topics-with-subtopics`);

export const fetchArticleTable = (topic) =>{
  debugger
  fetchGetFunction(`${addresses.baseUrl}/GetArticles/${topic}`);

}

export const fetchArticle = (id) => fetchGetFunction(`${addresses.baseUrl}/GetFromArticles/${id}`);

export const fetchNewsTable = (address) => fetchGetFunction(address);

export const fetchNews = (id) => fetchGetFunction(`${addresses.baseUrl}/GetFromNews/${id}`);
export const fetchHighlights = (id) => fetchGetFunction(`https://www.scorebat.com/video-api/v3/competition/england-premier-league/?token=ODE3NDNfMTY5MjUxODgyM18yNDEwMTkwOTQzNGM3NDIxY2MwZjZkNjM3NzNjMGY4NjFmZmNjZTYy `);

export const fetchFiltered = (requestBody) =>
  fetchPostFunction(`${addresses.baseUrl}/GetFilteredContent`, requestBody);
