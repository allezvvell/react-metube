import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './Comments.module.css';
import Moment from 'react-moment';
import { useYoutubeApi } from '../../../../context/YoutubeApiContext';

export default function Comments({ id, count }) {
  const youtube = useYoutubeApi();
  const { error, data } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => youtube.comments({ id }),
    staleTime: 1000 * 60 * 10,
  });

  return (
    <>
      <h2 className={styles.title}>댓글 {count}개</h2>
      {error && <>error : {error.messgae}</>}
      {data && (
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
      )}
    </>
  );
}
