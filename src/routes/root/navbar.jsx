import React, { useEffect, useState } from 'react';
import { Dropdown } from '../../compositions';
import { NavLink, Link } from 'react-router-dom';
import { SideNav } from '../../compositions';
import { logo, sportLogoBlack, tennis } from '../../assets';
import { useMediaContext } from '../../utilities/mediaQuery';
import { IsMobile } from '../../utilities/config';
import { useDispatch, useSelector } from 'react-redux';
import { addFavouriteMenu, clearFavouriteMenu } from '../../redux/favouriteMenu';

function Navbar({ className = '', navList, inMain = 4, setThemeVariant, themeVariant, ...props }) {
  const dispatch = useDispatch();
  // const navMain = navList.slice(0, inMain);
  // const navMore = navList.slice(inMain, navList.length);
  const [colorState, setColorState] = useState({});
  const [cacheState, setCacheState] = useState({});
  const regionjson = useSelector((state) => state.origin.apiOrigin.regionJson);
  const jsonArray = JSON.parse(regionjson);
  const [isOpen, setIsOpen] = useState(false);
  const usingScreen = useMediaContext();
  const isDesktop = usingScreen === 'desktop' ? true : false;
  const filteredNavItems = navList;
  const favouriteMenu = useSelector((state) => state?.favouriteMenu);
  useEffect(() => {
    // Ensure regionjson is an array
    if (Array.isArray(jsonArray)) {
      // Filter and set state based on "type"
      const colorObject = jsonArray.find((item) => item.type === 'color');
      const cacheObject = jsonArray.find((item) => item.type === 'cache');

      if (colorObject) setColorState(colorObject);
      if (cacheObject) setCacheState(cacheObject);
    }
  }, []);
  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  const [collapsedIds, setCollapsedIds] = useState({});
  const toggleTheme = () => {
    if (themeVariant === 'light') {
      setThemeVariant('dark');
    } else {
      setThemeVariant('light');
    }
  };
  const ClearStorage = (items) => {
    dispatch(clearFavouriteMenu(items));
  };
  const toggleCollapse = (id) => {
    setCollapsedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const subTopicIds = filteredNavItems.flatMap((item) =>
    item.subTopics.map((subtopic) => subtopic.subTopicID)
  );
  const filteredMenuIds = favouriteMenu
    .filter((item) => subTopicIds.includes(item.state.SubTopicId))
    .map((item) => item.state.SubTopicId);

  const groupedNavItems = filteredNavItems.reduce((groups, item) => {
    const heading = item.topic.mainHeading;
    if (!groups[heading]) {
      groups[heading] = [];
    }
    groups[heading].push(item);
    return groups;
  }, {});

  const handleFavouriteMenu = (isChecked, name, link, state) => {
    // console.log('is check  ', isChecked, name, link, state);
    dispatch(addFavouriteMenu({ isChecked, name, link, state }));
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    const minHour = 6;
    const maxHour = 18;
    if (currentHour >= minHour && currentHour < maxHour) {
      setThemeVariant('light');
    } else {
      setThemeVariant('dark');
    }
  }, []);
  return (
    <div className={themeVariant}>
      <div id="Sidenav" className={`sidenav ${usingScreen} ${isOpen ? 'open' : ''}`}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        {/* coll-sidenav */}
        {Object.entries(groupedNavItems).map(([heading, items]) => (
          <div className="coll-sidenav" key={heading}>
            <div className="coll-item">
              <a
                className="coll-heading"
                data-bs-toggle="collapse"
                //href="#collapseExample"
                href={`#collapseExample-${heading.trim()}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseExample-${heading.trim()}`}>
                <div className="coll-lable">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 0.444824C10.2091 0.444824 12.209 1.34039 13.657 2.78783C15.105 4.23582 16 6.23569 16 8.44482C16 10.654 15.1044 12.6538 13.657 14.1018C12.209 15.5498 10.2091 16.4448 8 16.4448C5.79086 16.4448 3.791 15.5493 2.34301 14.1018C0.895567 12.6538 0 10.654 0 8.44482C0 6.23569 0.895567 4.23582 2.34301 2.78783C3.791 1.33985 5.79086 0.444824 8 0.444824ZM3.29103 12.7429L5.50618 12.6822L6.33509 11.1588L4.84666 8.58143L3.25005 8.64317L1.97637 10.5469L3.29049 12.7434L3.29103 12.7429ZM6.53617 11.2435L5.71491 12.7784L6.84161 14.7138L9.34198 14.6695L10.525 12.8298L9.50755 11.2441H6.53617V11.2435ZM6.66949 14.8061L5.51274 12.8975L3.29486 12.9483L2.58835 13.9931C3.56205 14.9427 4.78492 15.6383 6.14931 15.9727L6.66949 14.8067V14.8061ZM1.94249 6.42911L3.23639 8.42024L4.81169 8.36942L6.35203 5.70184L5.4805 4.05933L3.2506 4.18774L1.94304 6.42911H1.94249ZM1.79059 10.4638L3.03367 8.5328L1.72174 6.49086L0.527286 6.38212C0.346424 7.03891 0.24971 7.73067 0.24971 8.44537C0.24971 9.19013 0.354621 9.90975 0.550782 10.5917L1.79059 10.4644V10.4638ZM9.6813 11.131L10.7173 12.7292L12.7008 12.7396L14.028 10.5556L13.0008 8.64262L11.1697 8.55301L9.6813 11.131ZM12.6483 12.9423L10.7348 12.944L9.54088 14.7269L10.1157 15.9022C11.3561 15.5509 12.4696 14.899 13.3729 14.0297L12.6483 12.9418V12.9423ZM14.2542 6.37502L13.1772 8.51422L14.2335 10.5108L15.4339 10.6425C15.6394 9.94582 15.7497 9.20871 15.7497 8.44537C15.7497 7.68149 15.6394 6.94329 15.4328 6.24552L14.2537 6.37502H14.2542ZM11.1746 8.34483L13.0002 8.39838L14.0411 6.35426L12.7112 4.16752L10.7277 4.13911L9.68404 5.76304L11.1746 8.34429V8.34483ZM9.45782 2.07695L10.7036 3.92382L12.6352 3.96371L13.3712 2.85832C12.4363 1.95893 11.2757 1.29285 9.98347 0.951347L9.45782 2.07695ZM9.51465 5.64611L10.514 4.02218L9.29554 2.19771H6.74435L5.68923 3.9353L6.55474 5.64611H9.5141H9.51465ZM3.24022 3.98666L5.49143 3.84623L6.55911 2.11247L6.01653 0.951347C4.67673 1.30487 3.479 2.00811 2.52715 2.95722L3.23967 3.98666H3.24022Z"
                      fill="black"
                    />
                  </svg>
                  {/* <img alt={} /> */}
                  <h5>{heading}</h5>
                </div>
                <div className="arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.02322 5.70974C2.26316 5.4698 2.65218 5.4698 2.89212 5.70974L9.83055 12.6482L16.769 5.70974C17.0089 5.4698 17.3979 5.4698 17.6379 5.70974C17.8778 5.94968 17.8778 6.3387 17.6379 6.57864L10.265 13.9515C10.0251 14.1915 9.63604 14.1915 9.3961 13.9515L2.02322 6.57864C1.78328 6.3387 1.78328 5.94968 2.02322 5.70974Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </a>
              {items.map((moreItem) => {
                const id = moreItem.topic.name.toLowerCase().replace(/\s+/g, '-');
                const [topicNavType, topicNavTopic, topicNavAddress] = moreItem.topic.news
                  ? [
                      'news',
                      moreItem.topic.name.toLowerCase().replace(/\s/g, '_'),
                      moreItem.topic.news,
                    ]
                  : [
                      'articles',
                      moreItem.topic.name.toLowerCase().replace(/\s/g, '_'),
                      moreItem.topic.articles,
                    ];

                return (
                  <div class="collapse" id={`collapseExample-${heading.trim()}`}>
                    <div className="coll-item-inner">
                      <a
                        className="coll-heading"
                        data-bs-toggle="collapse"
                        href={`#collapseinner1-${id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls={`collapseinner1-${id}`}>
                        <div className="coll-lable">
                          <h5>{moreItem.topic.name}</h5>
                        </div>
                        <div className="action-bar-icon">
                          {moreItem.subTopics.length > 0 && (
                            <>
                              {IsMobile && (
                                <span className="my-action-bar">{moreItem.topic.actionBar}</span>
                              )}
                            </>
                          )}
                        </div>
                        <div className="arrow">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M2.02322 5.70974C2.26316 5.4698 2.65218 5.4698 2.89212 5.70974L9.83055 12.6482L16.769 5.70974C17.0089 5.4698 17.3979 5.4698 17.6379 5.70974C17.8778 5.94968 17.8778 6.3387 17.6379 6.57864L10.265 13.9515C10.0251 14.1915 9.63604 14.1915 9.3961 13.9515L2.02322 6.57864C1.78328 6.3387 1.78328 5.94968 2.02322 5.70974Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                      </a>
                      {moreItem.subTopics.map((team) => {
                        const [navType, navTopic, navAddress] = team.news
                          ? ['news', team.name.toLowerCase().replace(/\s/g, '_'), team.news]
                          : [
                              'articles',
                              team.name.toLowerCase().replace(/\s/g, '_'),
                              team.articles,
                            ];
                        return (
                          <div class="collapse" key={team.name} id={`collapseinner1-${id}`}>
                            <div className="option">
                              <div class="form-check">
                                {IsMobile && (
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    checked={favouriteMenu?.some(
                                      (m) => m?.state.SubTopicId == team?.subTopicID
                                    )}
                                    onChange={(e) =>
                                      handleFavouriteMenu(
                                        e.target.checked,
                                        team.name,
                                        `../${navType}/${navTopic}`,
                                        {
                                          address: navAddress,
                                          topicKey: team?.highlights,
                                          topictype: team?.highlightType,
                                          IsSubtopicVideo: team?.isSubtopicVideo,
                                          topicName: team.name,
                                          TopicId: team.topicID,
                                          navType,
                                          navTopic,
                                          moreItemName: moreItem.topic.name,
                                          SubTopicId: team.subTopicID,
                                          LogoPath: moreItem.topic.logo,
                                          LogoTeam: team.logo,
                                          IsSql: !team.news,
                                          SubttopicHeadline: team.subtopicHeadline,
                                        }
                                      )
                                    }></input>
                                )}
                                {team.newsIcon !== '' && (
                                  <Link
                                    to={`../${navType}/${navTopic}`}
                                    onClick={closeNav}
                                    state={{
                                      address: navAddress,
                                      topicKey: team?.Highlights,
                                      topictype: team?.highlightType,
                                      IsSubtopicVideo: team?.isSubtopicVideo,
                                      topicName: team.name,
                                      TopicId: team.topicID,
                                      navType,
                                      navTopic,
                                      moreItemName: moreItem.topic.name,
                                      SubTopicId: team.subTopicID,
                                      LogoPath: moreItem.topic.logo,
                                      LogoTeam: team.logo,
                                      IsSql: !team.news,
                                      SubttopicHeadline: team.subtopicHeadline,
                                    }}
                                    name={team.name}>
                                    <i className={team.newsIcon}></i>
                                  </Link>
                                )}

                                {team.videoIcon !== null && team.newsIcon === null && (
                                  <Link
                                    to="/highlights"
                                    state={{
                                      topicKey: team?.highlights,
                                      topictype: team?.highlightType,
                                      IsSubtopicVideo: team?.isSubtopicVideo,
                                      topicName: team?.name,
                                      LogoTeam: team.logo,
                                      SubttopicHeadline: team.subtopicHeadline, // Assuming team.LogoTeam is the correct logo path
                                      // Assuming team.LogoTeam is the correct logo path
                                    }}
                                    onClick={closeNav}
                                    name={team.name}>
                                    <img src={team.videoIcon} className="coll-video" alt="" />
                                  </Link>
                                )}
                                <label class="form-check-label d-flex">
                                  <img src={`${team.logo}`} alt={`${team.logo}`} height={'20px'} />
                                  {/* Check if team.VideoIcon is not null and team.NewsIcon is null */}
                                  {team.videoIcon !== '' ? (
                                    team.newsIcon !== '' ? (
                                      <Link
                                        to={`../${navType}/${navTopic}`}
                                        onClick={closeNav}
                                        state={{
                                          address: navAddress,
                                          topicKey: team?.highlights,
                                          topictype: team?.highlightType,
                                          IsSubtopicVideo: team?.isSubtopicVideo,
                                          topicName: team.name,
                                          TopicId: team.topicID,
                                          navType,
                                          navTopic,
                                          moreItemName: moreItem.topic.name,
                                          SubTopicId: team.subTopicID,
                                          LogoPath: moreItem.topic.menuFlag,
                                          LogoTeam: team.logo,
                                          IsSql: !team.news,
                                          SubttopicHeadline: team.subtopicHeadline,
                                        }}
                                        name={team.name}>
                                        {team.name}
                                      </Link>
                                    ) : (
                                      <Link
                                        to="/highlights"
                                        state={{
                                          topicKey: team?.highlights,
                                          topictype: team?.highlightType,
                                          IsSubtopicVideo: team?.isSubtopicVideo,
                                          topicName: team?.name,
                                          LogoTeam: moreItem.topic.logo,
                                          SubttopicHeadline: team.subtopicHeadline, // Assuming team.LogoTeam is the correct logo path
                                          // Assuming team.LogoTeam is the correct logo path
                                        }}
                                        onClick={closeNav}
                                        name={team.name}>
                                        {team.name}
                                      </Link>
                                    )
                                  ) : (
                                    <Link
                                      to={`../${navType}/${navTopic}`}
                                      onClick={closeNav}
                                      state={{
                                        address: navAddress,
                                        topicKey: team?.highlights,
                                        topictype: team?.highlightType,
                                        IsSubtopicVideo: team?.isSubtopicVideo,
                                        topicName: team.name,
                                        TopicId: team.topicID,
                                        navType,
                                        navTopic,
                                        moreItemName: moreItem.topic.name,
                                        SubTopicId: team.subTopicID,
                                        LogoPath: moreItem.topic.logo,
                                        LogoTeam: team.logo,
                                        IsSql: !team.news,
                                        SubttopicHeadline: team.subtopicHeadline,
                                      }}
                                      name={team.name}>
                                      {team.name}
                                    </Link>
                                  )}{' '}
                                </label>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div class="separator"></div>
        {/* coll-sidenav */}
        <div className="coll-sidenav">
          <div className="coll-item">
            <a
              className="coll-heading"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample">
              <div className="coll-lable">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 0.444824C10.2091 0.444824 12.209 1.34039 13.657 2.78783C15.105 4.23582 16 6.23569 16 8.44482C16 10.654 15.1044 12.6538 13.657 14.1018C12.209 15.5498 10.2091 16.4448 8 16.4448C5.79086 16.4448 3.791 15.5493 2.34301 14.1018C0.895567 12.6538 0 10.654 0 8.44482C0 6.23569 0.895567 4.23582 2.34301 2.78783C3.791 1.33985 5.79086 0.444824 8 0.444824ZM3.29103 12.7429L5.50618 12.6822L6.33509 11.1588L4.84666 8.58143L3.25005 8.64317L1.97637 10.5469L3.29049 12.7434L3.29103 12.7429ZM6.53617 11.2435L5.71491 12.7784L6.84161 14.7138L9.34198 14.6695L10.525 12.8298L9.50755 11.2441H6.53617V11.2435ZM6.66949 14.8061L5.51274 12.8975L3.29486 12.9483L2.58835 13.9931C3.56205 14.9427 4.78492 15.6383 6.14931 15.9727L6.66949 14.8067V14.8061ZM1.94249 6.42911L3.23639 8.42024L4.81169 8.36942L6.35203 5.70184L5.4805 4.05933L3.2506 4.18774L1.94304 6.42911H1.94249ZM1.79059 10.4638L3.03367 8.5328L1.72174 6.49086L0.527286 6.38212C0.346424 7.03891 0.24971 7.73067 0.24971 8.44537C0.24971 9.19013 0.354621 9.90975 0.550782 10.5917L1.79059 10.4644V10.4638ZM9.6813 11.131L10.7173 12.7292L12.7008 12.7396L14.028 10.5556L13.0008 8.64262L11.1697 8.55301L9.6813 11.131ZM12.6483 12.9423L10.7348 12.944L9.54088 14.7269L10.1157 15.9022C11.3561 15.5509 12.4696 14.899 13.3729 14.0297L12.6483 12.9418V12.9423ZM14.2542 6.37502L13.1772 8.51422L14.2335 10.5108L15.4339 10.6425C15.6394 9.94582 15.7497 9.20871 15.7497 8.44537C15.7497 7.68149 15.6394 6.94329 15.4328 6.24552L14.2537 6.37502H14.2542ZM11.1746 8.34483L13.0002 8.39838L14.0411 6.35426L12.7112 4.16752L10.7277 4.13911L9.68404 5.76304L11.1746 8.34429V8.34483ZM9.45782 2.07695L10.7036 3.92382L12.6352 3.96371L13.3712 2.85832C12.4363 1.95893 11.2757 1.29285 9.98347 0.951347L9.45782 2.07695ZM9.51465 5.64611L10.514 4.02218L9.29554 2.19771H6.74435L5.68923 3.9353L6.55474 5.64611H9.5141H9.51465ZM3.24022 3.98666L5.49143 3.84623L6.55911 2.11247L6.01653 0.951347C4.67673 1.30487 3.479 2.00811 2.52715 2.95722L3.23967 3.98666H3.24022Z"
                    fill="black"
                  />
                </svg>
                <h5>Settings</h5>
              </div>
              <div className="arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.02322 5.70974C2.26316 5.4698 2.65218 5.4698 2.89212 5.70974L9.83055 12.6482L16.769 5.70974C17.0089 5.4698 17.3979 5.4698 17.6379 5.70974C17.8778 5.94968 17.8778 6.3387 17.6379 6.57864L10.265 13.9515C10.0251 14.1915 9.63604 14.1915 9.3961 13.9515L2.02322 6.57864C1.78328 6.3387 1.78328 5.94968 2.02322 5.70974Z"
                    fill="black"
                  />
                </svg>
              </div>
            </a>
            <div class="collapse" id="collapseExample">
              {colorState.value && (
                <div className="coll-item-inner">
                  <div className="nav-item">
                    <div className="flx">{colorState.name}</div>
                    {/* <i
            className={`${
              collapsedIds['switch'] ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off'
            }`}
            onClick={() => toggleTheme('switch')}
          /> */}
                    <i className={colorState.icon} onClick={() => toggleTheme('switch')} />
                  </div>
                </div>
              )}
              {cacheState.value && (
                <div className="coll-item-inner">
                  <div className="nav-item">
                    <div className="flx">{cacheState.name}</div>
                    {/* <i class="fa-duotone fa-trash" onClick={() => ClearStorage(filteredMenuIds)}></i> */}
                    <i
                      className={cacheState.icon}
                      onClick={() => ClearStorage(filteredMenuIds)}></i>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* coll-sidenav */}
      </div>
      <span style={{ fontSize: '20px', cursor: 'pointer', color: 'white' }} onClick={openNav}>
        &#9776;
      </span>
    </div>
  );
}

export default Navbar;
