import React from 'react';
import { useHistoryContext } from '../../context/HistoryContext';
import VideoCardC from '../../components/VIdeoCardC/VideoCardC';
import styles from './History.module.css';

export default function History() {
  const { history } = useHistoryContext();

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>시청 기록</h2>
      <ul className={styles['date-lists']}>
        {history?.map((dateObj) => (
          <li key={dateObj.date}>
            <h3 className={styles.date}>{dateObj.date}</h3>
            <ul className={styles['video-lists']}>
              {dateObj?.ids.map((id) => (
                <VideoCardC
                  key={id}
                  id={id}
                  addedDate={dateObj.date}
                  type="history"
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
