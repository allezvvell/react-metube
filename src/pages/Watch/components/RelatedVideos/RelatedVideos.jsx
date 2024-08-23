import React from 'react';
import VideoCardC from '../../../../components/VIdeoCardC/VideoCardC';
import styles from './RelatedVideos.module.css';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../../../../context/YoutubeApiContext';

export default function RelatedVideos({ channelId }) {
  const youtube = useYoutubeApi();
  const { error, data } = useQuery({
    queryKey: ['videosByChannel', channelId],
    queryFn: () => youtube.videosByChannel({ channelId }),
    enabled: !!channelId,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <ul className={styles.list}>
      {error && <>error : {error.message}</>}
      {data &&
        data.items.map((video, index) => (
          <VideoCardC
            item={video.snippet}
            id={video.id.videoId}
            key={video.id.videoId}
          />
        ))}
    </ul>
  );
}
