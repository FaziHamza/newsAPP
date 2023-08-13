import React, { useState } from 'react';
import { Dropdown } from '../../compositions';
// import { SideNav } from '../../components';
import { NavLink,Link} from 'react-router-dom';
import { SideNav } from '../../compositions';

function Navbar({ className = '', navList, inMain = 4, ...props }) {
  const navMain = navList.slice(0, inMain);
  console.log(navList)
  const navMore = navList.slice(inMain, navList.length);
    const [isOpen, setIsOpen] = useState(false); // Initially closed

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    
    <div>
      {/* className={`sidenav ${isOpen ? 'open' : ''}`} */}
       {/* <div id="Sidenav" >
       <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
       <Dropdown
        title="Mer"
        listItems={
          <>
            {navMore.map((moreItem) => {
              const [navType, navTopic, navAddress] = moreItem.SearchItems.news
                ? [
                    'news',
                    moreItem.Name.toLowerCase().replace(/\s/g, '_'),
                    moreItem.SearchItems.news,
                  ]
                : [
                    'articles',
                    moreItem.Name.toLowerCase().replace(/\s/g, '_'),
                    moreItem.SearchItems.articles,
                  ];
              return (
                <li key={moreItem.Name}>
                  <NavLink
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    to={`${navType}/${navTopic}`}
                    state={{ address: navAddress, subTopics: moreItem.Items, Name: moreItem.Name }}
                    name={moreItem.Name}>
                    {moreItem.Name}
                  </NavLink>
                </li>
              );
            })}
          </>
        }
      />
      </div> */}
      <div id="Sidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
      <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>


      {/* {navMore.map((moreItem) => {
              const [navType, navTopic, navAddress] = moreItem.SearchItems.news
                ? [
                    'news',
                    moreItem.Name.toLowerCase().replace(/\s/g, '_'),
                    moreItem.SearchItems.news,
                  ]
                : [
                    'articles',
                    moreItem.Name.toLowerCase().replace(/\s/g, '_'),
                    moreItem.SearchItems.articles,
                  ];
              return (
                <li key={moreItem.Name}>
                  <NavLink
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    to={`${navType}/${navTopic}`}
                    state={{ address: navAddress, subTopics: moreItem.Items, Name: moreItem.Name }}
                    name={moreItem.Name}>
                    {moreItem.Name}
                  </NavLink>
                </li>
              );
            })} */}
      {navMore.map((moreItem) => {
         const [navType, navTopic, navAddress] = moreItem.SearchItems.news
         ? [
             'news',
             moreItem.Name.toLowerCase().replace(/\s/g, '_'),
             moreItem.SearchItems.news,
           ]
         : [
             'articles',
             moreItem.Name.toLowerCase().replace(/\s/g, '_'),
             moreItem.SearchItems.articles,
           ];
        return (
          <div key={moreItem.Name}>
          <a href="#" data-bs-toggle="collapse" data-bs-target={`#${moreItem.Name.toLowerCase().replace(/\s+/g, '-')}`} className="nav-item collapsed" aria-expanded="false">
            <p className="nav-item-child">{moreItem.Name}</p>
            <i className="fa-regular fa-chevron-down chevron-up"></i>
            <i className="fa-regular fa-chevron-up chevron-down"></i>
          </a>
          <div id={moreItem.Name.toLowerCase().replace(/\s+/g, '-')} className="collapse">
            <ul className="nav-item-sub-child">
          
                {moreItem.Items.map((item, i) => (
            <li key={item.Name}>
              <NavLink to={`${navType}/${navTopic}`}
                state={{ address: navAddress, subTopics: moreItem.Items, Name: moreItem.Name }}>
                {item.Name}
              </NavLink>
            </li>
          ))}
{/* {moreItem.Items.map((item, i) => {
                console.log(item.Name);
                <li key={item.Name}><NavLink  to={`${navType}/${navTopic}`}> {item.Name}</NavLink></li>
      })} */}
            </ul>


          </div>
        </div>
        )
        
           
})}
    </div> 
      {/* <SideNav isOpen={isOpen} closeNav={closeNav} /> Pass the state variable here */}
      <span style={{ fontSize: '30px', cursor: 'pointer' ,color:'white' }} onClick={openNav}>&#9776;</span>
    </div>
  );
}

export default Navbar;
