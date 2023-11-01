import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataNotFound from '../../components/dataNotFound';
import { useMediaContext } from '../../utilities/mediaQuery';
import { divideByPercentage } from '../../utilities/common';

const HighlightsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoEmbed, setVideoEmbed] = useState('');
  const [mathInfoEmbed, setMathInfoEmbed] = useState(null);
  const [showMathInfoModal, setShowMathInfoModal] = useState(false);
  const [highlightsData, setHighlightsData] = useState([]);
  const isDesktop = useMediaContext();
  const navigate = useNavigate();

  const [mainHighlightsQuantity, setMainHighlightsQuantity] = useState(0);
  const [asideHighlightsQuantity, setAsideHighlightsQuantity] = useState(0);

  const location = useLocation();
  const { state } = location;
  console.log(JSON.stringify(state));
  const { topicKey, topicName } = state;

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
    const fetchHighlights = async () => {
      if (topicKey) {
        const detailOf =
          topicKey === 'england-premier-league' ||
          topicKey === 'germany-bundesliga' ||
          topicKey === 'italy-serie-a' ||
          topicKey == 'italy-serie-a' ||
          topicKey == 'france-ligue-1' ||
          topicKey === 'spain-la-liga' ||
          topicKey === 'germany-bundesliga'
            ? 'competition'
            : 'team';
        const url = `https://www.scorebat.com/video-api/v3/${detailOf}/${topicKey}/?token=ODE3NDNfMTY5MjUxODgyM18yNDEwMTkwOTQzNGM3NDIxY2MwZjZkNjM3NzNjMGY4NjFmZmNjZTYy`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          setHighlightsData(data.response);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchHighlights();
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
                  style={{ backgroundImage: `url(${highlightsData[0]?.thumbnail})` }}
                  onClick={() => handleVideoClick(highlightsData[0]?.videos[0]?.embed)}>
                  <i className="fa-solid fa-circle-play"></i>
                </div>
                <div className="content">
                  <h5>{highlightsData[0]?.title}</h5>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMathInfoClick(highlightsData[0]?.matchviewUrl);
                    }}>
                    MATH INFO
                  </a>
                  <small>{new Date(highlightsData[0]?.date).toLocaleString()}</small>
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
                      style={{ backgroundImage: `url(${highlight.thumbnail})` }}
                      onClick={() => handleVideoClick(highlight.videos[0]?.embed)}>
                      <i className="fa-solid fa-circle-play"></i>
                    </div>
                    <div className="content">
                      <h5>{highlight.title}</h5>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleMathInfoClick(highlight?.matchviewUrl);
                        }}>
                        MATH INFO
                      </a>
                      <small>{new Date(highlight.date).toLocaleString()}</small>
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
                        style={{ backgroundImage: `url(${highlight.thumbnail})` }}
                        onClick={() => handleVideoClick(highlight.videos[0]?.embed)}>
                        <i className="fa-solid fa-circle-play"></i>
                      </div>
                      <div className="content">
                        <h5>{highlight.title}</h5>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleMathInfoClick(highlight?.matchviewUrl);
                          }}>
                          MATH INFO
                        </a>
                        <small>{new Date(highlight.date).toLocaleString()}</small>
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

export default HighlightsList;
