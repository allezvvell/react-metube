import React from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoCardB.module.css';
import { formateDate } from '../../utils/commonFunctions';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../../context/YoutubeApiContext';

export default function VideoCardB({ item }) {
  const { id, snippet } = item;
  const {
    thumbnails,
    title,
    description,
    channelId: cId,
    channelTitle: cTitle,
    publishedAt: date,
  } = snippet;

  const youtube = useYoutubeApi();
  const { error, data } = useQuery({
    queryKey: ['channel', cId],
    queryFn: () => youtube.channel({ id: cId }),
  });

  return (
    <Link to={`/watch/${id.videoId}`} className={styles.item}>
      <div className={styles['img-wrap']}>
        <img src={thumbnails.high.url} alt="썸네일" />
      </div>
      <div className={styles.desc}>
        <h3>{title}</h3>
        <div className={styles.count}>
          <span className={styles.date}>{formateDate(date)}</span>
        </div>
        <div className={styles.channel}>
          <img
            src={
              !error
                ? data?.snippet.thumbnails.default.url
                : 'assets/channel_profile.png'
            }
            alt={cTitle}
          />
          <span>{cTitle}</span>
        </div>
        <p>{description}</p>
      </div>
    </Link>
  );
}
