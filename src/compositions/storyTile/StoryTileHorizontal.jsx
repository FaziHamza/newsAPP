import { timeQuery } from '../../utilities/timeQuery';
import { json, useLocation } from 'react-router-dom';
import { sportspotsverige, AFP_news,SPORSpot_News } from '../../assets';
const StoryTileHorizontal = ({idforlogo, leftdescription, className = '', leftimagesrc, leftimagealt,rightdecription,rightimagesrc,rightimagealt, time, isDesktopScreen }) => {
  const location = useLocation();
  const { state } = location;
  let imageUrl;
  if(idforlogo.length === 7) { 
    imageUrl = AFP_news;
  } else {
    imageUrl = SPORSpot_News;
  }
  const days = () => {
    const timeDifference = timeQuery(time); // Assuming timeQuery returns the difference in hours
    const day = Math.floor(timeDifference / 24);
    const hours = timeDifference % 24;

    if (timeDifference < 24) {
      return `${hours.toFixed(2)} Tim `; // Swedish for hours
    } else {
      return `${day} Dag  `; // Swedish for days
    }
  };

  //const sanitizedSrc = src.replace(/([^:]\/)\/+/g, "$1");
  const containerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  const leftInstanceData = {
    sanitizedSrc: leftimagesrc.replace(/([^:]\/)\/+/g, "$1"),
    alt: leftimagealt,
    description: leftdescription,
    // Other left-specific data
  };
  
  const rightInstanceData = {
    sanitizedSrc: rightimagesrc.replace(/([^:]\/)\/+/g, "$1"),
    alt: rightimagealt,
    description: rightdecription,
    // Other right-specific data
  };
  
  return (
    <>

<div style={containerStyles}>
  {/* Left instance */}
  <div className={`suggested-card ${className}`}>
    <div className='content'>
      <div className='horizontal-banner'>
        <img src={leftInstanceData.sanitizedSrc} alt={leftInstanceData.alt} />
      </div>
      <p className={!!isDesktopScreen ? 'desktop' : 'mobile'} dangerouslySetInnerHTML={{ __html: leftInstanceData.description }} />
      {/* Additional left-specific content */}
    </div>
  </div>

  {/* Right instance */}
  <div className={`suggested-card ${className}`}>
    <div className='content'>
      <div className='horizontal-banner'>
        <img src={rightInstanceData.sanitizedSrc} alt={rightInstanceData.alt} />
      </div>
      <p className={!!isDesktopScreen ? 'desktop' : 'mobile'} dangerouslySetInnerHTML={{ __html: rightInstanceData.description }} />
      {/* Additional right-specific content */}
    </div>
  </div>
</div>



    </>
  );
};

export default StoryTileHorizontal;
