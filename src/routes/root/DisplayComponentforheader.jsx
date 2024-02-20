import { timeQuery } from '../../utilities/timeQuery';
import { json, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logo, video_play_forheader, podcast_forheader } from '../../assets';
import { sportspotsverige, AFP_news, SPORSpot_News } from '../../assets';
import { useSelector } from 'react-redux';
import { IsMobile,RootUrl } from '../../utilities/config';
import { useEffect, useState } from 'react';

const DisplayComponentforheader = ({ topic }) => {
    const location = useLocation();
    const initialload = useSelector((state) => state.origin.initialload);
    const { state } = location;
    // console.logstate)
    // console.loginitialload)
    // Now you can access the passed state values
    const moreItemName = state?.moreItemName || null;
    const teamName = state?.topicName || initialload[0].name;
    const SubTopicHeadline = state?.SubttopicHeadline;
    const defaulttopic = topic?.Name || null;
    const topicKey = state?.topicKey || initialload[0].highlights;
    const topictype = state?.topictype || initialload[0].highlightType;
    var IsSubtopicVideo;
    if (state == undefined || state == null) {
      IsSubtopicVideo = initialload[0].isSubtopicVideo;
    } else {
      IsSubtopicVideo = state?.IsSubtopicVideo;
    }
    const [isShowPodcastIcon,setisshowPodcaseIcon]=useState(null);
    const [isShowVideoIcon,setisShowVideoIcon]=useState(null);
    const logoPath = state?.LogoPath || null;
    const teamLogoPath = state?.LogoTeam || initialload[0].logo;
    const SubTopicId = state?.SubTopicId || initialload[0].subTopicID;
    const TopicId = state?.TopicId;
    // console.logSubTopicId)
    // console.logstate?.SubTopicId)
    const linkPropsforhighlight = {
      to: IsSubtopicVideo ? '/videohighlights' : '/highlights',
      state: {
        topicKey,
        topictype,
        topicName: teamName,
        SubTopicId: SubTopicId,
        LogoTeam:teamLogoPath,
        IsSubtopicVideo:IsSubtopicVideo
      },
    };
    const linkPropsforpodcast = {
      to: '/podcast',
      state: {
        topicKey,
        topictype,
        topicName: teamName,
        SubTopicId: SubTopicId,
        LogoTeam:teamLogoPath,
        IsSubtopicVideo:IsSubtopicVideo
      },
    };
    const IsSql = state?.IsSql;
    useEffect(() => {
    const apiUrl = `${RootUrl.Baseurl}api/Subtopic/GetVideoStatusBySubtopicId?id=${SubTopicId}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            setisshowPodcaseIcon(response.data.videoPodcast)
            setisShowVideoIcon(response.data.videoHighlight)
        })
        .catch((err) => {
          // console.log'Error', err);
        });
    }, [state]);
    return (
      <>
        {teamLogoPath ? (
          <>
            <div className="topic" style={{margin:0,padding: 3}}>
              <div className="topic-row">
                {/* <div className="title">
                  <img src={logoPath} height={'20px'} />
                  {moreItemName}
                </div> */}
                <div className="title" style={{background:'#2d333c', padding:'10px 10px 0px 10px'}}>
                    <>
                      {teamName.includes(moreItemName) ? null : (
                        <>
                          <img src={teamLogoPath} height={'20px'} />
                        </>
                      )}
                      {teamName.replace(moreItemName, '')}
                    </>
                </div>
              </div>
  
              <div style={{ display: 'flex' }}>
                {isShowPodcastIcon &&
                <Link {...linkPropsforpodcast} className="underline-hide header-icon">
                  <div className="highlights podcast-video">
                    <img src={podcast_forheader} height={'20px'} />
                    {/* <span>Podcasts</span> */}
                  </div>
                </Link>
                }
                {isShowVideoIcon && IsSubtopicVideo &&
                <Link {...linkPropsforhighlight} className="underline-hide header-icon">
                  <div className="highlights podcast-video">
                    <img src={video_play_forheader} height={'20px'} />
                    {/* <span>Videos</span> */}
                  </div>
                </Link>
                }
                 {!IsSubtopicVideo &&
                <Link {...linkPropsforhighlight} className="underline-hide">
                  <div className="highlights podcast-video">
                    <img src={video_play_forheader} height={'20px'} />
                    {/* <span>Videos</span> */}
                  </div>
                </Link>
                }
              </div>
            </div>
          </>
        ) : (
          <h4 className="title">{teamName}</h4>
        )}
      </>
    );
  };

  export default DisplayComponentforheader;