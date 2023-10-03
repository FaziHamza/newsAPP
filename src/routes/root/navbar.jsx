import React, { useState } from 'react';
import { Dropdown, Logo } from '../../compositions';
import { NavLink, Link } from 'react-router-dom';
import { SideNav } from '../../compositions';
import { logo, sportLogoBlack, tennis } from '../../assets';
import { useMediaContext } from '../../utilities/mediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { addFavouriteMenu } from '../../redux/favouriteMenu';
import { selectCountry } from '../../redux/countries';

function Navbar({ className = '', navList, inMain = 4, setThemeVariant, themeVariant, ...props }) {
  const dispatch = useDispatch();
  const favouriteMenu = useSelector((state) => state?.favouriteMenu);
  const menu = useSelector((state)=> state?.origin?.origin)
  const selectedMenu = useSelector((state)=> state?.origin?.selectedOrigin)

 
  const navMain = navList.slice(0, inMain);
  const navMore = navList.slice(inMain, navList.length);
  const [isOpen, setIsOpen] = useState(false);
  const usingScreen = useMediaContext();
  const isDesktop = usingScreen === 'desktop' ? true : false;
  const filteredNavItems = navList;

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
  const toggleCollapse = (id) => {
    setCollapsedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const groupedNavItems = filteredNavItems.reduce((groups, item) => {
    const heading = item.Topic.MainHeading;
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
  const handleOrigin=(e)=>{
     dispatch(selectCountry(e?.target?.value))

  }
  return (
    <div className={themeVariant}>
      <div id="Sidenav" className={`sidenav ${usingScreen} ${isOpen ? 'open' : ''}`}>
        <div className="d-flex justify-content-between align-items-center mx-4">
          <div className='d-flex' >
            <Logo />
            <select onChange={handleOrigin}  className={`form-select text-uppercase bg-transparent ${themeVariant == 'light' ? 'text-dark' : 'text-light'} `} aria-label="Default select example">
              <option  className={themeVariant == 'light' ? 'bg-light' : 'bg-dark'}  disabled selected value="">Select Country</option>
            {menu?.map((m)=>{
              return<option key={m?.id} selected={selectedMenu?.id == m?.id} className={` text-uppercase ${themeVariant == 'light' ? 'bg-light' : 'bg-dark'}`} value={`${m?.id}`}>{m?.name} </option>
            })}
            </select>
          </div>
          <a href="javascript:void(0)" className="closebtn position-relative right-0" onClick={closeNav}>
            &times;
          </a>
        </div>
        {Object.entries(groupedNavItems).map(([heading, items]) => (
          <div key={heading}>
            <div class="separator">{heading}</div>
            {/* <div className="sidebar-heading">{heading} </div> */}
            {items.map((moreItem) => {
              const id = moreItem.Topic.Name.toLowerCase().replace(/\s+/g, '-');
              const [topicNavType, topicNavTopic, topicNavAddress] = moreItem.Topic.News
                ? [
                    'news',
                    moreItem.Topic.Name.toLowerCase().replace(/\s/g, '_'),
                    moreItem.Topic.News,
                  ]
                : [
                    'articles',
                    moreItem.Topic.Name.toLowerCase().replace(/\s/g, '_'),
                    moreItem.Topic.Articles,
                  ];

              return (
                <div className="try" key={moreItem.Topic.Name.toUpperCase()}>
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
                      {moreItem.Topic.Name}
                    </div>

                    {moreItem.SubTopics.length > 0 && (
                      <>
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
                  <div id={id} className={`collapse ${collapsedIds[id] ? 'show' : ''}`}>
                    <ul className="nav-item-sub-child">
                      {moreItem.SubTopics.map((team) => {
                        const [navType, navTopic, navAddress] = team.News
                          ? ['news', team.Name.toLowerCase().replace(/\s/g, '_'), team.News]
                          : [
                              'articles',
                              team.Name.toLowerCase().replace(/\s/g, '_'),
                              team.Articles,
                            ];
                        return (
                          <li key={team.Name} className="nav-item-sub-child-content">
                            <div>
                              {/* Check if team.VideoIcon is not null and team.NewsIcon is null */}
                              {team.VideoIcon !== null ? (
                                team.NewsIcon !== null ? (
                                  <Link
                                    to={`../${navType}/${navTopic}`}
                                    onClick={closeNav}
                                    state={{
                                      address: navAddress,
                                      topicKey: team?.Highlights,
                                      Name: team.Name,
                                      TopicId: team.TopicID,
                                      navType,
                                      navTopic,
                                      moreItemName: moreItem.Topic.Name,
                                      SubTopicId: team.SubTopicID,
                                      LogoPath: moreItem.Topic.MenuFlag,
                                      LogoTeam: team.Logo,
                                      IsSql: !team.News,
                                    }}
                                    name={team.Name}>
                                    {team.Name}
                                  </Link>
                                ) : (
                                  <Link
                                    to="/highlights"
                                    state={{
                                      topicKey: team?.Highlights,
                                      topicName: team?.Name,
                                      imagesource: moreItem.Topic.Logo, // Assuming team.LogoTeam is the correct logo path
                                      // Assuming team.LogoTeam is the correct logo path
                                    }}
                                    onClick={closeNav}
                                    name={team.Name}>
                                    {team.Name}
                                  </Link>
                                )
                              ) : (
                                <Link
                                  to={`../${navType}/${navTopic}`}
                                  onClick={closeNav}
                                  state={{
                                    address: navAddress,
                                    topicKey: team?.Highlights,
                                    Name: team.Name,
                                    TopicId: team.TopicID,
                                    navType,
                                    navTopic,
                                    moreItemName: moreItem.Topic.Name,
                                    SubTopicId: team.SubTopicID,
                                    LogoPath: moreItem.Topic.Logo,
                                    LogoTeam: team.Logo,
                                    IsSql: !team.News,
                                  }}
                                  name={team.Name}>
                                  {team.Name}
                                </Link>
                              )}
                            </div>
                            <div className="icons">
                              {/* 
                              <a href="">
                                {team.NewsIcon !== null && (
                                  <i className={team.NewsIcon}></i>
                                  //fa-light fa-newspaper
                                )}
                              </a> */}
                              <input
                                type="checkbox"
                                // checked={favouriteMenu?.some(m=>m?.name ==team?.name)}
                                onChange={(e) =>
                                  handleFavouriteMenu(
                                    e.target.checked,
                                    team.Name,
                                    !team?.NewsIcon ? `/highlights` : `../${navType}/${navTopic}`,
                                    !team?.NewsIcon
                                      ? {
                                          topicKey: team?.Highlights,
                                          topicName: team?.Name,
                                          imagesource: moreItem.Topic.Logo, // Assuming team.LogoTeam is the correct logo path
                                          // Assuming team.LogoTeam is the correct logo path
                                        }
                                      : {
                                          address: navAddress,
                                          topicKey: team?.Highlights,
                                          Name: team.Name,
                                          TopicId: team.TopicID,
                                          navType,
                                          navTopic,
                                          moreItemName: moreItem.Topic.Name,
                                          SubTopicId: team.SubTopicID,
                                          LogoPath: moreItem.Topic.Logo,
                                          LogoTeam: team.Logo,
                                          IsSql: !team.News,
                                        }
                                  )
                                }></input>
                              {team.NewsIcon !== null && (
                                <Link
                                  to={`../${navType}/${navTopic}`}
                                  onClick={closeNav}
                                  state={{
                                    address: navAddress,
                                    topicKey: team?.Highlights,
                                    Name: team.Name,
                                    TopicId: team.TopicID,
                                    navType,
                                    navTopic,
                                    moreItemName: moreItem.Topic.Name,
                                    SubTopicId: team.SubTopicID,
                                    LogoPath: moreItem.Topic.Logo,
                                    LogoTeam: team.Logo,
                                    IsSql: !team.News,
                                  }}
                                  name={team.Name}>
                                  <i className={team.NewsIcon}></i>
                                </Link>
                              )}

                              {team.VideoIcon !== null && team.NewsIcon === null && (
                                <Link
                                  to="/highlights"
                                  state={{
                                    topicKey: team?.Highlights,
                                    topicName: team?.Name,
                                    imagesource: team.Logo, // Assuming team.LogoTeam is the correct logo path
                                    // Assuming team.LogoTeam is the correct logo path
                                  }}
                                  onClick={closeNav}
                                  name={team.Name}>
                                  <img src={team.VideoIcon} className="coll-video" alt="" />
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
      </div>
      <span style={{ fontSize: '20px', cursor: 'pointer', color: 'white' }} onClick={openNav}>
        &#9776;
      </span>
    </div>
  );
}

export default Navbar;
