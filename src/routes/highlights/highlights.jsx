import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HighlightsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoEmbed, setVideoEmbed] = useState('');
  const [mathInfoEmbed, setMathInfoEmbed] = useState(null);
  const [showMathInfoModal, setShowMathInfoModal] = useState(false);
  const [highlightsData, setHighlightsData] = useState([]);

  const location = useLocation();
  const { state } = location;
  console.log(JSON.stringify(state));
  var topicName = state?.topicName;
  useEffect(() => {
    const fetchHighlights = async () => {
      const highlightMapping = {
        "Premier League": "england-premier-league",
        "LA LIGA ": "spain-la-liga",
        "Bundesliga senaste nytt": "germany-bundesliga",
        "Tennis senaste nytt": "Tennis",
        "Golf senaste nytt": "Golf",
        "Serie A senaste nytt": "italy-serie-a"
      };

      const highlightName = highlightMapping[topicName];
      // topicName = highlightMapping[topicName]; // i update the topic name here why not reflect in UI ?
      if (highlightName) {
        const url = `https://www.scorebat.com/video-api/v3/competition/${highlightName}/?token=ODE3NDNfMTY5MjUxODgyM18yNDEwMTkwOTQzNGM3NDIxY2MwZjZkNjM3NzNjMGY4NjFmZmNjZTYy`;

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
  }

  return (
    <div className="layout">
      <div className="main-card-section">
        <div className="main-card">
          <div className="header">
            <div>
              <img src={LogoPath} alt="Logo" />
              {/* why topicName not update here ?? */}
              <span>{topicName.replace('senaste nytt', '')}</span> {/* Modify this line */}
            </div>
            <div>
              {/* <img src="assets/images/22.png" alt="" /> */}
              {/* <span>SUBTOPIC : {SubTopicId} </span> */}
            </div>
          </div>
          <div className="video-banner" style={{ backgroundImage: `url(${highlightsData[0]?.thumbnail})` }} onClick={() => handleVideoClick(highlightsData[0]?.videos[0]?.embed)}>
            <i className="fa-solid fa-circle-play"></i>
          </div>
          <div className="content">
            <h5>
              {highlightsData[0]?.title}
            </h5>
            <a href="#" onClick={(e) => { e.preventDefault(); handleMathInfoClick(highlightsData[0]?.matchviewUrl); }}>MATH INFO</a>
            <small>{new Date(highlightsData[0]?.date).toLocaleString()}</small>
          </div>
          {showMathInfoModal && (
            <div className="modal">
              <div className="modal-content modal-content-more">
                <button onClick={() => { setShowMathInfoModal(false); }} className="close-button">X</button>
                <iframe src={mathInfoEmbed} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="secondary-card-section">
        {highlightsData.slice(1).map((highlight, index) => (
          <div key={index} className="secondary-card">
            <div className="video-banner" style={{ backgroundImage: `url(${highlight.thumbnail})` }} onClick={() => handleVideoClick(highlight.videos[0]?.embed)}>
              <i className="fa-solid fa-circle-play"></i>
            </div>
            <div className="content">
              <h5>
                {highlight.title}
              </h5>
              <a href="#" onClick={(e) => { e.preventDefault(); handleMathInfoClick(highlight?.matchviewUrl); }}>MATH INFO</a>
              <small>{new Date(highlight.date).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleCloseModal} className="close-button">X</button>
            <div className="video-wrapper" dangerouslySetInnerHTML={{ __html: videoEmbed }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightsList;
