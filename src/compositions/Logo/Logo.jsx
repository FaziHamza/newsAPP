import { Link } from 'react-router-dom';
import { ImageContainer } from '../../components';
import styles from './Logo.module.css';
import { logo, sportLogoBlack,flag, engFlag, franceFlag } from '../../assets';
import { useThemeContext } from '../../utilities/themeQuery';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Logo = ({ name,  href, alt, className = '' }) => {
  const themeVariant = useThemeContext();
  const selectedOrigin = useSelector((state) => state?.origin?.selectedOrigin);
  const flagUrl = useSelector((state) => state?.origin?.flagUrl)

  useEffect(()=>{
   },[selectedOrigin,flagUrl])
const flags = {england : engFlag, france : franceFlag}
  return (
      <Link className={`logo ${styles.logo} ${className}`.trim()} to={href}>
        <ImageContainer
          src={name=='Logo' ? logo : flagUrl}
          // src={name=='Logo' ? logo : engFlag }
          containerClass={name === 'Logo' ? 'logo-image' : 'flag-image'}  // Apply class based on name value
          alt={alt}
      />
    </Link>
  );
};

export default Logo;
