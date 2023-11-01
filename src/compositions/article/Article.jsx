import { useEffect } from 'react';
import parse from 'html-react-parser';
import { useMediaContext } from '../../utilities/mediaQuery';
import { useAsync } from '../../utilities/asyncReducer';
import { fetchNews, fetchNewsTable } from '../../utilities/fetch';
import { removeBetween } from '../../utilities/common';
// import { addresses } from '../../utilities/config';

import { StoryTile } from '../';
import { useSelector } from 'react-redux';

const AsideArticle = ({ chooseArticle }) => {
  const addresses = useSelector((state) => state.origin.apiOrigin);
  const { data: tableInfo, status, error, run } = useAsync({ status: 'pending' });

  useEffect(() => {
    const tablePromise = fetchNewsTable('football', 'sv');
    run(tablePromise);
  }, [run]);

  switch (status) {
    case 'idle':
      return <div>idle</div>;
    case 'pending':
      return <div>pending</div>;
    case 'resolved':
      return (
        <aside className="aside-right">
          {tableInfo.map((tileItem) => {
            return (
              <StoryTile
                description={tileItem._abstract}
                key={tileItem._id}
                className={'tile-m'}
                src={addresses.baseUrl + '/' + tileItem._medias[0].href}
                alt={tileItem._medias[0].href}
                onClick={() => {
                  chooseArticle(tileItem._id);
                }}
                to={`/${tileItem._id}`}
              />
            );
          })}
        </aside>
      );
    case 'rejected':
      return <div>{error}</div>;
    default:
      return <div>anotherError</div>;
  }
};

const Article = ({ articleChosen, chooseArticle, className = '' }) => {
  const isDesktop = useMediaContext();

  const {
    data: articleInfo,
    status: articleStatus,
    error: articleError,
    run,
  } = useAsync({ status: 'pending' });

  useEffect(() => {
    const articlePromise = fetchNews(articleChosen);
    run(articlePromise);
  }, [run, articleChosen]);

  const ContentParsed = ({ content = 'Text Missing' }) => {
    const parsedContent = parse(removeBetween(content, 'style="', '"'));

    return <>{parsedContent}</>;
  };

  switch (articleStatus) {
    case 'idle':
      return <div>idle</div>;
    case 'pending':
      return <div>pending</div>;
    case 'resolved':
      return (
        <>
          {isDesktop === 'desktop' ? (
            <>
              <main className={`article ${className}`.trim()}>
                <h2>{articleInfo?.title}</h2>
                <figure>
                  <img
                    src={addresses.baseUrl + '/' + articleInfo?.imageUrl}
                    alt={articleInfo?.imageUrl}
                  />
                </figure>
                <h4>{articleInfo?.title}</h4>
                <p>
                  <ContentParsed content={articleInfo?.fullContent} />
                </p>
              </main>
              <AsideArticle chooseArticle={chooseArticle} />
            </>
          ) : (
            <main className={`article ${className}`.trim()}>
              <h2 className="artical-detail">{articleInfo?._title}</h2>
              <figure className="artical-detail">
                <img
                  src={addresses.baseUrl + '/' + articleInfo?.imageUrl}
                  alt={articleInfo?.imageUrl}
                />
              </figure>
              <h4>{articleInfo?.title}</h4>
              <p className="artical-detail-box">
                <ContentParsed content={articleInfo?.fullContent} />
              </p>
            </main>
          )}
        </>
      );
    case 'rejected':
      return <div>{articleError}</div>;
    default:
      return <div>anotherError</div>;
  }
};

export default Article;
