import styles from './Icon.module.css';

const Icon = ({ src, className, ...props }) => {
  return (
    <div className={`${className} ${styles.icon}`.trim()} {...props}>
      {src}
    </div>
  );
};

export default Icon;
