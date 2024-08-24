import { createContext, useContext, useEffect, useState } from 'react';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const updateHistory = (videoId) => {
    setHistory((prev) => {
      const date = new Date();
      const today =
        date.getFullYear() +
        '.' +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '.' +
        date.getDate().toString().padStart(2, '0');

      if (prev.length === 0 || prev[0].date !== today) {
        return [{ date: today, ids: [videoId] }, ...prev];
      } else {
        if (prev[0].ids.includes(videoId)) {
          return prev;
        } else {
          return [
            { date: today, ids: [videoId, ...prev[0].ids] },
            ...prev.slice(1),
          ];
        }
      }
    });
  };

  const deleteHistory = (date, videoId) => {
    if (!date || !videoId) return;
    setHistory((prev) => {
      const deletedIndex = prev.findIndex((item) => item.date === date);
      const deletedIds = prev[deletedIndex].ids.filter((id) => id !== videoId);

      if (deletedIds.length === 0)
        return [
          ...prev.slice(0, deletedIndex),
          ...prev.slice(deletedIndex + 1),
        ];

      return [
        ...prev.slice(0, deletedIndex),
        {
          ...prev[deletedIndex],
          ids: deletedIds,
        },
        ...prev.slice(deletedIndex + 1),
      ];
    });
  };

  useEffect(() => {
    const localHistory = localStorage.getItem('history');
    if (localHistory) setHistory(JSON.parse(localHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  return (
    <HistoryContext.Provider value={{ history, updateHistory, deleteHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => useContext(HistoryContext);
