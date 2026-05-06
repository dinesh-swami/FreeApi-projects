import { useState, useEffect } from 'react';

const API_URL = 'https://api.freeapi.app/api/v1/public/youtube/videos';

export const useFetchVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchVideos = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?page=${pageNum}&limit=12`);
      const data = await res.json();
      
      if (data.statusCode === 200) {
        const newVideos = data.data.data.map(item => ({
          id: item.items.id,
          title: item.items.snippet.title,
          channel: item.items.snippet.channelTitle,
          thumbnail: item.items.snippet.thumbnails.high?.url || item.items.snippet.thumbnails.medium.url,
          duration: item.items.contentDetails.duration,
          views: item.items.statistics.viewCount,
          publishedAt: item.items.snippet.publishedAt,
        }));

        if (pageNum === 1) {
          setVideos(newVideos);
        } else {
          setVideos(prev => [...prev, ...newVideos]);
        }
        setHasMore(data.data.nextPage);
      }
    } catch (err) {
      setError('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(1);
  }, []);

  return { videos, loading, error, fetchVideos, page, setPage, hasMore };
};