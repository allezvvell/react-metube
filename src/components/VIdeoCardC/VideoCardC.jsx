import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoCardC.module.css';
import { formateDate } from '../../utils/commonFunctions';
import { useYoutubeApi } from '../../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import { useHistoryContext } from '../../context/HistoryContext';
import { MdOutlineCancel } from 'react-icons/md';

export default function VideoCardC({ item, id, type, addedDate }) {
  const isHistory = type === 'history';
  const { deleteHistory } = useHistoryContext();
  const [detail, setDetail] = useState(item || null);

  const youtube = useYoutubeApi();
  const { data } = useQuery({
    queryKey: ['videoDetail', id],
    queryFn: () => youtube.videoDetail({ id }),
    enabled: !item,
    staleTime: 1000 * 60 * 60,
  });

  const { channelTitle, publishedAt, thumbnails, title } = detail || {};

  useEffect(() => {
    if (!item && data) {
      setDetail(data.snippet);
    }
  }, [data, item]);

  return (
    <li>
      <Link
        to={`/watch/${id}`}
        className={`${styles.video} ${
          isHistory ? styles['history-video'] : ''
        }`}
      >
        <img
          src={thumbnails?.medium.url}
          alt={title}
          className={isHistory ? styles['history-image'] : ''}
        />
        <div>
          <div className={styles['desc-header']}>
            <h3 className={isHistory ? styles['history-title'] : ''}>
              {title}
            </h3>
            {isHistory && (
              <button
                onClick={() => {
                  deleteHistory(addedDate, id);
                }}
              >
                <MdOutlineCancel />
              </button>
            )}
          </div>
          <span className={isHistory ? styles['history-txt'] : ''}>
            {channelTitle}
          </span>
          <em className={isHistory ? styles['history-txt'] : ''}>
            {formateDate(publishedAt)}
          </em>
        </div>
      </Link>
    </li>
  );
}
