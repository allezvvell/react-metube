import { useEffect, useState } from 'react';

export const useProgressBar = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  useEffect(() => {
    if (downloadProgress < 90) {
      const interval = setInterval(() => {
        setDownloadProgress((prev) => Math.min(prev + 1, 90));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [downloadProgress]);
  return { downloadProgress, setDownloadProgress };
};
