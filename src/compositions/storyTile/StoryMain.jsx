import { timeQuery } from '../../utilities/timeQuery';
import { json, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logo, video_play, podcast } from '../../assets';
import { sportspotsverige, AFP_news, SPORSpot_News } from '../../assets';
import { useSelector } from 'react-redux';

const DisplayComponent = ({ topic }) => {
  const location = useLocation();
  const initialload = useSelector((state) => state.origin.initialload);
  const { state } = location;
  console.log(state)
  // Now you can access the passed state values
  const moreItemName = state?.moreItemName || null;
  const teamName = state?.Name || initialload[0].name;
  const defaulttopic = topic?.Name || null;
  const topicKey = state?.topicKey || initialload[0].highlights;
  const topictype = state?.topictype || initialload[0].highlightType;
  var IsSubtopicVideo ;
  if (state == undefined || state==null) {
    IsSubtopicVideo = initialload[0].isSubtopicVideo;
  }
  else {
    IsSubtopicVideo = state?.IsSubtopicVideo;
  }

  const logoPath = state?.LogoPath || null;
  const teamLogoPath = state?.LogoTeam || initialload[0].logo;
  const SubTopicId = state?.SubTopicId || initialload[0].subTopicID;
  const TopicId = state?.TopicId;

  const linkPropsforhighlight = {
    to: IsSubtopicVideo ? "/videohighlights" : "/highlights",
    state: {
      topicKey,
      topictype,
      topicName: teamName,
      imagesource: teamLogoPath,
      Subtopicid: SubTopicId
    },
  };
  const linkPropsforpodcast = {
    to: "/podcast",
    state: {
      topicKey,
      topictype,
      topicName: teamName,
      imagesource: teamLogoPath,
      Subtopicid: SubTopicId
    },
  };
  const IsSql = state?.IsSql;

  return (
    <>
      {teamLogoPath ? (
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

            <div style={{ display: 'flex' }}>
              <Link {...linkPropsforpodcast} className='underline-hide'>
                <div className="highlights podcast-video">
                  <img src={podcast} height={'20px'} />
                  <span>Podcasts</span>
                </div>
              </Link>
              <Link {...linkPropsforhighlight} className='underline-hide'>
                <div className="highlights podcast-video">
                  <img src={video_play} height={'20px'} />
                  <span>Videos</span>
                </div>                
              </Link>
            </div>

          </div>
        </>
      ) : (
        <h4 className="title">
          {teamName}
        </h4>

      )}
    </>
  );
}
const StoryMain = ({ idforlogo, description, className = '', src, alt, time, isDesktopScreen }) => {
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

