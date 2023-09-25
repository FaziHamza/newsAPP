import { useEffect, useState } from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { useMediaContext } from '../../utilities/mediaQuery';
import { useAsync } from '../../utilities/asyncReducer';
import { fetchNewsTable } from '../../utilities/fetch';
import { StoryTile, StoryMain, AdMobile, AdRemote, Promo, Dropdown, ListedTopics } from '../../compositions';
import {
  appStoreBadgeWhite,
  appStoreBadgeBlack,
  playStoreBadgeBlack,
  playStoreBadgeWhite,
  googlePlayRemote,
  appStoreRemote,
} from '../../assets';
import { useThemeContext } from '../../utilities/themeQuery';
import { divideByPercentage } from '../../utilities/common';

export const loader = ({ params }) => {
  return { params };
};

const SectionHeader = ({ title = 'missingTitle', listItems }) => {
  return (
    <>
      {listItems ? (
        <Dropdown
          className="topic-container listed"
          title={title}
          listItems={<ListedTopics list={listItems} />}
        />
      ) : (
        <h4 className="topic-title">{title}</h4>

      )}
    </>
  );
};

const Table = ({ topStoryLimit = 4, adSpan = 6 }) => {
  const [settingsInfo, windowHref] = useOutletContext();
  const defaultTopic = settingsInfo.Default;
  const { data: tableInfo, status, error, run } = useAsync({ status: 'pending' });
  const { state } = useLocation();
  // console.log(state.Name)
  const [promoVisible, setPromoVisible] = useState(false);
  const isDesktop = useMediaContext();
  const themeVariant = useThemeContext();
  const [mainNewsList, setMainNewsList] = useState([]);
  const [asideNewsList, setAsideNewsList] = useState([]);


  useEffect(() => {
    if (tableInfo?.length > 0) {
      let mainList = tableInfo || [];
      let asideList = [];

      if (isDesktop === 'desktop') {
        mainList = tableInfo.slice(0, 4);
        asideList = tableInfo.length > 4 ? tableInfo.slice(4, 12) : [];
      }

      setMainNewsList(mainList);
      setAsideNewsList(asideList);
    }
  }, [tableInfo]);

  useEffect(() => {
    // const address = state?.address ?? 'news/getnews?lang=sv&topic=football&sub1=fbl,ENG,Pr';
    const address = state?.address ?? 'news/getNewsByTeam?keyword=Pr&lang=en&sport=football&limit=12';
    const tablePromise = () => fetchNewsTable(windowHref + settingsInfo.Api + address);
    run(tablePromise());
  }, [run, state]);

  switch (status) {
    case 'idle':
      return <div>idle</div>;
    case 'pending':
      return (
        <main>
          <div className="pending">loading</div>
        </main>
      );
    case 'resolved': {
      if (!tableInfo || tableInfo.length === 0) {
        return <main>No articles available</main>;
      } else {
        return tableInfo.length === 0 ? (
          <main>No articles available</main>
        ) : (
          <>
            {promoVisible ? (
              <Promo
                setVisible={setPromoVisible}
                playBadge={themeVariant === 'dark' ? playStoreBadgeWhite : playStoreBadgeBlack}
                appBadge={themeVariant === 'dark' ? appStoreBadgeWhite : appStoreBadgeBlack}
              />
            ) : null}
            {isDesktop === 'desktop' ? (
              <>
                <div className='main-body dark'>
                  <div className='row'>
                    <div className='col-lg-8'>
                      {(mainNewsList?.length > 0) ?
                        <main>
                          {/* {state ? (
                      <SectionHeader title={state.Name} listItems={state?.subTopics} />
                    ) : (
                      <SectionHeader title={defaultTopic} listItems={defaultTopic.Items} />
                    )} */}

                          <Link
                            className="story-link"
                            key={mainNewsList[0]?._id}
                            state={{
                              articleInfo: mainNewsList[0],
                              tableInfo: tableInfo,
                              baseUrl: settingsInfo.Url + settingsInfo.Api,
                              imgUrl: settingsInfo.Url + mainNewsList[0]?._medias[0]?.href,
                            }}
                            to={
                              state
                                ? mainNewsList[0]?._id
                                : `news/${defaultTopic?.toLowerCase().replace(/\s/g, '_')}/${mainNewsList[0]?._id
                                }`
                            }>
                            <StoryMain
                              description={mainNewsList[0]?._content}
                              className={'tile-l'}
                              isDesktopScreen={true}
                              src={windowHref + mainNewsList[0]?._medias[0]?.href}
                              alt={mainNewsList[0]?._medias[0]?.href}
                              time={mainNewsList[0]?._published}
                            />
                          </Link>
                        </main>
                        : null}
                      <div className="top-articles">
                        {/* 11 */}
                        {mainNewsList?.slice(1)?.map(tileItem => {
                          return (
                            <>
                              <Link
                                className="story-link"
                                key={tileItem._id}
                                state={{
                                  articleInfo: tileItem,
                                  tableInfo: tableInfo,
                                  baseUrl: settingsInfo.Url + settingsInfo.Api,
                                  imgUrl: settingsInfo.Url + tileItem._medias[0].href,
                                }}
                                to={
                                  state
                                    ? tileItem._id
                                    : `news/${defaultTopic?.Name?.toLowerCase().replace(/\s/g, '_')}/${tileItem._id
                                    }`
                                }>
                                <StoryTile
                                  isDesktopScreen={true}
                                  description={tileItem._content}
                                  className={'tile-m main-list'}
                                  src={windowHref + tileItem._medias[0].href}
                                  alt={tileItem._medias[0]?.href}
                                  time={tileItem._published}
                                />
                              </Link>

                            </>
                          );
                        })}
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      {asideNewsList?.length > 0 ?
                        <aside className="aside-right">
                          {/* <AdRemote to="www.google.com" badge={appStoreRemote} />
                  <div className="divider-container">
                    <hr className="divider-solid" />
                  </div> */}
                          {/* 11 */}
                          {asideNewsList?.map(tileItem => {
                            return (
                              <>
                                <Link
                                  className="story-link"
                                  key={tileItem._id}
                                  state={{
                                    articleInfo: tileItem,
                                    tableInfo: tableInfo,
                                    baseUrl: settingsInfo.Url + settingsInfo.Api,
                                    imgUrl: settingsInfo.Url + tileItem._medias[0].href,
                                  }}
                                  to={
                                    state
                                      ? tileItem._id
                                      : `news/${defaultTopic?.Name?.toLowerCase().replace(/\s/g, '_')}/${tileItem._id
                                      }`
                                  }>
                                  <StoryTile
                                    description={tileItem._abstract}
                                    className={'tile-m'}
                                    src={windowHref + tileItem._medias[0].href}
                                    alt={tileItem._medias[0]?.href}
                                    time={tileItem._published}
                                  />
                                </Link>
                              </>
                            );
                          })}
                          {/* <AdRemote badge={googlePlayRemote} to="www.google.com" />
                  <div className="divider-container">
                    <hr className="divider-solid" />
                  </div> */}
                        </aside>
                        : null}
                    </div>
                  </div>

                </div>

              </>
            ) : (
              <>

                {/* {state ? (
                  // <SectionHeader title={state.Name} listItems={state?.subTopics} />
                  < DisplayComponent />
                ) : (
                  < DisplayComponent topic={defaultTopic}/>
                  // <SectionHeader title={defaultTopic.Name} listItems={defaultTopic.Items} />
                )} */}
                <main className='mobileScreen'>



                  {/* <div className='suggested-card'>
                    <div className='banner'>
                      <img src="https://marketplace.canva.com/EAFLC12zKYg/1/0/1600w/canva-beige-bold-cricket-match-banner-dPokkU7DY2Y.jpg" alt="" />
                    </div>
                    <div className='content'>
                      <p>
                        Lorem ipsum dolor, sit amet conse veritatis, corrupti dolores eaque?
                      </p>
                      <h6>08-09-2023</h6>
                    </div>
                  </div> */}



                  {/* 11 */}

                  {tableInfo.length > 0 && tableInfo.map((tileItem, index) => {
                    if (index <= topStoryLimit + adSpan)
                      return (
                        <>

                          {index === 0 ? (

                            <Link
                              className="story-link"
                              key={tileItem._id}
                              state={{
                                articleInfo: tileItem,
                                baseUrl: settingsInfo.Url + settingsInfo.Api,
                                imgUrl: settingsInfo.Url + tileItem._medias[0].href,
                              }}
                              to={
                                state
                                  ? tileItem._id
                                  : `news/${defaultTopic?.toLowerCase().replace(/\s/g, '_')}/${tileItem._id
                                  }`
                              }>


                              <StoryMain
                                description={tileItem._abstract}

                                src={windowHref + tileItem._medias[0].href}
                                alt={tileItem._medias[0]?.href}
                                time={tileItem._published}
                              />




                            </Link>
                          ) : <Link
                            className="story-link"
                            key={tileItem._id}
                            state={{
                              articleInfo: tileItem,
                              baseUrl: settingsInfo.Url + settingsInfo.Api,
                              imgUrl: settingsInfo.Url + tileItem._medias[0].href,
                            }}
                            to={
                              state
                                ? tileItem._id
                                : `news/${defaultTopic?.toLowerCase().replace(/\s/g, '_')}/${tileItem._id
                                }`
                            }>

                            <StoryTile
                              description={tileItem._abstract}
                              className={index === 0 ? '' : 'tile-m'}
                              src={windowHref + tileItem._medias[0].href}
                              alt={tileItem._medias[0]?.href}
                              time={tileItem._published}
                            />


                          </Link>


                          }

                        </>
                      );
                  })}

                </main>
              </>
            )}
          </>
        );
      }

    }
    case 'rejected':
      return <div>{error}</div>;
    default:
      return <div>anotherError</div>;
  }
};

export default Table;
