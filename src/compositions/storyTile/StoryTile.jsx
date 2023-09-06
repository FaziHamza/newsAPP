import { timeQuery } from '../../utilities/timeQuery';
import { json, useLocation } from 'react-router-dom';
import { sportspotsverige, AFP_news } from '../../assets';
const StoryTile = ({ description, className = '', src, alt, time, isDesktopScreen }) => {
  const location = useLocation();
  const { state } = location;
  const IsSql = state?.IsSql;
  const imageUrl = IsSql
    ? sportspotsverige
    : AFP_news;

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
    <>

      <div className={`suggested-card ${className}`}>
        <div className='banner'>
          <img src={sanitizedSrc} alt={alt} />

        </div>
        <div className='content'>
          {/* <p>{description}</p> */}
          <p className={!!isDesktopScreen ? 'desktop' : 'mobile'} dangerouslySetInnerHTML={{ __html: description }} />
          <h6 className='content-time-img'  >{days()}
            <img src={imageUrl} alt="" />
          </h6>
        </div>
      </div>
    </>
  );
};

export default StoryTile;
