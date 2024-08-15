import { apiYoutbe } from '../utils/apiYoutube';
import { useQuery } from '@tanstack/react-query';

const getVideosByKeyword = ({ keyword, setDownloadProgress }) => {
  return apiYoutbe.get(
    `search?part=snippet&type=video&maxResults=25&regionCode=KR&q=${keyword}`,
    {
      onDownloadProgress: (progressEvent) => {
        if (setDownloadProgress) {
          const event = progressEvent.event;
          const totalLength = event.lengthComputable
            ? event.total
            : parseInt(event.target.getResponseHeader('content-length'), 10);
          if (totalLength) {
            const progress = Math.round((event.loaded * 100) / totalLength);
            setDownloadProgress(progress);
          }
        }
      },
    }
  );
};

export const useVideosByKeyword = ({ keyword, setDownloadProgress }) => {
  return useQuery({
    queryKey: ['videosByKeyword', keyword],
    queryFn: () => getVideosByKeyword({ keyword, setDownloadProgress }),
  });
};
