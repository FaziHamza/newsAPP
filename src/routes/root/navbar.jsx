import React, { useState } from 'react';
import { Dropdown } from '../../compositions';
import { NavLink, Link } from 'react-router-dom';
import { SideNav } from '../../compositions';

function Navbar({ className = '', navList, inMain = 4, ...props }) {
  const navMain = navList.slice(0, inMain);
  const navMore = navList.slice(inMain, navList.length);
  const [isOpen, setIsOpen] = useState(false);
  const filteredNavItems = navList
  // console.log(filteredNavItems)
  // console.log(navList)
  //  console.log(navList[0].Topic)
  //  console.log(navList[0].SubTopics)
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


  return (
    <div>
      <div id="Sidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
        
        {filteredNavItems.map((moreItem) => {
          
          const id = moreItem.Topic.Name.toLowerCase().replace(/\s+/g, '-');
          const [topicNavType, topicNavTopic, topicNavAddress] = moreItem.Topic.News
            ? ['news', moreItem.Topic.Name.toLowerCase().replace(/\s/g, '_'), moreItem.Topic.News]
            : ['articles', moreItem.Topic.Name.toLowerCase().replace(/\s/g, '_'), moreItem.Topic.Articles];

          return (
            
            <div className='try' key={moreItem.Topic.Name.toUpperCase()}>
              <div className='sidebar-heading' >INTERNATIONALS</div>
              <div className="nav-item">
                {/* <Link
                  to={{
                    pathname: `../${topicNavType}/${topicNavTopic}`,
                    state: {
                      address: topicNavAddress,
                      Name: moreItem.Topic.Name,
                      TopicId: moreItem.Topic.TopicID,
                      LogoPath: moreItem.Topic.Logo,
                    },
                  }}
                >
                  <p className="nav-item-child">{moreItem.Topic.Name}</p>
                </Link> */}

                <Link
                            to={`../${topicNavType}/${topicNavTopic}`}
                            state={{
                              address: topicNavAddress,
                              Name: moreItem.Topic.Name,
                              TopicId: moreItem.Topic.TopicID,
                              LogoPath: moreItem.Topic.Logo,

                            }}
                            name={moreItem.Topic.Name}>
                            {moreItem.Topic.Name}
                          </Link>

                {/* <p className="nav-item-child">{moreItem.Topic.Name}</p> */}
                {/* <Link
                  to={{
                    pathname: `../articles/${moreItem.Topic.Name.toLowerCase().replace(/\s+/g, '-')}`,
                    state: {
                      Name: moreItem.Topic.Name,
                      TopicId: moreItem.Topic.TopicID,
                      LogoPath: moreItem.Topic.Logo,
                    },
                  }}
                >
                  <p className="nav-item-child">{moreItem.Topic.Name}</p>
                </Link> */}

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
                  <ul className="nav-item-sub-child">
                    {moreItem.SubTopics.map((team) => {
                      const [navType, navTopic, navAddress] = team.News
                        ? ['news', team.Name.toLowerCase().replace(/\s/g, '_'), team.News]
                        : ['articles', team.Name.toLowerCase().replace(/\s/g, '_'), team.Articles];
                      return (
                        <li key={team.Name} className='nav-item-sub-child-content' >
                          {/* <p>
                          <i class="fa-light fa-futbol"></i>
                          </p> */}
                          <img className='' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe5j1XrohuZp4SdlAY7YhIk_dX37LtPG4oztz2owD67w&s" alt="logo-images" />
                          <Link
                            to={`../${navType}/${navTopic}`}
                            state={{
                              address: navAddress,
                              //subTopics: team.Items,
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
                        </li>
                      );
                    })}
                  </ul>

                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <span style={{ fontSize: '30px', cursor: 'pointer', color: 'white' }} onClick={openNav}>&#9776;</span>
    </div>
  );
}

export default Navbar;
