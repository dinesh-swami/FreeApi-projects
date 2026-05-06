import { formatDuration, formatViews, timeAgo } from '../utils/formatters';

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <div className="thumbnail-container">
        <img src={video.thumbnail} alt={video.title} className="thumbnail" />
        <span className="duration">{formatDuration(video.duration)}</span>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="channel">{video.channel}</p>
        <p className="stats">
          {formatViews(video.views)} • {timeAgo(video.publishedAt)}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;