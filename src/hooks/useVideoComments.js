import { apiYoutbe } from '../utils/apiYoutube';
import { useQuery } from '@tanstack/react-query';

const getVideoComments = (videoId) => {
  return apiYoutbe.get(
    `commentThreads?part=snippet%2Creplies&videoId=${videoId}`
  );
};

export const useVideoComments = (id) => {
  return useQuery({
    queryKey: ['comments', id],
    queryFn: () => getVideoComments(id),
  });
};
