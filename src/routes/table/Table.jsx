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
const DisplayComponent = ({ topic }) => {
  const location = useLocation();
  const { state } = location;

  // Now you can access the passed state values
  const moreItemName = state?.moreItemName;
  const teamName = state?.Name;
  const defaulttopic = topic?.Name;
  return (
    <>
      {moreItemName && teamName ? (
        <h4 className="topic-title">{moreItemName} :{teamName}</h4>
      ) : (
        <h4 className="topic-title">{defaulttopic}</h4>

      )}
    </>
  );
}
const Table = ({ topStoryLimit = 4, adSpan = 6 }) => {
  const [settingsInfo, windowHref] = useOutletContext();
  const defaultTopic = settingsInfo.MenuItems[2];
  const { data: tableInfo, status, error, run } = useAsync({ status: 'pending' });
  const { state } = useLocation();
  console.log(state);
  console.log(tableInfo);
  console.log(defaultTopic.Name)
  // console.log(state.Name)
  const [promoVisible, setPromoVisible] = useState(false);
  const isDesktop = useMediaContext();
  const themeVariant = useThemeContext();

  useEffect(() => {
    const address = state?.address ?? defaultTopic.SearchItems.news;
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
                <main>
                  {state ? (
                    <SectionHeader title={state.Name} listItems={state?.subTopics} />
                  ) : (
                    <SectionHeader title={defaultTopic.Name} listItems={defaultTopic.Items} />
                  )}

                  <Link
                    className="story-link"
                    key={tableInfo[0]?._id}
                    state={{
                      articleInfo: tableInfo[0],
                      baseUrl: settingsInfo.Url + settingsInfo.Api,
                      imgUrl: settingsInfo.Url + tableInfo[0]?._medias[0]?.href,
                    }}
                    to={
                      state
                        ? tableInfo[0]?._id
                        : `news/${defaultTopic.Name.toLowerCase().replace(/\s/g, '_')}/${tableInfo[0]?._id
                        }`
                    }>
                    <StoryTile
                      description={tableInfo[0]?._abstract}
                      className={'tile-l'}
                      src={windowHref + tableInfo[0]?._medias[0]?.href}
                      alt={tableInfo[0]?._medias[0]?.href}
                      time={tableInfo[0]?._published}
                    />
                  </Link>
                  asdasasd
                </main>
                <div className="top-articles">
                  {/* fazi */}
                  {/* {tableInfo?.map((tileItem, index) => {
                      if (index > 0 && index <= topStoryLimit) {
                        return (
                          <>
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
                                  : `news/${defaultTopic.Name.toLowerCase().replace(/\s/g, '_')}/${
                                      tileItem._id
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
                            <div className="divider-container">
                              <hr className="divider-solid" />
                            </div>
                          </>
                        );
                      }
                    })} */}
                </div>
                <aside className="aside-right">
                  <AdRemote to="www.google.com" badge={appStoreRemote} />
                  <div className="divider-container">
                    <hr className="divider-solid" />
                  </div>
                  {/* fazi */}
                  {/* {tableInfo.map((tileItem, index) => {
                      if (index > topStoryLimit && index < topStoryLimit + adSpan) {
                        return (
                          <>
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
                                  : `news/${defaultTopic.Name.toLowerCase().replace(/\s/g, '_')}/${
                                      tileItem._id
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
                            <div className="divider-container">
                              <hr className="divider-solid" />
                            </div>
                          </>
                        );
                      }
                    })} */}
                  <AdRemote badge={googlePlayRemote} to="www.google.com" />
                  <div className="divider-container">
                    <hr className="divider-solid" />
                  </div>
                </aside>
              </>
            ) : (
              <>

                {state ? (
                  // <SectionHeader title={state.Name} listItems={state?.subTopics} />
                  < DisplayComponent />
                ) : (
                  < DisplayComponent topic={defaultTopic.Name}/>
                  // <SectionHeader title={defaultTopic.Name} listItems={defaultTopic.Items} />
                )}
                <main>



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



                  {/* fazi */}
                  {tableInfo.map((tileItem, index) => {
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
                                  : `news/${defaultTopic.Name.toLowerCase().replace(/\s/g, '_')}/${tileItem._id
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
                                : `news/${defaultTopic.Name.toLowerCase().replace(/\s/g, '_')}/${tileItem._id
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
