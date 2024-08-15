import React from 'react';
import { useVideosByChannel } from '../../../../hooks/useVideosByChannel';
import { useVideoDetail } from '../../../../hooks/useVideoDetail';
import VideoCardC from '../../../../components/VIdeoCardC/VideoCardC';
import styles from './RelatedVideos.module.css';

export default function RelatedVideos({ videoId }) {
  const { data } = useVideoDetail(videoId);
  const { data: relatedVideos } = useVideosByChannel(
    data?.items[0].snippet.channelId,
    !!data
  );
  return (
    <ul className={styles.list}>
      {relatedVideos?.items.map((item, index) => {
        return (
          <li key={index}>
            <VideoCardC item={item.snippet} id={item.id.videoId} />
          </li>
        );
      })}
    </ul>
  );
}
