export const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = Math.floor(seconds / intervals[i].seconds);
    if (interval >= 1) {
      return `${interval} ${interval === 1 ? intervals[i].label : intervals[i].label + 's'} ago`;
    }
  }

  return 'just now';
};

// export const getRatingPercent = (star) => {
//   const total = Object.values(ratingsCount).reduce((a, b) => a + b, 0);
//   return total ? ((ratingsCount[star] || 0) / total) * 100 : 0;
// };
// Format like 11 Apr 2025
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};