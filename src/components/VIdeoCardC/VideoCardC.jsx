import React from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoCardC.module.css';
import Moment from 'react-moment';
import 'moment/locale/ko';

export default function VideoCardC({ item, id }) {
  const { channelTitle, publishedAt, thumbnails, title } = item;
  return (
    <Link to={`/watch/${id}`} className={styles.video}>
      <img src={thumbnails.medium.url} alt="썸네일" />
      <div>
        <h3>{title}</h3>
        <span>{channelTitle}</span>
        <em>
          <Moment fromNow locale="ko">
            {publishedAt}
          </Moment>
        </em>
      </div>
    </Link>
  );
}
