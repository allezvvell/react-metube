import React from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoCardA.module.css';
import Moment from 'react-moment';
import 'moment/locale/ko';
import { useChannelDetail } from '../../hooks/useChannelDetail';

export default function VideoCardA({ video }) {
  const { snippet, id: videoId } = video;
  const {
    thumbnails,
    channelId: cId,
    channelTitle: cTitle,
    publishedAt: date,
    title,
  } = snippet;
  const { isError, data } = useChannelDetail(cId);
  return (
    <Link to={`/watch/${videoId}`}>
      <div className={styles['img-wrap']}>
        <img
          src={thumbnails.maxres?.url || thumbnails.medium.url}
          alt="썸네일"
        />
      </div>
      <div className={styles['desc-wrap']}>
        <img
          className={styles.profile}
          src={
            !isError
              ? data?.items[0].snippet.thumbnails.default.url
              : 'assets/channel_profile.png'
          }
          alt="채널프로필"
        />
        <div className={styles.desc}>
          <h3 title={title}>{title}</h3>
          <p title={cTitle}>{cTitle}</p>
          <span>
            <Moment fromNow locale="ko">
              {date}
            </Moment>
          </span>
        </div>
      </div>
    </Link>
  );
}
