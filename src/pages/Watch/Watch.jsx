import React, { useEffect } from 'react';
import styles from './Watch.module.css';
import { useParams } from 'react-router-dom';
import Comments from './components/Comments/Comments';
import VideoBox from './components/VideoBox/VideoBox';
import RelatedVideos from './components/RelatedVideos/RelatedVideos';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../../context/YoutubeApiContext';
import { useProgressBar } from '../../hooks/useProgressBar';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { useHistoryContext } from '../../context/HistoryContext';

export default function Watch() {
  const { videoId } = useParams();
  const { updateHistory } = useHistoryContext();
  const { downloadProgress, setDownloadProgress } = useProgressBar();
  const youtube = useYoutubeApi();
  const {
    isLoading,
    error: detailError,
    data,
  } = useQuery({
    queryKey: ['videoDetail', videoId],
    queryFn: () => youtube.videoDetail({ id: videoId, setDownloadProgress }),
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    updateHistory(videoId);
  }, [videoId, updateHistory]);

  return (
    <>
      {isLoading && <ProgressBar width={downloadProgress} />}
      <div className={styles.wrap}>
        <div className={styles.video}>
          <VideoBox id={videoId} data={data} error={detailError} />
        </div>
        <div className={styles.comments}>
          <Comments id={videoId} count={data?.statistics.commentCount} />
        </div>
        <div className={styles.related}>
          <RelatedVideos channelId={data?.snippet.channelId} />
        </div>
      </div>
    </>
  );
}
