import { timeQuery } from '../../utilities/timeQuery';
import { json, useLocation } from 'react-router-dom';
import { sportspotsverige, AFP_news,SPORSpot_News } from '../../assets';
const StoryTile = ({idforlogo, description, className = '', src, alt, time, isDesktopScreen }) => {
  const location = useLocation();
  const { state } = location;
  let imageUrl;
  if(idforlogo.length === 7) { 
    imageUrl = AFP_news;
  } else {
    imageUrl = SPORSpot_News;
  }
// const days = () => {
  //   const timeDifference = timeQuery(time); // Assuming timeQuery returns the difference in hours
  //   const day = Math.floor(timeDifference / 24);
  //   const hours = timeDifference % 24;

  //   if (timeDifference < 24) {
  //     return `${hours.toFixed(2)} hours `; // Swedish for hours
  //   } else {
  //     return `${day} Day  `; // Swedish for days
  //   }
  // };
  const days = () => {
    const timeDifference = timeQuery(time); // Assuming timeQuery returns the difference in hours
    const days = Math.floor(timeDifference / 24);
    const hours = Math.floor(timeDifference % 24);
    const remainingMinutes = Math.round((timeDifference - Math.floor(timeDifference)) * 60);
  
    if (timeDifference < 1) {
      return `${remainingMinutes} minutes`; // Return minutes if less than 1 hour
    } else if (timeDifference < 24) {
      return `${hours} hours`; // Return hours and minutes if less than 1 day
    } else {
      return `${days} Day`; // Return days, hours, and minutes
    }
  };
  const sanitizedSrc = src.replace(/([^:]\/)\/+/g, "$1");

  return (
    <>

      <div className={`suggested-card ${className}`}>
        <div className='banner'>
          <img src={sanitizedSrc} alt={alt} />
        </div>
        <div className='content'>
          {/* <p>{description}</p> */}
          <p className={!!isDesktopScreen ? 'desktop' : 'mobile'} dangerouslySetInnerHTML={{ __html: description }} />
          <h6 className='content-time-img'  >
            <img src={imageUrl} alt="" />
            {days()}
          </h6>
        </div>
      </div>
    </>
  );
};

export default StoryTile;
