import { timeQuery } from '../../utilities/timeQuery';
import { useLocation } from 'react-router-dom';

const DisplayComponent = ({ topic }) => {
  const location = useLocation();
  const { state } = location;

  // Now you can access the passed state values
  const moreItemName = state?.moreItemName;
  const teamName = state?.Name;
  const defaulttopic = topic?.Name;
  const logoPath=state?.LogoPath
  console.log(moreItemName)
  console.log(teamName)
  return (
    <>
      {moreItemName && teamName && logoPath ? (
        <>
        
        <h4 className="title">
          <img src={logoPath} height={'20px'}/>
          {/* <img src='https://theblogreaders.com/wp-content/uploads/2015/12/Go.gif ' height={'20px'}/> */}
           {moreItemName} :{teamName}</h4>
        </>
      ) : (
        <h4 className="title"> {defaulttopic}</h4>

      )}
    </>
  );
}
const StoryMain = ({ description, className = '', src, alt, time }) => {
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

  // console.log(days);

  return (
    <>


      <div className='league-card'>
      < DisplayComponent />
        <div className='banner'>
          <img src={src} alt={alt} />                     </div>
        <div className='content'>
          <p>
            {description}
          </p>
          <div className='date'>
            <p>{days()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryMain;
