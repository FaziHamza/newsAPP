import { timeQuery } from '../../utilities/timeQuery';
import { json, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logo, video_play } from '../../assets';
import { sportspotsverige, AFP_news } from '../../assets';


const DisplayComponent = ({ topic }) => {
  const location = useLocation();
  const { state } = location;

  // Now you can access the passed state values

  const moreItemName = state?.moreItemName;
  const teamName = state?.Name;
  const defaulttopic = topic?.Name;
  const topicKey = state?.topicKey;

  console.log("moreItemName" + moreItemName);
  console.log(teamName);

  const logoPath = state?.LogoPath;
  console.log("logoPath : "+ logoPath)
  const teamLogoPath = state?.LogoTeam;
  const SubTopicId = state?.SubTopicId;
  const TopicId = state?.TopicId;
  // const TopicId = state?.TopicId;

  const IsSql = state?.IsSql;

  return (
    <>
      {logoPath ? (
        <>
          <div className="topic" >
            <div className='topic-row'>
              <div className="title">
                <img src={logoPath} height={'20px'} />
                {moreItemName}
              </div>
              <div className="title">
                {teamName.includes(moreItemName) ? null : (
                  <>
                    <img src={teamLogoPath} height={'20px'}  />
                  </>
                )}
                   {teamName.replace(moreItemName, '')} 
              </div>

            </div>
            <Link to="/highlights" state={{ topicKey,  topicName: teamName, imagesource: teamLogoPath }}>
              <div className="highlights">

                <img src={video_play} height={'20px'} />
              </div>
            </Link>
          </div>
        </>
      ) : (
        <h4 className="title"> {defaulttopic}</h4>

      )}
    </>
  );
}
const StoryMain = ({ description, className = '', src, alt, time }) => {
  const location = useLocation();
  const { state } = location;
  const IsSql = state?.IsSql;
  const imageUrl = IsSql
    ? sportspotsverige
    : AFP_news;

  const days = () => {
    const timeDifference = timeQuery(time); // Assuming timeQuery returns the difference in hours
    const day = Math.floor(timeDifference / 24);
    const hours = timeDifference % 24;

    if (timeDifference < 24) {
      return `${hours.toFixed(2)} Tim `;// Swedish for hours
    } else {
      return `${day} Dag  ` ; // Swedish for days
    }
  };

  const sanitizedSrc = src.replace(/([^:]\/)\/+/g, "$1");

  return (
    <>
      <div className='league-card'>
        < DisplayComponent />
        <div className='banner'>
          <img src={sanitizedSrc} alt={alt} />
        </div>
        <div className='content'>
          <p>
          <p dangerouslySetInnerHTML={{ __html: description }} />
          </p>
          <div className='date'>
            <p>{days()}
              <img src={imageUrl} alt="" /></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryMain;

function MyComponent({ description }) {
  return <div dangerouslySetInnerHTML={{ __html: description }} />;
}

