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
  const [isOpen, setIsOpen] = useState(false);
  const usingScreen = useMediaContext();
  const isDesktop = usingScreen === 'desktop' ? true : false;
  const filteredNavItems = navList;
  const favouriteMenu = useSelector((state) => state?.favouriteMenu);
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
  const filteredMenuIds = favouriteMenu.filter((item) => subTopicIds.includes(item.state.SubTopicId)).map((item) => item.state.SubTopicId);

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

        {Object.entries(groupedNavItems).map(([heading, items]) => (
          <div key={heading}>
            <div class="separator">{heading}</div>
            {/* <div className="sidebar-heading">{heading} </div> */}
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
                <div className="try" key={moreItem.topic.name.toUpperCase()}>
                  <div className="nav-item">
                    <div className="flx">
                      {/* {
                        moreItem.Topic.NavLogo ? (
                          <img className='nav-item-img' src={moreItem.Topic.NavLogo} alt="topic-logo" />
                        ) : (
                          <i className="fa-solid fa-football"></i>
                        )
                      } */}
                      {/* {moreItem.Topic.MenuFlag !== null && (
                        <img src={moreItem.Topic.MenuFlag} className='coll-flag' alt="" />
                      )} */}
                      {/* <Link
                      //"https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-7-scaled.jpg"
                        to={`../${topicNavType}/${topicNavTopic}`}
                        onClick={closeNav}  
                        state={{
                          address: topicNavAddress,
                          Name: moreItem.Topic.Name,
                          TopicId: moreItem.Topic.TopicID,
                          LogoPath: moreItem.Topic.Logo,
                        }}

                        name={moreItem.Topic.Name}>
                        {moreItem.Topic.Name}
                      </Link> */}
                      {moreItem.topic.name}
                    </div>
                    <div className="action-bar-icon">
                      {moreItem.subTopics.length > 0 && (
                        <>
                          {IsMobile && collapsedIds[id] &&  <span className="my-action-bar">{moreItem.topic.actionBar}</span>}
                          <i
                            className={`fa-regular ${
                              collapsedIds[id] ? 'fa-chevron-up' : 'fa-chevron-down'
                            } chevron`}
                            onClick={() => toggleCollapse(id)}
                            // onClick={() => setThemeVariant()}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div id={id} className={`collapse ${collapsedIds[id] ? 'show' : ''}`}>
                    <ul className="nav-item-sub-child">
                      {moreItem.subTopics.map((team) => {
                        const [navType, navTopic, navAddress] = team.news
                          ? ['news', team.name.toLowerCase().replace(/\s/g, '_'), team.news]
                          : [
                              'articles',
                              team.name.toLowerCase().replace(/\s/g, '_'),
                              team.articles,
                            ];
                        return (
                          <li key={team.name} className="nav-item-sub-child-content">
                            <div>
                              {/* Check if team.VideoIcon is not null and team.NewsIcon is null */}
                              {team.videoIcon !== "" ? (
                                team.newsIcon !== "" ? (
                                  <Link
                                    to={`../${navType}/${navTopic}`}
                                    onClick={closeNav}
                                    state={{
                                      address: navAddress,
                                      topicKey: team?.highlights,
                                      topictype: team?.highlightType,
                                      IsSubtopicVideo: team?.isSubtopicVideo,
                                      Name: team.name,
                                      TopicId: team.topicID,
                                      navType,
                                      navTopic,
                                      moreItemName: moreItem.topic.name,
                                      SubTopicId: team.subTopicID,
                                      LogoPath: moreItem.topic.menuFlag,
                                      LogoTeam: team.logo,
                                      IsSql: !team.news,
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
                                      imagesource: moreItem.topic.logo, // Assuming team.LogoTeam is the correct logo path
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
                                    Name: team.name,
                                    TopicId: team.topicID,
                                    navType,
                                    navTopic,
                                    moreItemName: moreItem.topic.name,
                                    SubTopicId: team.subTopicID,
                                    LogoPath: moreItem.topic.logo,
                                    LogoTeam: team.logo,
                                    IsSql: !team.news,
                                  }}
                                  name={team.name}>
                                  {team.name}
                                </Link>
                              )}
                            </div>
                            <div className="icons" style={{ paddingRight: team.newsIcon !== "" ? '15px' : '46px' ,display:'flex'}}>
                              {/* 
                              <a href="">
                                {team.NewsIcon !== null && (
                                  <i className={team.NewsIcon}></i>
                                  //fa-light fa-newspaper
                                )}
                              </a> */}
                              {IsMobile && (
                                <input
                                  type="checkbox"
                                  checked={favouriteMenu?.some(
                                    (m) => m?.state.SubTopicId == team?.subTopicID
                                  )}
                                  onChange={(e) =>
                                    // handleFavouriteMenu(
                                    //   e.target.checked,
                                    //   team.name,
                                    //   team?.newsIcon ? `/highlights` : `../${navType}/${navTopic}`,
                                    //   team?.newsIcon
                                    //     ? {
                                    //         topicKey: team?.highlights,
                                    //         topicName: team?.name,
                                    //         SubTopicId: team.subTopicID,
                                    //         TopicId: team.topicID,
                                    //         // imagesource: moreItem.Topic.Logo, // Assuming team.LogoTeam is the correct logo path
                                    //         // Assuming team.LogoTeam is the correct logo path
                                    //       }
                                    //     : {
                                    //         address: navAddress,
                                    //         topicKey: team?.highlights,
                                    //         topictype: team?.highlightType,
                                    //         IsSubtopicVideo: team?.isSubtopicVideo,
                                    //         Name: team.name,
                                    //         TopicId: team.topicID,
                                    //         navType,
                                    //         navTopic,
                                    //         moreItemName: moreItem.topic.name,
                                    //         SubTopicId: team.subTopicID,
                                    //         LogoPath: moreItem.topic.logo,
                                    //         LogoTeam: team.logo,
                                    //         IsSql: !team.news,
                                    //       }
                                    // )
                                    handleFavouriteMenu(
                                      e.target.checked,
                                      team.name,
                                       `../${navType}/${navTopic}`,
                                     {
                                            address: navAddress,
                                            topicKey: team?.highlights,
                                            topictype: team?.highlightType,
                                            IsSubtopicVideo: team?.isSubtopicVideo,
                                            Name: team.name,
                                            TopicId: team.topicID,
                                            navType,
                                            navTopic,
                                            moreItemName: moreItem.topic.name,
                                            SubTopicId: team.subTopicID,
                                            LogoPath: moreItem.topic.logo,
                                            LogoTeam: team.logo,
                                            IsSql: !team.news,
                                          }
                                    )
                                  }></input>
                              )}
                              {team.newsIcon !== "" && (
                                <Link
                                  to={`../${navType}/${navTopic}`}
                                  onClick={closeNav}
                                  state={{
                                    address: navAddress,
                                    topicKey: team?.Highlights,
                                    topictype: team?.highlightType,
                                    IsSubtopicVideo: team?.isSubtopicVideo,
                                    Name: team.name,
                                    TopicId: team.topicID,
                                    navType,
                                    navTopic,
                                    moreItemName: moreItem.topic.name,
                                    SubTopicId: team.subTopicID,
                                    LogoPath: moreItem.topic.logo,
                                    LogoTeam: team.logo,
                                    IsSql: !team.news,
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
                                    imagesource: team.logo, // Assuming team.LogoTeam is the correct logo path
                                    // Assuming team.LogoTeam is the correct logo path
                                  }}
                                  onClick={closeNav}
                                  name={team.name}>
                                  <img src={team.videoIcon} className="coll-video" alt="" />
                                </Link>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div class="separator">Settings</div>
        <div className="nav-item">
          <div className="flx">Color palette</div>
          <i
            className={`${
              collapsedIds['switch'] ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off'
            }`}
            onClick={() => toggleTheme('switch')}
          />
        </div>
        <div className="nav-item">
          <div className="flx">Clear Cache</div>
          <i class="fa-duotone fa-trash" onClick={() => ClearStorage(filteredMenuIds)}></i>
        </div>
      </div>
      <span style={{ fontSize: '20px', cursor: 'pointer', color: 'white' }} onClick={openNav}>
        &#9776;
      </span>
    </div>
  );
}

export default Navbar;
