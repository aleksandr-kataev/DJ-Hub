export default (postDate) => {
  const dateObj = new Date(postDate);
  const diffInTime = new Date() - dateObj;
  // Return diff in seconds
  if (diffInTime < 10000) {
    return 'just now';
  }
  if (diffInTime < 60000) {
    const diff = Math.round(diffInTime / 1000);
    return `${diff} seconds ago`;
  }
  // Return diff in minutes
  if (diffInTime < 3600000) {
    const diff = Math.round(
      ((diffInTime % 86400000) % 3600000) / 60000,
    );
    if (diff === 1) {
      return '1 minute ago';
    }
    return `${diff} minutes ago`;
  }
  // Return diff in hours
  if (diffInTime < 86400000) {
    const diff = Math.floor((diffInTime % 86400000) / 3600000);
    if (diff === 1) {
      return '1 hour ago';
    }
    return `${diff} hours ago`;
  }
  // Return diff in days
  if (diffInTime < 2592000000) {
    const diff = Math.floor(diffInTime / 86400000);
    if (diff === 1) {
      return '1 day ago';
    }
    return `${diff} days ago`;
  }
  // Return diff in months
  const diff = new Date().getMonth() - dateObj.getMonth();
  if (diff === 1) {
    return '1 month ago';
  }
  return `${diff} months ago`;
};
