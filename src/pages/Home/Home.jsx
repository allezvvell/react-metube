import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useQuery } from '@tanstack/react-query';
import VideoCardA from '../../components/VideoCardA/VideoCardA';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { useProgressBar } from '../../hooks/useProgressBar';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { throttle } from 'lodash';
import { useYoutubeApi } from '../../context/YoutubeApiContext';

export default function Home() {
  const { downloadProgress, setDownloadProgress } = useProgressBar();
  const [videos, setVideos] = useState([]);
  const [nextPage, setNextPage] = useState(undefined);
  const youtube = useYoutubeApi();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['popularVideos', nextPage],
    queryFn: () => youtube.popularVidoes({ setDownloadProgress, nextPage }),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setVideos((prev) => [...(prev || []), ...(data?.items || [])]);

    const handleScroll = throttle(() => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      if (
        scrollTop + windowHeight >= documentHeight - 80 &&
        data?.nextPageToken
      ) {
        setNextPage(data.nextPageToken);
      }
    }, 300);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);

  if (isLoading && !nextPage) {
    return <ProgressBar width={downloadProgress} />;
  }

  if (isError && !nextPage) {
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
