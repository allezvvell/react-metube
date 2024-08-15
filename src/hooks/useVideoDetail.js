import { useQuery } from '@tanstack/react-query';
import { apiYoutbe } from '../utils/apiYoutube';

const getVideoDetail = (id) => {
  return apiYoutbe.get(`videos?part=snippet%2Cstatistics&id=${id}`);
};
export const useVideoDetail = (videoId) => {
  return useQuery({
    queryKey: ['videoDetail', videoId],
    queryFn: () => getVideoDetail(videoId),
  });
};
