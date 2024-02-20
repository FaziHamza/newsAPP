import React from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';

const pages = [
  {
    name: 'SHL',
    items: [
      'timrå',
      'Senaste nytt',
      'Frölunda HC',
      'Färjestad BK',
      'HV71',
      'Leksands IF',
      'Linköping HC',
      'Luleå HF',
      'Malmö Redhawks',
      'MoDo Hockey',
      'IK Oskarshamn',
      'Rögle BK',
      'Skellefteå AIK',
      'Timrå IK',
      'Växjö Lakers',
      'Örebro HK'
    ]
  },
  { name: 'ALLSVENSKAN', items: ['Page1', 'Page2', 'Page3', 'Page4'] },
  // ... add more pages as needed
];

function SideNav({ isOpen, closeNav }) {
  // const { state } = useLocation();
  // // console.logstate);
  // useEffect(() => {
  //   const address = state?.address ?? defaultTopic.SearchItems.news;
  //   // const tablePromise = () => fetchNewsTable(windowHref + settingsInfo.Api + address);
  //   // run(tablePromise());
  // }, [state]);
  
  return (
    <div id="Sidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
      <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
      {pages.map((page, index) => (
        <div key={index}>
          <a href="#" data-bs-toggle="collapse" data-bs-target={`#${page.name.toLowerCase().replace(/\s+/g, '-')}`} className="nav-item collapsed" aria-expanded="false">
            <p className="nav-item-child">{page.name}</p>
            <i className="fa-regular fa-chevron-down chevron-up"></i>
            <i className="fa-regular fa-chevron-up chevron-down"></i>
          </a>
          <div id={page.name.toLowerCase().replace(/\s+/g, '-')} className="collapse">
            <ul className="nav-item-sub-child">
              {page.items.map((item, i) => (
                <li key={i}><Link to={`/news/${item.replace(/\s+/g, '-').toLowerCase()}`}>{item}</Link></li>
              ))}
            </ul>


          </div>
        </div>
      ))}
    </div>
  );
}

export default SideNav;
