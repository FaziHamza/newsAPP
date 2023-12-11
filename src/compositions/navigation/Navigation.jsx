import { Dropdown } from '../';
import { NavLink } from 'react-router-dom';

const Navigation = ({ className = '', navList, inMain = 4, ...props }) => {
  const navMain = navList.slice(0, inMain);
  const navMore = navList.slice(inMain, navList.length);

  return (
    <nav className={`nav ${className}`.trim()} {...props}>
      <ul className="nav-favourites">
        {navMain.map((navItem) => {
          const [navType, navTopic, navAddress] = navItem.SearchItems.news
            ? ['news', navItem.Name.toLowerCase().replace(/\s/g, '_'), navItem.SearchItems.news]
            : [
                'articles',
                navItem.Name.toLowerCase().replace(/\s/g, '_'),
                navItem.SearchItems.articles,
              ];
          return (
            <li key={navItem.Name}>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to={`${navType}/${navTopic}`}
                state={{
                  address: navAddress,
                  subTopics: navItem.Items,
                  topicName: navItem.Name,
                  navType,
                  navTopic,
                }}
                name={navItem.Name}>
                {navItem.Name}
              </NavLink>
            </li>
          );
        })}
      </ul>
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
                    state={{ address: navAddress, subTopics: moreItem.Items, topicName: moreItem.Name }}
                    name={moreItem.Name}>
                    {moreItem.Name}
                  </NavLink>
                </li>
              );
            })}
          </>
        }
      />
    </nav>
  );
};

export default Navigation;
