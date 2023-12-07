import { timeQuery } from '../../utilities/timeQuery';
import { json, useLocation } from 'react-router-dom';
import { sportspotsverige, AFP_news,SPORSpot_News } from '../../assets';
const StoryTileHorizonal = ({idforlogo, description, className = '', src, alt, time, isDesktopScreen }) => {
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

  const sanitizedSrc = src.replace(/([^:]\/)\/+/g, "$1");

  return (
    <div className={`suggested-card ${className}`} style={{ display: 'flex' }}>
      <div className='content' style={{ width: '100%' }}>
        {/* <h6 className='content-time-img'>
          {days()}
          <img src={imageUrl} alt="" />
        </h6> */}
        <div className='horizontal-banner'>
          <img src={sanitizedSrc} alt={alt} />
        </div>
        <p className={!!isDesktopScreen ? 'desktop' : 'mobile'} dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      
    </div>
  );
    
};

export default StoryTileHorizonal;
