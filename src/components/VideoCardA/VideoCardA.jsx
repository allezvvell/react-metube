import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoCardA.module.css';
import { formateDate, formatNumber } from '../../utils/commonFunctions';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../../context/YoutubeApiContext';
import YouTube from 'react-youtube';

export default function VideoCardA({ video }) {
  const [videoPlay, setVideoPlay] = useState(false);
  const {
    snippet,
    id: videoId,
    statistics: { viewCount },
  } = video;
  const {
    thumbnails,
    channelId: cId,
    channelTitle: cTitle,
    publishedAt: date,
    title,
  } = snippet;
  const youtube = useYoutubeApi();
  const { error, data: cData } = useQuery({
    queryKey: ['channel', cId],
    queryFn: () => youtube.channel({ id: cId }),
  });

  return (
    <Link to={`/watch/${videoId}`}>
      <div
        className={styles['img-wrap']}
        onMouseEnter={() => setVideoPlay(true)}
        onMouseLeave={() => setVideoPlay(false)}
      >
        <img
          src={thumbnails.maxres?.url || thumbnails.medium.url}
          alt="썸네일"
        />
        {videoPlay && (
          <>
            <YouTube
              videoId={videoId}
              opts={{
                playerVars: { autoplay: 1, controls: 0, modestbranding: 1 },
              }}
              onReady={(e) => e.target.mute()}
              className={styles.youtube}
            />
          </>
        )}
      </div>
      <div className={styles['desc-wrap']}>
        <img
          className={styles.profile}
          src={
            !error
              ? cData?.snippet.thumbnails.default.url
              : 'assets/channel_profile.png'
          }
          alt="채널프로필"
        />
        <div className={styles.desc}>
          <h3 title={title}>{title}</h3>
          <p title={cTitle}>{cTitle}</p>
          <div className={styles.count}>
            <span>{formateDate(date)}</span>
            <span>{formatNumber(viewCount)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
