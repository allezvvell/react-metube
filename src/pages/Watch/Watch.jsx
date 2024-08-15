import React, { useContext, useEffect } from 'react';
import styles from './Watch.module.css';
import { useParams } from 'react-router-dom';
import Comments from './components/Comments/Comments';
import VideoBox from './components/VideoBox/VideoBox';
import RelatedVideos from './components/RelatedVideos/RelatedVideos';
import { HistoryContext } from '../..//context/HistoryContext';

export default function Watch() {
  const { videoId } = useParams();
  const { updateHistory } = useContext(HistoryContext);

  useEffect(() => {
    updateHistory(videoId);
  }, [videoId, updateHistory]);

  return (
    <div className={styles.wrap}>
      <div className={styles.video}>
        <VideoBox id={videoId} />
      </div>
      <div className={styles.comments}>
        <Comments id={videoId} />
      </div>
      <div className={styles.related}>
        <RelatedVideos videoId={videoId} />
      </div>
    </div>
  );
}
