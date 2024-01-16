import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTagsComponent = ({ articleInfo }) => {
  const title = articleInfo[0]?._title || 'Default Title';
  const imageUrl = "http://sportifiedspot.com/Resources/Images/3a5e0eb2-0570-43cd-8d22-371faa33ae08.png";
  const siteName = "SportBlitz News";
  const articleAuthor = "https://www.facebook.com/SportBlitz/";
  const articlePublishedTime = "2024-01-15T07:37:43+01:00";
  const articleModifiedTime = "2024-01-15T08:53:24+01:00";
  const twitterTitle = "aaaaaaaaaaaaaaaaaaaaaa";
  const ogDescription = "abababaabab";

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta property="og:image:alt" content="An image from SportBlitz News" />
      <meta property="og:url" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="article:author" content={articleAuthor} />
      <meta property="article:published_time" content={articlePublishedTime} />
      <meta property="article:modified_time" content={articleModifiedTime} />
      <meta property="twitter:title" content={twitterTitle} />
      <meta property="og:description" content={ogDescription} />
      {/* ... other meta tags ... */}
    </Helmet>
  );
};

export default MetaTagsComponent;
