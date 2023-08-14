import React, { useState } from 'react';
import { Dropdown } from '../../compositions';
// import { SideNav } from '../../components';
import { NavLink, Link } from 'react-router-dom';
import { SideNav } from '../../compositions';

function Navbar({ className = '', navList, inMain = 4, ...props }) {
  const navMain = navList.slice(0, inMain);
  console.log(navList)
  const navMore = navList.slice(inMain, navList.length);
  const [isOpen, setIsOpen] = useState(false); // Initially closed
  const filteredNavItems = navMore.filter(item => item.Name === "SHL" || item.Name === "ALLSVENSKAN");
  console.log(filteredNavItems)
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
            <div key={moreItem.Name}>
              <a href="#" data-bs-toggle="collapse" data-bs-target={`#${moreItem.Name.toLowerCase().replace(/\s+/g, '-')}`} className="nav-item collapsed" aria-expanded="false">
                <p className="nav-item-child">{moreItem.Name}</p>
                <i className="fa-regular fa-chevron-down chevron-up"></i>
                <i className="fa-regular fa-chevron-up chevron-down"></i>
              </a>
              <div id={moreItem.Name.toLowerCase().replace(/\s+/g, '-')} className="collapse">
                <ul className="nav-item-sub-child">

                  {moreItem.Items.map((team) => {
                    const [navType, navTopic, navAddress] = team.SearchItems.news
                      ? ['news', team.Name.toLowerCase().replace(/\s/g, '_'), team.SearchItems.news]
                      : ['articles', team.Name.toLowerCase().replace(/\s/g, '_'), team.SearchItems.articles];

                    return (
                      <li key={team.Name}>
                        <Link
                          to={`../${navType}/${navTopic}`}
                          state={{
                            address: navAddress,
                            subTopics: team.Items,
                            Name: team.Name,
                            navType,
                            navTopic,
                            moreItemName: moreItem.Name
                          }}
                          name={team.Name}>
                          {team.Name}
                        </Link>

                        {/* <Link
                          to={{
                            pathname: `../${navType}/${navTopic}`,
                            state: {
                              address: navAddress,
                              subTopics: team.Items,
                              Name: team.Name,
                              navType,
                              navTopic,
                              moreItemName: moreItem.Name, // Pass moreItem.Name as part of the state
                            },
                          }}
                          name={team.Name}
                        >
                          {team.Name}
                        </Link> */}
                      </li>
                    );
                  })}

                </ul>


              </div>
            </div>
          )


        })}
      </div>
      {/* <SideNav isOpen={isOpen} closeNav={closeNav} /> Pass the state variable here */}
      <span style={{ fontSize: '30px', cursor: 'pointer', color: 'white' }} onClick={openNav}>&#9776;</span>
    </div>
  );
}

export default Navbar;
