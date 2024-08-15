import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { usePopularVideos } from '../../hooks/usePopularVideos';
import VideoCardA from '../../components/VideoCardA/VideoCardA';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { useProgressBar } from '../../hooks/useProgressBar';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function Home() {
  const { downloadProgress, setDownloadProgress } = useProgressBar();
  const { isLoading, isError, error, data } = usePopularVideos({
    setDownloadProgress,
  });
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    setVideos(data?.items);
  }, [data]);

  if (isLoading) {
    return <ProgressBar width={downloadProgress} />;
  }
  if (isError) {
    console.log(error);
    return <ErrorMessage txt={error.message} />;
  }
  return (
    <ul className={styles['video-list']}>
      {videos?.map((item, index) => (
        <li key={index}>
          <VideoCardA video={item} />
        </li>
      ))}
    </ul>
  );
}
