import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataNotFound from '../../components/dataNotFound';
import { useMediaContext } from '../../utilities/mediaQuery';
import { divideByPercentage } from '../../utilities/common';
 import { videHighlight } from '../../utilities/config';

const PodcastList = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoEmbed, setVideoEmbed] = useState('');
  const [mathInfoEmbed, setMathInfoEmbed] = useState(null);
  const [showMathInfoModal, setShowMathInfoModal] = useState(false);
  const [PodcastListsData, setPodcastListData] = useState([]);
  const isDesktop = useMediaContext();
  const navigate = useNavigate();

  const [mainHighlightsQuantity, setMainHighlightsQuantity] = useState(0);
  const [asideHighlightsQuantity, setAsideHighlightsQuantity] = useState(0);

  const location = useLocation();
  const { state } = location;
  console.log(JSON.stringify(state));
  const { topicKey, topicName,topictype,Subtopicid } = state;
   const thumnbailbaseurl=videHighlight.thumbnailurl ;
  useEffect(() => {
    if (PodcastListsData?.length) {
      const [forty, sixty] = divideByPercentage(PodcastListsData.length);
      setMainHighlightsQuantity(forty);
      setAsideHighlightsQuantity(sixty);
      // console.log("Total: => ", PodcastListsData.length);
      // console.log(`40%: ${forty}, 60%: ${sixty}`);
    }
  }, [PodcastListsData]);

  useEffect(() => {
    const fetchPodcast = async () => {
        const url = videHighlight.videobaseurl+ "/api/VideoHighlight/GetVideoHighlightBySubtopicIdonly?subtopicId="+Subtopicid;
        try {
          const response = await fetch(url);
          if (response.status === 200) {
            const res = await response.json();
            console.log(res.data);
            setPodcastListData(res.data);
          } else {
            console.error(`HTTP Error: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
    };
    
    fetchPodcast();
  }, [state]);

  const handleMathInfoClick = (url) => {
    setMathInfoEmbed(url);
    setShowMathInfoModal(true);
  };

  const handleVideoClick = (embedCode) => {
    setVideoEmbed(embedCode);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideoEmbed('');
  };

  const LogoPath = state?.imagesource;

  if (PodcastListsData.length === 0) {
    return <div>Loading...</div>;
  } else if (!topicName || !topicKey) {
    return <DataNotFound />;
  }

  let mainHightLights = PodcastListsData || [];
  let asideHightLights = [];

  if (PodcastListsData?.length > 0 && isDesktop === 'desktop') {
    mainHightLights = PodcastListsData.slice(1, asideHighlightsQuantity);
    asideHightLights = PodcastListsData.slice(mainHighlightsQuantity);
  }

  return (
    <div className="main-body dark">
      <div className="row">
        <div className="col-lg-8">
          <div className={`layout ${isDesktop}`}>
            <div className="main-card-section">
              <div className="main-card">
                <div className="row">
                  <div className="col-11">
                    <div className="header">
                      <div>
                        {/* <img src={LogoPath} alt={LogoPath} /> */}
                        {/* why topicName not update here ?? */}
                        <span>{topicName?.replace('senaste nytt', '')}</span>{' '}
                        {/* Modify this line */}
                      </div>
                    </div>
                  </div>
                  <div className="col-1">
                    <div>
                      {/* <img src="assets/images/22.png" alt="" /> */}
                      {/* <span>SUBTOPIC : {state.Subtopicid} </span> */}
                    </div>
                    <button
                      type="button"
                      class="btn text-light close-btn rounded-circle "
                      style={{ float: 'right', backgroundColor: '#333333' }}
                      onClick={() => navigate(-1)}>
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
                <div
                  className="video-banner"
                  style={{ backgroundImage: `url(${thumnbailbaseurl+PodcastListsData[0]?.thumbnail})` }}
                  // style={{ backgroundImage: `url(https://www.scorebat.com/og/m/og1359305.jpeg)` }}
                  onClick={() => handleVideoClick(PodcastListsData[0].embededCode)}>
                  <i className="fa-solid fa-circle-play"></i>
                </div>
                <div className="content">
                  <h5>{PodcastListsData[0]?.text}</h5>
                  
                  <small>{new Date(PodcastListsData[0]?.datetime).toLocaleString()}</small>
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
                {mainHightLights?.map((highlight, index) => (
                  <div key={index} className="secondary-card">
                    <div
                      className="video-banner"
                  style={{ backgroundImage: `url(${thumnbailbaseurl+ highlight.thumbnail})` }}
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
                             style={{ backgroundImage: `url(${thumnbailbaseurl+highlight.thumbnail})` }}
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
};

export default PodcastList;
