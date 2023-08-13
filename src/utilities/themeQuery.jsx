import { createContext, useContext } from 'react';

const ThemeQueryContext = createContext();

export const ThemeQueryProvider = (props) => {
  return <ThemeQueryContext.Provider {...props} />;
};

export const useThemeContext = () => {
  const context = useContext(ThemeQueryContext);

  if (!context) {
    throw new Error('useThemContext must be used within ThemeQueryProvider');
  }
  return context;
};
