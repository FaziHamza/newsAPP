import { timeQuery } from '../../utilities/timeQuery';
import { json, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  logo,
  video_play,
  podcast,
  podcast_black,
  Video_black,
  podcast_white,
  Video_white,
} from '../../assets';
import { sportspotsverige, AFP_news, SPORSpot_News } from '../../assets';
import { useSelector } from 'react-redux';
import { IsMobile, RootUrl } from '../../utilities/config';
import { useEffect, useState } from 'react';
const DisplayComponent = ({ topic }) => {
  const location = useLocation();
  const initialload = useSelector((state) => state.origin.initialload);
  const { state } = location;
  console.log(state);
  console.log(initialload);
  // Now you can access the passed state values
  const TopicId = state?.TopicId;
  const moreItemName = state?.moreItemName || null;
  const SubTopicHeadline = state?.SubttopicHeadline;
  const defaulttopic = topic?.Name || null;

  var IsSubtopicVideo;
  if (state == undefined || state == null) {
    IsSubtopicVideo = initialload[0].isSubtopicVideo;
  } else {
    IsSubtopicVideo = state?.IsSubtopicVideo;
  }
  const [isShowPodcastIcon, setisshowPodcaseIcon] = useState(null);
  const [isShowVideoIcon, setisShowVideoIcon] = useState(null);
  const logoPath = state?.LogoPath || null;
  const teamLogoPath = state?.LogoTeam || initialload[0].logo;
  const SubTopicId = state?.SubTopicId || initialload[0].subTopicID;
  const teamName = state?.topicName || initialload[0].name;
  const topicKey = state?.topicKey || initialload[0].highlights;
  const topictype = state?.topictype || initialload[0].highlightType;
  const linkPropsforhighlight = {
    to: IsSubtopicVideo ? '/videohighlights' : '/highlights',
    state: {
      topicKey,
      topictype,
      topicName: teamName,
      LogoTeam: teamLogoPath,
      SubTopicId: SubTopicId,
      IsSubtopicVideo: IsSubtopicVideo,
    },
  };
  const linkPropsforpodcast = {
    to: '/podcast',
    state: {
      topicKey,
      topictype,
      topicName: teamName,
      LogoTeam: teamLogoPath,
      SubTopicId: SubTopicId,
      IsSubtopicVideo: IsSubtopicVideo,
    },
  };
  const IsSql = state?.IsSql;
  useEffect(() => {
    const apiUrl = `${RootUrl.Baseurl}api/Subtopic/GetVideoStatusBySubtopicId?id=${SubTopicId}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setisshowPodcaseIcon(response.data.videoPodcast);
        setisShowVideoIcon(response.data.videoHighlight);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }, []);
  return (
    <>
      {teamLogoPath ? (
        <>
          <div className="topic">
            <div className="topic-row">
              {/* <div className="title">
                <img src={logoPath} height={'20px'} />
                {moreItemName}
              </div> */}
              {!IsMobile && (
                <div className="title">
                  <>
                    {teamName.includes(moreItemName) ? null : (
                      <>
                        <img src={teamLogoPath} height={'20px'} />
                      </>
                    )}
                    {teamName.replace(moreItemName, '')}
                  </>
                </div>
              )}
            </div>
            {IsMobile && SubTopicHeadline && (
              <div className="tagcontainer">
                <span className="tag">{SubTopicHeadline}</span>
              </div>
            )}
            <div style={{ display: 'flex' }}>
              {isShowPodcastIcon && (
                <Link {...linkPropsforpodcast} className="underline-hide">
                  <div className="highlights podcast-video podcast-article">
                    <img src={podcast_white} height={'20px'} />
                    <span>Podcasts</span>
                  </div>
                </Link>
              )}
              {isShowVideoIcon && IsSubtopicVideo && (
                <Link {...linkPropsforhighlight} className="underline-hide">
                  <div className="highlights podcast-video video-article">
                    <img src={Video_white} height={'20px'} />
                    <span>Videos</span>
                  </div>
                </Link>
              )}
              {!IsSubtopicVideo && (
                <Link {...linkPropsforhighlight} className="underline-hide">
                  <div className="highlights podcast-video video-article">
                    <img src={Video_white} height={'20px'} />
                    <span>Videos</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </>
      ) : (
        <h4 className="title">{teamName}</h4>
      )}
    </>
  );
};
const StoryMain = ({
  idforlogo,
  heading,
  description,
  className = '',
  src,
  alt,
  time,
  isDesktopScreen,
  externaliconsource,ispublish
}) => {
  const location = useLocation();
  const { state } = location;
  const SubTopicHeadline = state?.SubttopicHeadline;
  let imageUrl;
  if (idforlogo.length === 7) {
    imageUrl = AFP_news;
  } else {
    imageUrl = SPORSpot_News;
  }
  const days = () => {
    // const timeDifference = timeQuery(time); // Assuming timeQuery returns the difference in hours
    // const day = Math.floor(timeDifference / 24);
    // const hours = timeDifference % 24;

    // if (timeDifference < 24) {
    //   return `${hours.toFixed(2)} Tim `; // Swedish for hours
    // } else {
    //   return `${day} Dag  `; // Swedish for days
    // }
    const timeDifference = timeQuery(time); // Assuming timeQuery returns the difference in hours
    const days = Math.floor(timeDifference / 24);
    const hours = Math.floor(timeDifference % 24);
    const minutes = Math.floor((timeDifference % 1) * 60);

    if (timeDifference < 1) {
      return `${minutes} Min`; // Swedish for minutes
    } else if (timeDifference < 24) {
      return `${hours} Tim`; // Swedish for hours
    } else {
      return `${days} Dag`; // Swedish for days
    }
  };
  // const days = () => {
  //   const timeDifference = timeQuery(time); // Assuming timeQuery returns the difference in hours
  //   const days = Math.floor(timeDifference / 24);
  //   const hours = Math.floor(timeDifference % 24);
  //   const remainingMinutes = Math.round((timeDifference - Math.floor(timeDifference)) * 60);

  //   if (timeDifference < 1) {
  //     return `${remainingMinutes} minutes`; // Return minutes if less than 1 hour
  //   } else if (timeDifference < 24) {
  //     return `${hours} hours`; // Return hours and minutes if less than 1 day
  //   } else {
  //     return `${days} Day`; // Return days, hours, and minutes
  //   }

  // };

  const sanitizedSrc = src.replace(/([^:]\/)\/+/g, '$1');

  return (
    <>
      {!!isDesktopScreen ? (
        <>
          <DisplayComponent />
          <div className={`suggested-card suggested-card-top ${className}`}>
            <div className="banner">
              <img src={sanitizedSrc} alt={alt} />
            </div>
            <div></div>
            <div className="content">
            <h1 className="heading-bold">{heading}123</h1>
              <p className="abstart-color" dangerouslySetInnerHTML={{ __html: description }} />
              <h6 className="content-time-img">
                <img src={imageUrl} alt="" />
                {days()}
              </h6>
            </div>
          </div>
        </>
      ) : (
        <div className="league-card" style={{ padding: '0px 10px' }}>
          {/* {!IsMobile && <DisplayComponent />} */}
          {IsMobile && <DisplayComponent />}

          <div className="banner">
            <img src={sanitizedSrc} alt={alt} />
          </div>
          {/* <div className='tagcontainer' >
            {IsMobile && SubTopicHeadline && (
              <span
                className='tag'>
                {SubTopicHeadline}
              </span>
            )}
          </div> */}
          <div className="content">
            {/* <div className='tagcontainer' >
              <p className="tag">Nyheter</p>
            </div> */}

            <p>
              <h1 className="heading-bold">{heading}</h1>
              <p className="abstart-color" dangerouslySetInnerHTML={{ __html: description }} />
            </p>
            <div className="date d-flex justify-content-between" >
              <p className="abstart-color">
                {ispublish ? <span className='main-live'><i> LIVE</i></span> : days()}
              </p>
              <p>
              {externaliconsource !== null ? (
                  <img src={externaliconsource} alt="" />
                ) : (
                  <img src={imageUrl} alt="" style={{height:'28px'}}/>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoryMain;

function MyComponent({ description }) {
  return <div dangerouslySetInnerHTML={{ __html: description }} />;
}
