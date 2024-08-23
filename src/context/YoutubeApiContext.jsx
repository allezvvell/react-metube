import { createContext, useContext } from 'react';
import { Youtube } from '../api/youtube';

const YoutubeApiContext = createContext();

export const YoutubeApiProvider = ({ children }) => {
  const youtube = new Youtube();
  return (
    <YoutubeApiContext.Provider value={youtube}>
      {children}
    </YoutubeApiContext.Provider>
  );
};

export const useYoutubeApi = () => useContext(YoutubeApiContext);
