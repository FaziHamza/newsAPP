import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataNotFound from '../../components/dataNotFound';
import { useMediaContext } from '../../utilities/mediaQuery';
import { divideByPercentage } from '../../utilities/common';

const VideoHighlightsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoEmbed, setVideoEmbed] = useState('');
  const [mathInfoEmbed, setMathInfoEmbed] = useState(null);
  const [showMathInfoModal, setShowMathInfoModal] = useState(false);
  const [highlightsData, setVideoHighlightsData] = useState([]);
  const isDesktop = useMediaContext();
  const navigate = useNavigate();

  const [mainHighlightsQuantity, setMainHighlightsQuantity] = useState(0);
  const [asideHighlightsQuantity, setAsideHighlightsQuantity] = useState(0);

  const location = useLocation();
  const { state } = location;
  console.log(JSON.stringify(state));
  const { topicKey, topicName,topictype } = state;

  useEffect(() => {
    if (highlightsData?.length) {
      const [forty, sixty] = divideByPercentage(highlightsData.length);
      setMainHighlightsQuantity(forty);
      setAsideHighlightsQuantity(sixty);
      // console.log("Total: => ", highlightsData.length);
      // console.log(`40%: ${forty}, 60%: ${sixty}`);
    }
  }, [highlightsData]);

  useEffect(() => {
    const fetchVideoHighlights = async () => {
      if (topicKey) {
        const url = "https://localhost:44394/api/VideoHighlight/GetVideoHighlight";
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImVkNzgzZDQ4LTg0NzYtNDIyMi01YmJlLTA4ZGJjYWYzNGE2OSIsIlVzZXJJZCI6ImVkNzgzZDQ4LTg0NzYtNDIyMi01YmJlLTA4ZGJjYWYzNGE2OSIsIkVtYWlsIjoiYWRtaW5Ad2ViLmNvbSIsIm5iZiI6MTY5OTM1NTQ3NiwiZXhwIjoxNjk5NTI4Mjc2LCJpYXQiOjE2OTkzNTU0NzYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzcwLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzcwLyJ9.jq72K6KxxywWIa-6O3GoMXm7ghAC6UvdDZBUXnmUZwI";
    
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 200) {
            const res = await response.json();
            console.log(res.data);
            setVideoHighlightsData(res.data);
          } else {
            console.error(`HTTP Error: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    
    fetchVideoHighlights();
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

  if (highlightsData.length === 0) {
    return <div>Loading...</div>;
  } else if (!topicName || !topicKey) {
    return <DataNotFound />;
  }

  let mainHightLights = highlightsData || [];
  let asideHightLights = [];

  if (highlightsData?.length > 0 && isDesktop === 'desktop') {
    mainHightLights = highlightsData.slice(1, asideHighlightsQuantity);
    asideHightLights = highlightsData.slice(mainHighlightsQuantity);
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
                      {/* <span>SUBTOPIC : {SubTopicId} </span> */}
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
                  //style={{ backgroundImage: `url(${highlightsData[0]?.thumbnail})` }}
                  style={{ backgroundImage: `url(https://www.scorebat.com/og/m/og1359305.jpeg)` }}
                  onClick={() => handleVideoClick(highlight[0]?.embededCode)}>
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
                {mainHightLights?.map((highlight, index) => (
                  <div key={index} className="secondary-card">
                    <div
                      className="video-banner"
                  // style={{ backgroundImage: `url(${highlight.thumbnail})` }}
                   style={{ backgroundImage: `url(https://www.scorebat.com/og/m/og1359305.jpeg)` }}
                      onClick={() => handleVideoClick(highlight[0]?.embededCode)}>
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
                             // style={{ backgroundImage: `url(${highlight.thumbnail})` }}
                        style={{ backgroundImage: `url(https://www.scorebat.com/og/m/og1359305.jpeg)` }}
                        onClick={() => handleVideoClick(highlight[0]?.embededCode)}>
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

export default VideoHighlightsList;
