import { Link } from 'react-router-dom';
import { ImageContainer } from '../../components';
import styles from './Logo.module.css';
import { logo, sportLogoBlack,flag } from '../../assets';
import { useThemeContext } from '../../utilities/themeQuery';

const Logo = ({ name,  href, alt, className = '' }) => {
  const themeVariant = useThemeContext();

  return (
      <Link className={`logo ${styles.logo} ${className}`.trim()} to={href}>
        <ImageContainer
          src={name=='Logo' ? logo : flag}
          containerClass="logo-image"
          alt={alt}
      />
    </Link>
  );
};

export default Logo;
