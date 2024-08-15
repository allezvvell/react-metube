import React from 'react';
import { useVideoComments } from '../../../../hooks/useVideoComments';
import styles from './Comments.module.css';
import Moment from 'react-moment';
import { useVideoDetail } from '../../../../hooks/useVideoDetail';

export default function Comments({ id }) {
  const { data } = useVideoComments(id);
  const { data: detail } = useVideoDetail(id);

  return (
    <>
      <h2 className={styles.title}>
        댓글 {detail?.items[0].statistics.commentCount}개
      </h2>
      <ul className={styles.list}>
        {data?.items.map((item, index) => {
          const {
            authorDisplayName,
            authorProfileImageUrl,
            publishedAt,
            textOriginal,
          } = item.snippet.topLevelComment.snippet;
          return (
            <li key={index} className={styles.comment}>
              <img src={authorProfileImageUrl} alt="채널프로필" />
              <div>
                <div className={styles['comment-info']}>
                  <span className={styles.name}>{authorDisplayName}</span>
                  <span className={styles.date}>
                    <Moment fromNow>{publishedAt}</Moment>
                  </span>
                </div>
                <p className={styles['comment-txt']}>{textOriginal}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
