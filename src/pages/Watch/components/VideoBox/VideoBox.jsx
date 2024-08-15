import React, { useState } from 'react';
import YouTube from 'react-youtube';
import styles from './VideoBox.module.css';
import { useVideoDetail } from '../../../../hooks/useVideoDetail';
import { useChannelDetail } from '../../../../hooks/useChannelDetail';
import Moment from 'react-moment';

export default function VideoBox({ id }) {
  const { data } = useVideoDetail(id);
  const { data: cData } = useChannelDetail(
    data?.items[0].snippet.channelId,
    !!data
  );
  const [expended, setExpended] = useState(false);
  const txt = data?.items[0].snippet.description;
  const TXT_MAX = 50;
  const isTxtOver = txt?.length > TXT_MAX;
  const handleClick = () => {
    setExpended((prev) => !prev);
  };
  return (
    <>
      <div className={styles.video}>
        <YouTube videoId={id} />
      </div>
      <div className={styles['desc-box']}>
        <h2>{data?.items[0].snippet.title}</h2>
        <div className={styles.channel}>
          <img
            src={cData?.items && cData.items[0].snippet.thumbnails.default.url}
            alt="채널프로필"
          />
          <div className={styles['channel-info']}>
            <span>{data?.items[0].snippet.channelTitle}</span>
            <span>
              구독자 {cData?.items && cData.items[0].statistics.subscriberCount}
              명
            </span>
          </div>
        </div>
        <div className={styles.desc}>
          <div className={styles['video-count']}>
            <span>조회수 {data?.items[0].statistics.viewCount}</span>
            <span>
              <Moment fromNow>{data?.items[0].snippet.publishedAt}</Moment>
            </span>
          </div>
          <div className={styles.txt}>
            {expended ? txt : txt?.slice(0, TXT_MAX) + (isTxtOver ? '...' : '')}
            {isTxtOver &&
              (expended ? (
                <div>
                  <button onClick={handleClick}>간략히</button>
                </div>
              ) : (
                <button onClick={handleClick}>더보기</button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
