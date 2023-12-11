import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, ErrorPage, Table, Article, topicLoader, articleLoader ,Highlights, VideoHighlights, PodCast  } from './routes';
import './main.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import Iframe from './compositions/storyTile/Iframe';
const urlToOpen = 'https://www.svt.se/sport/ridsport/henrik-von-eckermann-tva-i-den-stjarnspackade-finalen-shit-happens--erkdxn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Table />, loader: topicLoader },
      { path: ':type/:topic', element: <Table />, loader: topicLoader },
      { path: ':type/:topic/:id', element: <Article />, loader: articleLoader },
      { path: 'highlights', element: <Highlights /> }, // <-- Add this line
      { path: 'videohighlights', element: <VideoHighlights /> }, // <-- Add this line
      { path: 'podcast', element: <PodCast /> }, // <-- Add this line
      { path: 'iframe', element: <Iframe iframeUrl={urlToOpen}/> }, // <-- Add this line

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
