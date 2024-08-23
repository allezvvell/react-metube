import React from 'react';
import styles from './Search.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCardB from '../../components/VideoCardB/VideoCardB';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { useProgressBar } from '../../hooks/useProgressBar';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useYoutubeApi } from '../../context/YoutubeApiContext';

export default function Search() {
  const { q: keyword } = useParams();
  const { downloadProgress, setDownloadProgress } = useProgressBar();
  const youtube = useYoutubeApi();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['videosByKeyword', keyword],
    queryFn: () => youtube.videosByKeyword({ setDownloadProgress, keyword }),
    staleTime: 1000 * 60 * 5,
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
