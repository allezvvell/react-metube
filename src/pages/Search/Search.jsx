import React from 'react';
import styles from './Search.module.css';
import { useParams } from 'react-router-dom';
import { useVideosByKeyword } from '../../hooks/useVideosByKeyword';
import VideoCardB from '../../components/VideoCardB/VideoCardB';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { useProgressBar } from '../../hooks/useProgressBar';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function Search() {
  const { q: keyword } = useParams();
  const { downloadProgress, setDownloadProgress } = useProgressBar();
  const { isLoading, isError, error, data } = useVideosByKeyword({
    keyword,
    setDownloadProgress,
  });

  if (isLoading) {
    return <ProgressBar width={downloadProgress} />;
  }
  if (isError) {
    console.log(error);
    return <ErrorMessage txt={error.message} />;
  }
  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        {data?.items.map((item, index) => (
          <li key={index}>
            <VideoCardB item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
