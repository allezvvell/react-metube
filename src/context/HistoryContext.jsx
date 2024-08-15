import { createContext, useState } from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const updateHistory = (videoId) => {
    setHistory((prev) => {
      if (!prev.includes(videoId)) {
        return [...prev, videoId];
      }
      return prev;
    });
  };
  return (
    <HistoryContext.Provider value={{ history, updateHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
