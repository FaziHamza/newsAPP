import { Link } from 'react-router-dom';
import { ImageContainer } from '../../components';
import styles from './Logo.module.css';
import { logo, sportLogoBlack } from '../../assets';
import { useThemeContext } from '../../utilities/themeQuery';

const Logo = ({ href, alt, className = '' }) => {
  const themeVariant = useThemeContext();

  return (
      <Link className={`logo ${styles.logo} ${className}`.trim()} to={href}>
        <ImageContainer
          src={themeVariant === 'dark' ? logo : logo}
          containerClass="logo-image"
          alt={alt}
      />
    </Link>
  );
};

export default Logo;
