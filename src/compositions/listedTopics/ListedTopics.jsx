import { Link } from 'react-router-dom';

const ListedTopics = ({ list }) => {
  return (
    <>
      {list.map((team) => {
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
              }}
              name={team.Name}>
              {team.Name}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default ListedTopics;
