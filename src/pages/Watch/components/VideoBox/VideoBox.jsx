import React, { useState } from 'react';
import YouTube from 'react-youtube';
import styles from './VideoBox.module.css';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../../../../context/YoutubeApiContext';
import { formateDate, formatNumber } from '../../../../utils/commonFunctions';

export default function VideoBox({ id, data, error }) {
  const youtube = useYoutubeApi();
  const { error: channelError, data: channelData } = useQuery({
    queryKey: ['channel', data?.snippet.channelId],
    queryFn: () => youtube.channel({ id: data?.snippet.channelId }),
    enabled: !!data?.snippet.channelId,
    staleTime: 1000 * 60 * 60,
  });
  const [expended, setExpended] = useState(false);
  const txt = data?.snippet.description;
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
        {error && <>error : {error.message}</>}
        {data && (
          <>
            <h2>{data?.snippet.title}</h2>
            <div className={styles.channel}>
              <img
                src={
                  channelError
                    ? '/assets/channel_profile.png'
                    : channelData?.snippet.thumbnails.default.url
                }
                alt={channelData?.snippet.title}
              />
              <p className={styles['channel-info']}>
                <span>{channelData?.snippet.title}</span>
                <span>
                  {formatNumber(channelData?.statistics.subscriberCount)}
                </span>
              </p>
            </div>
            <div className={styles.desc}>
              <div className={styles['video-count']}>
                <span>조회수 {formatNumber(data?.statistics.viewCount)}</span>
                <span>{formateDate(data?.snippet.publishedAt)}</span>
              </div>
              <div className={styles.txt}>
                {expended
                  ? txt
                  : txt?.slice(0, TXT_MAX) + (isTxtOver ? '...' : '')}
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
          </>
        )}
      </div>
    </>
  );
}
