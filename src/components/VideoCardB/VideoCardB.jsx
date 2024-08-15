import React from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoCardB.module.css';
import { useChannelDetail } from '../../hooks/useChannelDetail';
import Moment from 'react-moment';
import 'moment/locale/ko';

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
  //   console.log(snippet);
  const { isError, data } = useChannelDetail(cId);
  return (
    <Link to={`/watch/${id.videoId}`} className={styles.item}>
      <div className={styles['img-wrap']}>
        <img src={thumbnails.high.url} alt="썸네일" />
      </div>
      <div className={styles.desc}>
        <h3>{title}</h3>
        <div className={styles.count}>
          <span className={styles.date}>
            <Moment fromNow locale="ko">
              {date}
            </Moment>
          </span>
        </div>
        <div className={styles.channel}>
          <img
            src={
              !isError
                ? data?.items[0].snippet.thumbnails.default.url
                : 'assets/channel_profile.png'
            }
            alt="채널프로필"
          />
          <span>{cTitle}</span>
        </div>
        <p>{description}</p>
      </div>
    </Link>
  );
}
