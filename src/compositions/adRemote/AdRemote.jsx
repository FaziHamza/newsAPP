import styles from './AdRemote.module.css';
import { Link } from 'react-router-dom';

const AdRemote = ({ badge = '', to }) => {
  return (
    <a className={`ad ${styles.ad}`.trim()} href="https://www.sportspotnews-landingpage.com/">
      <img src={badge} alt="badge" width={150} />
    </a>
  );
};

export default AdRemote;
