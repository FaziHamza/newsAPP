import styles from './Promo.module.css';
import { newsLogo } from '../../assets';

const Promo = ({ appBadge, playBadge, setVisible }) => {
  return (
    <div className={`promo ${styles.background}`}>
      <div className={styles.container}>
        <button onClick={() => setVisible(false)}>X</button>
        <img src={newsLogo} alt={'newsLogo'} />
        <p>Internationella och lokala sportnyheter på svenska filtrerade efter ditt intresse</p>
        <img src={appBadge} alt={'appleStore'} />
        <img src={playBadge} alt={'playStore'} />
        <p>Tillgänglig från: 06. 01. 2023</p>
      </div>
    </div>
  );
};

export default Promo;
