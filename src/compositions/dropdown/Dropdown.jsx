import { useState } from 'react';
import { useOutsideClick } from '../../utilities/hooks';

const Dropdown = ({ title, listItems, className = '' }) => {
  const [listVisible, setListVisible] = useState(false);
  const ref = useOutsideClick(() => setListVisible(false));
  const handleClick = (evt) => {
    setListVisible(!listVisible);
    evt.stopPropagation();
  };

  return (
    <div ref={ref} className={className}>
      <h4 className="dropdown-title" onClick={handleClick}>
        {title}
      </h4>
      {listVisible ? (
        <nav className="dropdown-list">
          <ul>{listItems}</ul>
        </nav>
      ) : null}
    </div>
  );
};

export default Dropdown;
