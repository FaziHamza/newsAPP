const ImageContainer = ({ containerClass = '', ...props }) => {
  return (
    <div className={containerClass}>
      <img {...props} />
    </div>
  );
};

export default ImageContainer;
