import { useQuery } from '@tanstack/react-query';
import { apiYoutbeChannel } from '../utils/apiYoutube';

const getVideosByChannel = (id) => {
  return apiYoutbeChannel.get(
    `search?part=snippet&type=video&maxResults=25&regionCode=KR&channelId=${id}`
  );
};

export const useVideosByChannel = (channelId, enabled = true) => {
  return useQuery({
    queryKey: ['videosChannel', channelId],
    queryFn: () => getVideosByChannel(channelId),
    enabled,
  });
};
