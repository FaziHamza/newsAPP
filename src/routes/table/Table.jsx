import { useEffect, useState } from 'react';
import { Link, useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import { useMediaContext } from '../../utilities/mediaQuery';
import { useAsync } from '../../utilities/asyncReducer';
import { fetchNewsTable } from '../../utilities/fetch';
import {
  StoryTile,
  StoryMain,
  AdMobile,
  AdRemote,
  Promo,
  Dropdown,
  ListedTopics,
  StoryTileHorizon,
} from '../../compositions';
// import { addresses } from '../../utilities/config';

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
import { useDispatch, useSelector } from 'react-redux';
import { setarticlevideo } from '../../redux/countries';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addresses = useSelector((state) => state.origin.apiOrigin);
  const allorigin = useSelector((state) => state.origin);
  console.log(allorigin);
  const topicwithsubtopic = useSelector((state) => state.origin.topicwithsubtopic);
  const favouriteMenu = useSelector((state) => state?.favouriteMenu);
  const [settingsInfo, windowHref] = useOutletContext();
  const defaultTopic = settingsInfo.Default;
  const { data: tableInfo, status, error, run } = useAsync({ status: 'pending' });
  const { state } = useLocation();
  const topicKey = state?.topicKey || null;
  const topictype = state?.topictype || null;
  const teamName = state?.Name || null;
  const teamLogoPath = state?.LogoTeam || null;
  const SubTopicId = state?.SubTopicId || null;
  const subtopicvideo = state?.IsSubtopicVideo;

  const [promoVisible, setPromoVisible] = useState(false);
  const isDesktop = useMediaContext();
  const themeVariant = useThemeContext();
  const [mainNewsList, setMainNewsList] = useState([]);
  const [asideNewsList, setAsideNewsList] = useState([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const linkPropsforhighlight = {
    to: subtopicvideo ? '/videohighlights' : '/highlights',
    state: {
      topicKey,
      topictype,
      topicName: teamName,
      LogoTeam: teamLogoPath,
      Subtopicid: SubTopicId,
    },
  };
  useEffect(() => {
    if (shouldNavigate) {
      try {
        navigate(linkPropsforhighlight.to, { state: linkPropsforhighlight.state });
      } catch (error) {
        console.error('Error during navigation:', error);
        // Handle the error as needed
      }
    }
  }, [shouldNavigate, linkPropsforhighlight, navigate]);
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
    if (tableInfo?.length === 0) {
      setShouldNavigate(true);
    }
  }, [tableInfo]);

  useEffect(() => {
    // const address = state?.address ?? 'news/getnews?lang=sv&topic=football&sub1=fbl,ENG,Pr';
    // const address = state?.address ?? 'news/getNewsByTeam?keyword=Pr&lang=en&sport=football&limit=12';
    // console.log(addresses.siteKeyword)

    if (state?.address !== undefined) {
      // Assuming 'state.address' is a URL
      const url = state.address;
      // Regular expression to match the 'keyword' parameter
      const keywordRegex = /[\?&]keyword=([^&#]*)/;
      // Extract the value of 'keyword' from the URL
      const match = url.match(keywordRegex);
      if (match && match[1]) {
        if (topicwithsubtopic !== null) {
          const keyword = decodeURIComponent(match[1]);
          console.log(topicwithsubtopic);
          console.log(keyword);

          // Assuming your object is stored in a variable called 'settingsInfo'
          const foundItems = topicwithsubtopic
            .filter(
              (item) =>
                item.topic &&
                item.subTopics.some(
                  (subtopic) => subtopic.keyword.toLowerCase() === keyword.toLowerCase()
                )
            )
            .map((item) => {
              const filteredSubTopics = item.subTopics.filter(
                (subtopic) => subtopic.keyword.toLowerCase() === keyword.toLowerCase()
              );
              dispatch(setarticlevideo(filteredSubTopics));
              return { subTopics: filteredSubTopics };
            });
          console.log('Settings Info  ', foundItems);
        }
      } else {
        console.error('Keyword not found in the URL');
      }
    }
    const address =
      state?.address ??
      `news/getNewsByTeam?keyword=${addresses.siteKeyword}&lang=${addresses.siteLang}&sport=football&limit=${addresses.siteLimit}`;

    const tablePromise = () => fetchNewsTable(windowHref + '/' + settingsInfo.api + address);
    run(tablePromise());
  }, [run, state, addresses]);

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
                <div className="main-body dark">
                  <div className="row">
                    <div className="col-lg-8">
                      {mainNewsList?.length > 0 ? (
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
                              baseUrl: addresses.baseUrl + settingsInfo.Api,
                              imgUrl: addresses.baseUrl + mainNewsList[0]?._medias[0]?.href,
                            }}
                            to={
                              state
                                ? mainNewsList[0]?._id
                                : `news/${defaultTopic?.toLowerCase().replace(/\s/g, '_')}/${
                                    mainNewsList[0]?._id
                                  }`
                            }>
                            <StoryMain
                              idforlogo={mainNewsList[0]?._id}
                              description={mainNewsList[0]?._abstract}
                              className={'tile-l'}
                              isDesktopScreen={true}
                              src={windowHref + mainNewsList[0]?._medias[0]?.href}
                              alt={mainNewsList[0]?._medias[0]?.href}
                              time={mainNewsList[0]?._published}
                            />
                          </Link>
                        </main>
                      ) : null}
                      <div className="top-articles">
                        {/* 11 */}
                        {mainNewsList?.slice(1)?.map((tileItem) => {
                          return (
                            <>
                              <Link
                                className="story-link"
                                key={tileItem._id}
                                state={{
                                  articleInfo: tileItem,
                                  tableInfo: tableInfo,
                                  baseUrl: addresses.baseUrl + settingsInfo.Api,
                                  imgUrl: addresses.baseUrl + tileItem._medias[0].href,
                                }}
                                to={
                                  state
                                    ? tileItem._id
                                    : `news/${defaultTopic?.Name?.toLowerCase().replace(
                                        /\s/g,
                                        '_'
                                      )}/${tileItem._id}`
                                }>
                                <StoryTile
                                  idforlogo={tileItem._id}
                                  isDesktopScreen={true}
                                  description={tileItem._abstract}
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
                    <div className="col-lg-4">
                      {asideNewsList?.length > 0 ? (
                        <aside className="aside-right">
                          {/* <AdRemote to="www.google.com" badge={appStoreRemote} />
                  <div className="divider-container">
                    <hr className="divider-solid" />
                  </div> */}
                          {/* 11 */}
                          {asideNewsList?.map((tileItem) => {
                            return (
                              <>
                                <Link
                                  className="story-link"
                                  key={tileItem._id}
                                  state={{
                                    articleInfo: tileItem,
                                    tableInfo: tableInfo,
                                    baseUrl: addresses.baseUrl + settingsInfo.Api,
                                    imgUrl: addresses.baseUrl + tileItem._medias[0].href,
                                  }}
                                  to={
                                    state
                                      ? tileItem._id
                                      : `news/${defaultTopic?.Name?.toLowerCase().replace(
                                          /\s/g,
                                          '_'
                                        )}/${tileItem._id}`
                                  }>
                                  <StoryTile
                                    idforlogo={tileItem._id}
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
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <main
                  className={favouriteMenu?.length > 0 ? 'mobileScreen' : 'mobileScreenFavMenu'}>
                  {/* 11 */}

                  {tableInfo.length > 0 &&
                    tableInfo.map((tileItem, index) => {
                      if (index <= topStoryLimit + adSpan)
                        return (
                          <>
                            {/* {index === 0 ? (
                              <Link
                                className="story-link"
                                key={tileItem._id}
                                state={{
                                  articleInfo: tileItem,
                                  baseUrl: addresses.baseUrl + settingsInfo.Api,
                                  imgUrl: addresses.baseUrl + tileItem._medias[0].href,
                                }}
                                to={
                                  state
                                    ? tileItem._id
                                    : `news/${defaultTopic?.toLowerCase().replace(/\s/g, '_')}/${
                                        tileItem._id
                                      }`
                                }>
                                <StoryMain
                                  idforlogo={tileItem._id}
                                  heading={tileItem._title}
                                  description={tileItem._abstract}
                                  src={windowHref + tileItem._medias[0].href}
                                  alt={tileItem._medias[0]?.href}
                                  time={tileItem._published}
                                />
                              </Link>
                            ) : (
                              <div className="story-link-card">
                                <Link
                                  className="story-link"
                                  key={tileItem._id}
                                  state={{
                                    articleInfo: tileItem,
                                    baseUrl: addresses.baseUrl + settingsInfo.Api,
                                    imgUrl: addresses.baseUrl + tileItem._medias[0].href,
                                  }}
                                  to={
                                    state
                                      ? tileItem._id
                                      : `news/${defaultTopic?.toLowerCase().replace(/\s/g, '_')}/${
                                          tileItem._id
                                        }`
                                  }>
                                  <>
                                    {index != null && index >= 1 && index <= 4 ? (
                                      <>
                                        {(index === 1 || index === 3) &&
                                        tableInfo[index] != null &&
                                        tableInfo[index + 1] != null ? (
                                          // <StoryTileHorizon
                                          //   idforlogo={tileItem._id}
                                          //   leftdescription={tileItem._title}
                                          //   leftimagesrc={windowHref + tileItem._medias[0].href}
                                          //   leftimagealt={tileItem._medias[0]?.href}
                                          //   rightdecription={tableInfo[index + 1]._title || ''}
                                          //   rightimagesrc={
                                          //     windowHref +
                                          //     (tableInfo[index + 1]._medias[0]?.href || '')
                                          //   }
                                          //   rightimagealt={
                                          //     tableInfo[index + 1]._medias[0]?.href || ''
                                          //   }
                                          //   time={tileItem._published}
                                          // />

                                          <StoryTileHorizon
                                            idforlogo={tileItem._id}
                                            description={tileItem._title}
                                            className={index === 0 ? '' : 'tile-m'}
                                            src={windowHref + tileItem._medias[0].href}
                                            alt={tileItem._medias[0]?.href}
                                            time={tileItem._published}
                                          />
                                        ) : (
                                          <>
                                            {index !== 2 && index === 3 ? (
                                              <StoryTile
                                                idforlogo={tileItem._id}
                                                description={tileItem._title}
                                                className={index === 0 ? '' : 'tile-m'}
                                                src={windowHref + tileItem._medias[0].href}
                                                alt={tileItem._medias[0]?.href}
                                                time={tileItem._published}
                                              />
                                            ) : (
                                              <p>ad</p>
                                            )}
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <StoryTile
                                        idforlogo={tileItem._id}
                                        description={tileItem._title}
                                        className={index === 0 ? '' : 'tile-m'}
                                        src={windowHref + tileItem._medias[0].href}
                                        alt={tileItem._medias[0]?.href}
                                        time={tileItem._published}
                                      />
                                    )}
                                  </>
                                </Link>
                              </div>
                            )} */}

                            {index === 0 ? (
                              <Link
                              className="story-link"
                              key={tileItem._id}
                              state={{
                                articleInfo: tileItem,
                                baseUrl: addresses.baseUrl + settingsInfo.Api,
                                imgUrl: addresses.baseUrl + tileItem._medias[0].href,
                              }}
                              to={
                                state
                                  ? tileItem._id
                                  : `news/${defaultTopic?.toLowerCase().replace(/\s/g, '_')}/${
                                      tileItem._id
                                    }`
                              }>
                              <StoryMain
                                idforlogo={tileItem._id}
                                heading={tileItem._title}
                                description={tileItem._abstract}
                                src={windowHref + tileItem._medias[0].href}
                                alt={tileItem._medias[0]?.href}
                                time={tileItem._published}
                              />
                            </Link>
                            ) : index >= 1 && index <= 4 ? (
                              <div className="story-link-card second" style={{ display: 'flex' }}>
                                      {(index === 1 || index === 3) &&
                                        tableInfo[index] != null &&
                                        tableInfo[index + 1] != null ? (
                                            <>
                                            <Link
                                className="story-link"
                                key={tableInfo[index]._id}
                                state={{
                                  articleInfo: tableInfo[index],
                                  baseUrl: addresses.baseUrl + settingsInfo.Api,
                                  imgUrl: addresses.baseUrl + tableInfo[index]._medias[0].href,
                                }}
                                to={
                                  state
                                    ? tableInfo[index]._id
                                    : `news/${defaultTopic?.toLowerCase().replace(/\s/g, '_')}/${
                                      tableInfo[index]._id
                                      }`
                                      
                                }
                                style={{width:'100%',margin: '5px'}}
                                >
                                <>
                                <StoryTileHorizon
                                          idforlogo={tableInfo[index]._id}
                                          description={tableInfo[index]._abstract}
                                          className={index === 0 ? '' : 'tile-m'}
                                          src={windowHref + tableInfo[index]._medias[0].href}
                                          alt={tableInfo[index]._medias[0]?.href}
                                          time={tableInfo[index]._published}
                                        />
                                </>
                              </Link>
                              
                              <Link
                                className="story-link"
                                key={tableInfo[index +1]._id}
                                state={{
                                  articleInfo: tableInfo[index+1],
                                  baseUrl: addresses.baseUrl + settingsInfo.Api,
                                  imgUrl: addresses.baseUrl + tableInfo[index+1]._medias[0].href,
                                }}
                                to={
                                  state
                                    ? tableInfo[index+1]._id
                                    : `news/${defaultTopic?.toLowerCase().replace(/\s/g, '_')}/${
                                      tableInfo[index+1]._id
                                      }`
                                      
                                }
                                style={{width:'100%',margin: '5px'}}
                                >
                                <>
                                <StoryTileHorizon
                                          idforlogo={tableInfo[index+1]._id}
                                          description={tableInfo[index+1]._abstract}
                                          className={index === 0 ? '' : 'tile-m'}
                                          src={windowHref + tableInfo[index+1]._medias[0].href}
                                          alt={tableInfo[index+1]._medias[0]?.href}
                                          time={tableInfo[index+1]._published}
                                        />
                                </>
                              </Link>
                                            </>
                                        ) : (
                                          <>
                                            {index !== 2 && index === 3 ? (
                                              <StoryTile
                                                idforlogo={tileItem._id}
                                                description={tileItem._title}
                                                className={index === 0 ? '' : 'tile-m'}
                                                src={windowHref + tileItem._medias[0].href}
                                                alt={tileItem._medias[0]?.href}
                                                time={tileItem._published}
                                              />
                                            ) : (
                                             null
                                            )}
                                          </>
                                        )}
                            </div>
                            ) : (
                              <div className="story-link-card">
                                <Link
                                  className="story-link"
                                  key={tileItem._id}
                                  state={{
                                    articleInfo: tileItem,
                                    baseUrl: addresses.baseUrl + settingsInfo.Api,
                                    imgUrl: addresses.baseUrl + tileItem._medias[0].href,
                                  }}
                                  to={
                                    state
                                      ? tileItem._id
                                      : `news/${defaultTopic?.toLowerCase().replace(/\s/g, '_')}/${
                                          tileItem._id
                                        }`
                                  }>
                                  <>
                                      <StoryTile
                                        idforlogo={tileItem._id}
                                        description={tileItem._title}
                                        className={index === 0 ? '' : 'tile-m'}
                                        src={windowHref + tileItem._medias[0].href}
                                        alt={tileItem._medias[0]?.href}
                                        time={tileItem._published}
                                      />
                                  </>
                                </Link>
                              </div>
                            )}
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
