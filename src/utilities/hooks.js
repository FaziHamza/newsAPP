import { useRef, useEffect, useState } from 'react';

// Handles registering a click outside of a targeted element
export const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};

// Checks if media dimension is greater than the value entered, returns boolean
export const useMediaQuery = (dimension, value) => {
  const query = `(min-${dimension}: ${value}px)`;
  const matchQueryList = window.matchMedia(query);
  const [matches, setMatches] = useState(matchQueryList.matches);

  useEffect(() => {
    const handleChange = (dimension) => {
      setMatches(dimension.matches);
    };
    matchQueryList.addEventListener('change', handleChange);

    return () => {
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

// Toggles the class on body element for setting the theme
export const useTheme = () => {
  const [themeVariant, setThemeVariant] = useState('light');

  useEffect(() => {
    if (themeVariant === 'dark') {
      document.body.className = 'dark-theme';
    } else {
      document.body.className = 'light-theme';
    }
  }, [themeVariant]);

  return [themeVariant, setThemeVariant];
};

// Picks the scroll position of the window
export const useGetScroll = () => {
  const detectPosition = () => window.scrollY;
  const [position, setPosition] = useState(detectPosition());

  useEffect(() => {
    setPosition(detectPosition());
    window.addEventListener('scroll', detectPosition);
    return () => {
      window.removeEventListener('scroll', detectPosition);
    };
  }, [position]);

  return position;
};
