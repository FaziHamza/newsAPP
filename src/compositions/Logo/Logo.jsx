import { Link } from 'react-router-dom';
import { ImageContainer } from '../../components';
import styles from './Logo.module.css';
import { logo, sportLogoBlack,flag } from '../../assets';
import { useThemeContext } from '../../utilities/themeQuery';
import { useSelector } from 'react-redux';

const Logo = ({ name,  href, alt, className = '' }) => {
  const themeVariant = useThemeContext();
  const flagUrl = useSelector((state) => state?.origin?.flagUrl)

  return (
      <Link className={`logo ${styles.logo} ${className}`.trim()} to={href}>
        <ImageContainer
          src={name=='Logo' ? logo : flagUrl}
          containerClass={name === 'Logo' ? 'logo-image' : 'flag-image'}  // Apply class based on name value
          alt={alt}
      />
    </Link>
  );
};

export default Logo;
