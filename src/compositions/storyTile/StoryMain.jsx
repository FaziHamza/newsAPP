import { timeQuery } from '../../utilities/timeQuery';
import { json, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { video_play } from '../../assets';
import { sportspotsverige,AFP_news } from '../../assets';


const DisplayComponent = ({ topic }) => {
  const location = useLocation();
  const { state } = location;

  // Now you can access the passed state values
  const moreItemName = state?.moreItemName;
  const teamName = state?.Name;
  const defaulttopic = topic?.Name;
  const logoPath = state?.LogoPath;
  const teamLogoPath = state?.LogoTeam
  const IsSql = state?.IsSql;

  return (
    <>
      {moreItemName && teamName && logoPath ? (
        <>
          <div className="topic" >
            <div>
              <img src={logoPath} height={'20px'} />
              {moreItemName}
            </div>
            <div className="title">
              <img src={teamLogoPath} height={'20px'} />
              {teamName}
            </div>
            <Link to="/highlights">
              <div className="highlights">
                Video
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
      return `${hours} Tim`; // Swedish for hours
    } else {
      return `${day} Dag`; // Swedish for days
    }
  };

  // console.log(days);
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
            {description}
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
