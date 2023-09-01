import React, { useState } from 'react';
import { Dropdown } from '../../compositions';
import { NavLink, Link } from 'react-router-dom';
import { SideNav } from '../../compositions';
import { logo, sportLogoBlack, tennis } from '../../assets';

function Navbar({ className = '', navList, inMain = 4, ...props }) {
  const navMain = navList.slice(0, inMain);
  const navMore = navList.slice(inMain, navList.length);
  const [isOpen, setIsOpen] = useState(false);
  const filteredNavItems = navList;

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  const [collapsedIds, setCollapsedIds] = useState({});
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

  return (
    <div>
      <div id="Sidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>

        {Object.entries(groupedNavItems).map(([heading, items]) => (
          <div key={heading}>
            <div className="sidebar-heading">{heading} </div>
            {items.map((moreItem) => {
              const id = moreItem.Topic.Name.toLowerCase().replace(/\s+/g, '-');
              const [topicNavType, topicNavTopic, topicNavAddress] = moreItem.Topic.News
                ? ['news', moreItem.Topic.Name.toLowerCase().replace(/\s/g, '_'), moreItem.Topic.News]
                : ['articles', moreItem.Topic.Name.toLowerCase().replace(/\s/g, '_'), moreItem.Topic.Articles];

              return (
                <div className='try' key={moreItem.Topic.Name.toUpperCase()}>
                  <div className="nav-item">
                    <div className='flx' >
                      {
                        moreItem.Topic.NavLogo ? (
                          <img className='nav-item-img' src={moreItem.Topic.NavLogo} alt="topic-logo" />
                        ) : (
                          <i className="fa-solid fa-football"></i>
                        )
                      }
                      {moreItem.Topic.MenuFlag !== null && (
                        <img src={moreItem.Topic.MenuFlag} className='coll-flag' alt="" />
                      )}
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
                          className={`fa-regular ${collapsedIds[id] ? 'fa-chevron-up' : 'fa-chevron-down'} chevron`}
                          onClick={() => toggleCollapse(id)}
                        />
                      </>
                    )}
                  </div>
                  <div id={id} className={`collapse ${collapsedIds[id] ? 'show' : ''}`}>
                    <ul className="nav-item-sub-child">
                      {moreItem.SubTopics.map((team) => {
                        const [navType, navTopic, navAddress] = team.News
                          ? ['news', team.Name.toLowerCase().replace(/\s/g, '_'), team.News]
                          : ['articles', team.Name.toLowerCase().replace(/\s/g, '_'), team.Articles];
                          return (
                            <li key={team.Name} className='nav-item-sub-child-content'>
                              <div>
                                {/* Check if team.VideoIcon is not null and team.NewsIcon is null */}
                                {team.VideoIcon !== null ? (
                                  team.NewsIcon !== null ? (
                                    <Link
                                      to={`../${navType}/${navTopic}`}
                                      onClick={closeNav}
                                      state={{
                                        address: navAddress,
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
                                      name={team.Name}
                                    >
                                      {team.Name}
                                    </Link>
                                  ) : (
                                    <Link
                                      to="/highlights"
                                      state={{
                                        topicName: moreItem.Topic.Name,
                                        imagesource: moreItem.Topic.Logo, // Assuming team.LogoTeam is the correct logo path
                                         // Assuming team.LogoTeam is the correct logo path
                                      }}
                                      onClick={closeNav}
                                      name={team.Name}
                                    >
                                      {team.Name}
                                    </Link>
                                  )
                                ) : (
                                  <Link
                                    to={`../${navType}/${navTopic}`}
                                    onClick={closeNav}
                                    state={{
                                      address: navAddress,
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
                                    name={team.Name}
                                  >
                                    {team.Name}
                                  </Link>
                                )}
                              </div>
                              <div className='icons'>
                                <a href="">
                                  {team.NewsIcon !== null && (
                                    <i className={team.NewsIcon}></i>
                                    //fa-light fa-newspaper
                                  )}
                                </a>
                                <a href="">
                                  {team.VideoIcon !== null && (
                                    <img src={team.VideoIcon} className='coll-video' alt="" />
                                    //fa-solid fa-video
                                  )}
                                </a>
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
      </div>
      <span style={{ fontSize: '30px', cursor: 'pointer', color: 'white' }} onClick={openNav}>&#9776;</span>
    </div>
  );
}

export default Navbar;
