import { apiYoutbe } from '../utils/apiYoutube';
import { useQuery } from '@tanstack/react-query';

const getPopularVideos = (setDownloadProgress) => {
  return apiYoutbe.get(
    `videos?part=snippet%2Cstatistics&chart=mostPopular&regionCode=KR&maxResults=25`,
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

export const usePopularVideos = ({ setDownloadProgress }) => {
  return useQuery({
    queryKey: ['popularVideos'],
    queryFn: () => getPopularVideos(setDownloadProgress),
  });
};
