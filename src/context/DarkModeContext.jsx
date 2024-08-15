import { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleIsDark = () => {
    setIsDark((prev) => !prev);
  };
  useEffect(() => {
    if (isDark) {
      window.document.body.classList.add('dark');
    } else {
      window.document.body.classList.remove('dark');
    }
  }, [isDark]);
  return (
    <DarkModeContext.Provider value={{ isDark, toggleIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};
