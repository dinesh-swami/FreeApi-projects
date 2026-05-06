export const formatDuration = (isoDuration) => {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "0:00";
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '').padStart(2, '0');
  if (hours) return `${hours}:${minutes.padStart(2,'0')}:${seconds}`;
  return `${minutes || '0'}:${seconds}`;
};

export const formatViews = (views) => {
  if (!views) return '0 views';
  const num = parseInt(views);
  if (num >= 1_000_000) return (num/1_000_000).toFixed(1) + 'M views';
  if (num >= 1_000) return (num/1_000).toFixed(1) + 'K views';
  return num + ' views';
};

export const timeAgo = (dateString) => {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m";
  return Math.floor(seconds) + "s";
};