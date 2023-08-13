import { timeQuery } from '../../utilities/timeQuery';

const StoryTile = ({ description, className = '', src, alt, time }) => {
  const days = () => {
    const day = Math.floor(timeQuery(time));
    switch (true) {
      case day < 1:
        return 'last 24 hours';
      case day >= 1 && day < 2:
        return `${day} day ago`;
      case day > 2:
        return `${day} days ago`;
      default:
        return 'no date';
    }
  };

  console.log(days);

  return (
    <>
      {/* <div className={`story-tile ${className}`.trim()}> */}
        {/* <figure>
          <img src={src} alt={alt} />
        </figure>
        <p>{description}</p>
        <span>{days()}</span> */}
      {/* </div> */}

                   <div className='suggested-card'>
                    <div className='banner'>
                    <img src={src} alt={alt} />
                    </div>
                    <div className='content'>
                    <p>{description}</p>
                      <h6>{days()}</h6>
                    </div>
                  </div>
    </>
  );
};

export default StoryTile;
