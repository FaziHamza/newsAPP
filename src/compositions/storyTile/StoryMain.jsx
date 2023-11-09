import { timeQuery } from '../../utilities/timeQuery';
import { json, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logo, video_play } from '../../assets';
import { sportspotsverige, AFP_news ,SPORSpot_News} from '../../assets';


const DisplayComponent = ({ topic }) => {
  const location = useLocation();
  const { state } = location;
  
  // Now you can access the passed state values

  const moreItemName = state?.moreItemName || "England";
  const teamName = state?.Name || "Premier League";
  const defaulttopic = topic?.Name || "Premier League";
  const topicKey = state?.topicKey || "england-premier-league";
  const topictype = state?.topictype || 'competition';
  const IsSubtopicVideo = state?.IsSubtopicVideo || false;

  const logoPath = state?.LogoPath || "https://siteofsports.com/v2/Content/TopicLogo/GB.png";
  const teamLogoPath = state?.LogoTeam || "https://siteofsports.com/v2/content/topicLogo/premier_league.jpg";
  const SubTopicId = state?.SubTopicId;
  const TopicId = state?.TopicId;
  // const TopicId = state?.TopicId;
  const linkProps = {
    to: IsSubtopicVideo ? "/highlights" : "/videohighlights",
    state: {
      topicKey,
      topictype,
      topicName: teamName,
      imagesource: teamLogoPath,
    },
  };
  const IsSql = state?.IsSql;

  return (
    <>
      {logoPath ? (
        <>
          <div className="topic" >
            <div className='topic-row'>
              {/* <div className="title">
                <img src={logoPath} height={'20px'} />
                {moreItemName}
              </div> */}
              <div className="title">
                {teamName.includes(moreItemName) ? null : (
                  <>
                    <img src={teamLogoPath} height={'20px'} />
                  </>
                )}
                {teamName.replace(moreItemName, '')}
              </div>

            </div>

            <Link {...linkProps}>
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
const StoryMain = ({idforlogo, description, className = '', src, alt, time, isDesktopScreen }) => {
  const location = useLocation();
  const { state } = location;
  let imageUrl;
  if (idforlogo.length === 7) {
    imageUrl = AFP_news;
  } else {
    imageUrl = SPORSpot_News;
  }
  const days = () => {
    const timeDifference = timeQuery(time); // Assuming timeQuery returns the difference in hours
    const day = Math.floor(timeDifference / 24);
    const hours = timeDifference % 24;

    if (timeDifference < 24) {
      return `${hours.toFixed(2)} Tim `;// Swedish for hours
    } else {
      return `${day} Dag  `; // Swedish for days
    }
  };

  const sanitizedSrc = src.replace(/([^:]\/)\/+/g, "$1");

  return (
    <>

      {!!isDesktopScreen ?
        <>
          < DisplayComponent />
          <div className={`suggested-card ${className}`}>
            <div className='banner'>
              <img src={sanitizedSrc} alt={alt} />
            </div>
            <div className='content'>
              <p className='desktopTop' dangerouslySetInnerHTML={{ __html: description }} />
              <h6 className='content-time-img'  >{days()}
                <img src={imageUrl} alt="" />
              </h6>
            </div>
          </div>
        </>
        :
        <div className='league-card'>
          < DisplayComponent />
          <div className='banner'>
            <img src={sanitizedSrc} alt={alt} />
          </div>
          <div className='content'>
            <p>
              <p className='mobile' dangerouslySetInnerHTML={{ __html: description }} />
            </p>
            <div className='date'>
              <p>{days()}
                <img src={imageUrl} alt="" /></p>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default StoryMain;

function MyComponent({ description }) {
  return <div dangerouslySetInnerHTML={{ __html: description }} />;
}

