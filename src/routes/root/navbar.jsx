import React, { useState } from 'react';
import { Dropdown } from '../../compositions';
import { NavLink, Link } from 'react-router-dom';
import { SideNav } from '../../compositions';

function Navbar({ className = '', navList, inMain = 4, ...props }) {
  const navMain = navList.slice(0, inMain);
  const navMore = navList.slice(inMain, navList.length);
  const [isOpen, setIsOpen] = useState(false);
  const filteredNavItems = navList
  console.log(filteredNavItems)
  console.log(navList)
   console.log(navList[0].Topic)
   console.log(navList[0].SubTopics)
  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div id="Sidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
        {filteredNavItems.map((moreItem) => {
          return (
            <div key={moreItem.Topic.Name.toUpperCase()}>
              <a href="#" data-bs-toggle="collapse" data-bs-target={`#${moreItem.Topic.Name.toLowerCase().replace(/\s+/g, '-')}`} className="nav-item collapsed" aria-expanded="false">
                <p className="nav-item-child">{moreItem.Topic.Name}</p>
                {moreItem.SubTopics.length > 0 ? (
                  <>
                    <i className="fa-regular fa-chevron-down chevron-up"></i>
                    <i className="fa-regular fa-chevron-up chevron-down"></i>
                  </>
                ) : null}
              </a>
              <div id={moreItem.Topic.Name.toLowerCase().replace(/\s+/g, '-')} className="collapse">
                <ul className="nav-item-sub-child">
                  {moreItem.SubTopics.map((team) => {
                    const [navType, navTopic, navAddress] = team.News
                      ? ['news', team.Name.toLowerCase().replace(/\s/g, '_'), team.News]
                      : ['articles', team.Name.toLowerCase().replace(/\s/g, '_'), team.Articles];
                      console.log(team.Articles)
                    return (
                      <li key={team.Name}>
                        <Link
                          to={`../${navType}/${navTopic}`}
                          state={{
                            address: navAddress,
                            //subTopics: team.Items,
                            Name: team.Name,
                            navType,
                            navTopic,
                            moreItemName: moreItem.Topic.Name,
                            LogoPath:moreItem.Topic.Logo
                          }}
                          name={team.Name}>
                          {team.Name}
                        </Link>
                      </li>
                    );
                  })}
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
