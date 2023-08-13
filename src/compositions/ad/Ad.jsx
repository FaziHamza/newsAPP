import styles from './Ad.module.css';

const Ad = ({ badge = '', ...props }) => {
  return (
    <div className={`ad ${styles.ad}`.trim()} {...props}>
      <img src={badge} alt="badge" width={150} />
    </div>
  );
};

export default Ad;
