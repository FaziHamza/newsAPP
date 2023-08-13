import { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useMediaContext } from '../../utilities/mediaQuery';
import { useAsync } from '../../utilities/asyncReducer';
import { fetchNewsTable } from '../../utilities/fetch';
import { addresses } from '../../utilities/config';
import { StoryTile } from '../';

const Home = ({ topStoryLimit = 4 }) => {
  const { data: tableInfo, status, error, run } = useAsync({ status: 'pending' });

  const isDesktop = useMediaContext();
  const { type, topic } = useLoaderData();

  useEffect(() => {
    const tablePromise = fetchNewsTable(topic, 'sv');
    run(tablePromise);
  }, [run, topic]);

  switch (status) {
    case 'idle':
      return <div>idle</div>;
    case 'pending':
      return <div>pending</div>;
    case 'resolved':
      return (
        <>
          {isDesktop === 'desktop' ? (
            <>
              <main>
                <Link key={tableInfo[0]._id} to={`/${tableInfo[0]._id}`}>
                  <StoryTile
                    description={tableInfo[0]._abstract}
                    className={'tile-l'}
                    src={addresses.baseUrl + '/' + tableInfo[0]._medias[0].href}
                    alt={tableInfo[0]._medias[0].href}
                  />
                </Link>
              </main>
              <div className="top-articles">
                {tableInfo.map((tileItem, index) => {
                  if (index > 0 && index <= topStoryLimit) {
                    return (
                      <Link key={tileItem._id} to={`/${tileItem._id}`}>
                        <StoryTile
                          description={tileItem._abstract}
                          className={'tile-m'}
                          src={addresses.baseUrl + '/' + tileItem._medias[0].href}
                          alt={tileItem._medias[0].href}
                        />
                      </Link>
                    );
                  }
                })}
              </div>
              <aside className="aside-right">
                {tableInfo.map((tileItem, index) => {
                  if (index > topStoryLimit) {
                    return (
                      <Link key={tileItem._id} to={`/${tileItem._id}`}>
                        <StoryTile
                          description={tileItem._abstract}
                          className={'tile-m'}
                          src={addresses.baseUrl + '/' + tileItem._medias[0].href}
                          alt={tileItem._medias[0].href}
                        />
                      </Link>
                    );
                  }
                })}
              </aside>
            </>
          ) : (
            <main>
              {tableInfo.map((tileItem, index) => {
                return (
                  <Link key={tileItem._id} to={`/${tileItem._id}`}>
                    <StoryTile
                      description={tileItem._abstract}
                      className={index === 0 ? '' : 'tile-m'}
                      src={addresses.baseUrl + '/' + tileItem._medias[0].href}
                      alt={tileItem._medias[0].href}
                    />
                  </Link>
                );
              })}
            </main>
          )}
        </>
      );
    case 'rejected':
      return <div>{error}</div>;
    default:
      return <div>anotherError</div>;
  }
};

export default Home;
