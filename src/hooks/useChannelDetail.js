import { apiYoutbe } from '../utils/apiYoutube';
import { useQuery } from '@tanstack/react-query';

const getChannelDetail = (channelId) => {
  return apiYoutbe.get(`channels?part=snippet%2Cstatistics&id=${channelId}`);
};

export const useChannelDetail = (id, enabled = true) => {
  return useQuery({
    queryKey: ['channel', id],
    queryFn: () => getChannelDetail(id),
    enabled,
  });
};
