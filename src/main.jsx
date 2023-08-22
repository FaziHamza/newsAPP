import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, ErrorPage, Table, Article, topicLoader, articleLoader ,Highlights  } from './routes';
import './main.css';

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

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
