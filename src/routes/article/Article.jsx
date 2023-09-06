import { useEffect } from 'react';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import parse from 'html-react-parser';
import { useMediaContext } from '../../utilities/mediaQuery';
import { useAsync } from '../../utilities/asyncReducer';
import { fetchNews, fetchArticle } from '../../utilities/fetch';
import { removeBetween } from '../../utilities/common';
import { addresses } from '../../utilities/config';

import { StoryTile } from '../../compositions';

const topicSettings = {};

export const loader = ({ params }) => {
  return { params };
};

// const AsideArticle = () => {
//   const { params } = useLoaderData();

//   console.log(params);

//   return (
//     <aside className="aside-right">
//       {tableInfo.map((tileItem) => {
//         return (
//           <>
//             <Link
//               className="story-link"
//               to={`../${urlPrefix}${tileItem._id}`}
//               relative="path"
//               key={tileItem._id}>
//               <StoryTile
//                 description={tileItem._abstract}
//                 className={'tile-m'}
//                 src={addresses.baseUrl + '/' + tileItem._medias[0].href}
//                 alt={tileItem._medias[0].href}
//               />
//             </Link>
//             <div className="divider-container">
//               <hr className="divider-solid" />
//             </div>
//           </>
//         );
//       })}
//     </aside>
//   );
// };

const Article = ({ className = '' }) => {
  const isDesktop = useMediaContext();
  const { state } = useLocation();

  const ContentParsed = ({ content = 'Text Missing' }) => {
    const parsedContent = parse(removeBetween(content, 'style="', '"'));

    return <>{parsedContent}</>;
  };

  const { articleInfo } = state;

  return (
    <>
      {isDesktop === 'desktop' ? (
        <>
          <div className='main-body'>
            <main className={`article ${className}`.trim()}>
              <h2>{articleInfo._title}</h2>
              <figure>
                <img src={state.imgUrl} alt={state.imgUrl} />
              </figure>
              <p>
                <ContentParsed content={articleInfo._content} />
              </p>
            </main>
          </div>
          {/* <AsideArticle /> */}
        </>
      ) : (
        <main className={`article ${className}`.trim()}>
          <h2 className='artical-detail'>{articleInfo._title}</h2>
          <figure className='artical-detail'>
            <img src={state.imgUrl} alt={state.imgUrl} />
          </figure>
          <p className='artical-detail-box'>
            <ContentParsed content={articleInfo._content} />
          </p>
        </main>
      )}
    </>
  );
};

export default Article;
