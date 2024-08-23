import axios from 'axios';
export class Youtube {
  constructor() {
    this.params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    };
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3/',
      params: this.params,
    });
    this.channelClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3/',
      params: this.params,
    });
  }

  popularVidoes = async ({ setDownloadProgress, nextPage }) => {
    const params = {
      chart: 'mostPopular',
      regionCode: 'KR',
      maxResults: 25,
    };
    if (nextPage) params.pageToken = nextPage;
    return this.httpClient
      .get('videos?part=snippet%2Cstatistics', {
        params,
        onDownloadProgress: this.handleDownloadProgress(setDownloadProgress),
      })
      .then((res) => res.data);
  };

  videosByKeyword = async ({ setDownloadProgress, keyword }) => {
    return this.httpClient
      .get('search', {
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: 25,
          regionCode: 'KR',
          q: keyword,
        },
        onDownloadProgress: this.handleDownloadProgress(setDownloadProgress),
      })
      .then((res) => res.data);
  };

  videoDetail = async ({ id, setDownloadProgress }) => {
    return this.httpClient
      .get('videos?part=snippet%2Cstatistics', {
        params: {
          id,
        },
        onDownloadProgress: this.handleDownloadProgress(setDownloadProgress),
      })
      .then((res) => {
        return res.data.items[0];
      });
  };

  comments = async ({ id }) => {
    return this.httpClient
      .get('commentThreads?part=snippet%2Creplies', {
        params: {
          videoId: id,
        },
      })
      .then((res) => res.data);
  };

  channel = ({ id }) => {
    return this.httpClient
      .get('channels?part=snippet%2Cstatistics', {
        params: { id },
      })
      .then((res) => res.data.items[0]);
  };

  videosByChannel = ({ channelId }) => {
    return this.channelClient
      .get('search', {
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: 25,
          regionCode: 'KR',
          channelId,
        },
      })
      .then((res) => res.data);
  };

  handleDownloadProgress = (setDownloadProgress) => {
    return (progressEvent) => {
      if (setDownloadProgress) {
        const event = progressEvent.event;
        const totalLength = event.lengthComputable
          ? event.total
          : parseInt(event.target.getResponseHeader('content-length'), 10);
        if (totalLength) {
          const progress = Math.round((event.loaded * 100) / totalLength);
          setDownloadProgress(progress);
        }
      }
    };
  };
}
