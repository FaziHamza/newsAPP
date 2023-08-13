import styles from './AdMobile.module.css';

const AdMobile = ({ badge = '', ...props }) => {
  return (
    <div className={`adMobile ${styles.adMobile}`.trim()} {...props}>
      <img src={badge} alt="badge" width={150} />
    </div>
  );
};

export default AdMobile;
