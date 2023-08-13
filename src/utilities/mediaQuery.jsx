import { createContext, useContext } from 'react';
import { useMediaQuery } from './hooks';

const MediaQueryContext = createContext();

export const MediaQueryProvider = (props) => {
  const isDesktop = useMediaQuery('width', 1024);

  return <MediaQueryContext.Provider value={isDesktop ? 'desktop' : 'mobile'} {...props} />;
};

export const useMediaContext = () => {
  const context = useContext(MediaQueryContext);

  if (!context) {
    throw new Error('useMediaContext must be used within MediaQueryProvider');
  }
  return context;
};
