import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataNotFound from '../../components/dataNotFound';
import { useMediaContext } from '../../utilities/mediaQuery';
import { divideByPercentage } from '../../utilities/common';
import { IsMobile, RootUrl, videHighlight } from '../../utilities/config';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Video_black, podcast_black,Video_white ,podcast_white} from '../../assets';

const VideoHighlightsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoEmbed, setVideoEmbed] = useState('');
  const [mathInfoEmbed, setMathInfoEmbed] = useState(null);
  const [showMathInfoModal, setShowMathInfoModal] = useState(false);
  const [highlightsData, setVideoHighlightsData] = useState([]);
  const isDesktop = useMediaContext();
  const navigate = useNavigate();
  const favouriteMenu = useSelector((state) => state?.favouriteMenu);
  const [mainHighlightsQuantity, setMainHighlightsQuantity] = useState(0);
  const [asideHighlightsQuantity, setAsideHighlightsQuantity] = useState(0);
  const [status, setStatus] = useState('idle');
  const location = useLocation();
  const { state } = location;
  console.log(JSON.stringify(state));
  const thumnbailbaseurl = videHighlight.thumbnailurl;
  const [isShowPodcastIcon, setisshowPodcaseIcon] = useState(null);
  const [isShowVideoIcon, setisShowVideoIcon] = useState(null);
  const logoPath = state?.LogoPath || null;
  const teamLogoPath = state?.LogoTeam ;
  const SubTopicId = state?.SubTopicId;
  const teamName = state?.topicName ;
  const topicKey = state?.topicKey ;
  const topictype = state?.topictype ;
  const IsSubtopicVideo = state?.IsSubtopicVideo;

  const linkPropsforpodcast = {
    to: '/podcast',
    state: {
      topicKey,
      topictype,
      topicName: teamName,
      LogoTeam: teamLogoPath,
      SubTopicId: SubTopicId,
      IsSubtopicVideo:IsSubtopicVideo
    },
  };
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
  useEffect(() => {
    if (highlightsData?.length>0) {
      const [forty, sixty] = divideByPercentage(highlightsData.length);
      setMainHighlightsQuantity(forty);
      setAsideHighlightsQuantity(sixty);
    }
  }, [highlightsData]);

  useEffect(() => {
    setStatus('pending');
    const fetchVideoHighlights = async () => {
      const url = videHighlight.videobaseurl + "/api/VideoHighlight/GetVideoHighlightBySubtopicIdonly?subtopicId=" + SubTopicId;
      try {
        const response = await fetch(url);
        if (response.status === 200) {
          const res = await response.json();

          if (res.data && res.data.length > 0) {
            // Check if the 'datetime' property exists before sorting
            const sortedData = res.data.sort((a, b) => {
              const dateA = a.datetime ? new Date(a.datetime) : 0;
              const dateB = b.datetime ? new Date(b.datetime) : 0;
              return dateB - dateA;
            });
        
            setVideoHighlightsData(sortedData);
            setStatus('resolved');
          } else {
            setVideoHighlightsData([]); // Set an empty array or handle it as needed
            setStatus('noDataFound');
          }
        } else {
          console.error(`HTTP Error: ${response.status}`);
          setStatus('error');
        }
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    fetchVideoHighlights();
  }, [state]);

  const handleMathInfoClick = (url) => {
    setMathInfoEmbed(url);
    setShowMathInfoModal(true);
  };

  const handleVideoClick = (embedCode) => {
    // Parse the embed code as HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(embedCode, 'text/html');
    const iframe = doc.querySelector('iframe');
    // Modify width and height attributes
    if (iframe) {
      iframe.width = '100%';
      iframe.height = '100%';
    }
    // Get the modified HTML string
    const modifiedEmbedCode = doc.documentElement.innerHTML;
    // Set the modified embed code in the state
    setVideoEmbed(modifiedEmbedCode);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideoEmbed('');
  };

  const LogoPath = state?.LogoTeam;
  let mainHightLights = highlightsData || [];
  let asideHightLights = [];

  if (highlightsData?.length > 0 && isDesktop === 'desktop') {
    mainHightLights = highlightsData.slice(1, 4);
    asideHightLights = highlightsData.length > 4 ? highlightsData.slice(4, 12) : [];
  }
  switch (status) {
    case 'idle':
      return <div>idle</div>;
    case 'pending':
      return (
        <main>
          <div className="pending">loading</div>
        </main>
      );
    case 'resolved':
      return (
        <div className={`dark ${favouriteMenu?.length > 0 ? 'main-bodyFavmenu ' : 'main-body'}`}>
          <div className="row">
            <div className="col-lg-8">
              <div className={`layout ${isDesktop}`}>
                <div className="main-card-section">

                  <div className="main-card">
                    {/* <div className="row">
                      <div className="col-3">
                        <div className="header">
                          <div>
                            <img src={LogoPath} alt={LogoPath} />
                            <span>{topicName?.replace('senaste nytt', '')}</span>{' '}
                          </div>
                        </div>
                      </div>
                      <div className="col-6" style={{ textAlign: "center" }}>
                        <h2>VIDEO</h2>
                      </div>
                      <div className="col-3">
                        <div>
                        </div>
                        <button
                          type="button"
                          class="btn text-light close-btn rounded-circle "
                          style={{ float: 'right', backgroundColor: '#333333' }}
                          onClick={() => navigate(-1)}>
                          <i class="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    </div> */}
                                    <div className='row'>
                                      <div className='col-3'>
                                      {IsMobile  && (
                          <div className='tagcontainerforvideoandpodcast' >

              <span
                className='tag'>
                {/* {SubTopicHeadline} */} Videos
              </span>
              </div>
            )}
                                      </div>
                  <div className='col-9'>
                  {isShowPodcastIcon && 
                    <div className='d-flex justify-content-end'>
                    <div className='podcast-video-icon podcast-video-highlight'>
                    {isShowPodcastIcon && (
                <Link {...linkPropsforpodcast} className="underline-hide">
                  <div className="highlights podcast-video">
                    <img src={podcast_white} height={'20px'} />
                    <span>Podcasts</span>
                  </div>
                </Link>
              )}
                    </div>
                    </div>
                      }
                  </div>
                </div>
                    <div
                      className="video-banner"
                      style={{ backgroundImage: `url(${thumnbailbaseurl + highlightsData[0]?.thumbnail})` }}
                      // style={{ backgroundImage: `url(https://www.scorebat.com/og/m/og1359305.jpeg)` }}
                      onClick={() => handleVideoClick(highlightsData[0].embededCode)}>
                      <i className="fa-solid fa-circle-play"></i>
                    </div>
                    <div className="content">
                      <h5>{highlightsData[0]?.text}</h5>
    
                      <small>{new Date(highlightsData[0]?.datetime).toLocaleString()}</small>
                    </div>
                    {showMathInfoModal && (
                      <div className="modal">
                        <div className="modal-content modal-content-more">
                          <button
                            onClick={() => {
                              setShowMathInfoModal(false);
                            }}
                            className="close-button">
                            X
                          </button>
                          <iframe
                            src={mathInfoEmbed}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen></iframe>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {mainHightLights?.length > 0 && (
                  <div className="secondary-card-section">
                    {mainHightLights?.filter((_, index) => index !== 0).map((highlight, index) => (
                      <div key={index} className="secondary-card">
                        <div
                          className="video-banner"
                          style={{ backgroundImage: `url(${thumnbailbaseurl + highlight.thumbnail})` }}
                          //  style={{ backgroundImage: `url(https://www.scorebat.com/og/m/og1359305.jpeg)` }}
                          onClick={() => handleVideoClick(highlight.embededCode)}>
                          <i className="fa-solid fa-circle-play"></i>
                        </div>
                        <div className="content">
                          <h5>{highlight.text}</h5>
                          <small>{new Date(highlight.datetime).toLocaleString()}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
    
            {asideHightLights?.length > 0 && (
              <div className="col-lg-4">
                <div className={`layout ${isDesktop}`}>
                  <aside className="aside-right">
                    <div className="secondary-card-section">
                      {asideHightLights?.map((highlight, index) => (
                        <div key={index} className="secondary-card">
                          <div
                            className="video-banner"
                            style={{ backgroundImage: `url(${thumnbailbaseurl + highlight.thumbnail})` }}
                            // style={{ backgroundImage: `url(https://www.scorebat.com/og/m/og1359305.jpeg)` }}
                            onClick={() => handleVideoClick(highlight.embededCode)}>
                            <i className="fa-solid fa-circle-play"></i>
                          </div>
                          <div className="content">
                            <h5>{highlight.text}</h5>
    
                            <small>{new Date(highlight.datetime).toLocaleString()}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            )}
          </div>
    
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <button onClick={handleCloseModal} className="close-button">
                  X
                </button>
    
                <div className="video-wrapper" dangerouslySetInnerHTML={{ __html: videoEmbed }} />
              </div>
            </div>
          )}
        </div>
      );
    case 'noDataFound':
      return <DataNotFound customMessage={"Video"} />;
    case 'error':
      return <div>Error occurred while fetching data</div>;
    default:
      return null;
  }


};

export default VideoHighlightsList;
