/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PostStyles from './PostStyles';
import Like from './Like';
import Comment from './Comment';
import MixLink from './MixLink';

const Post = (post) => {
  const { cntStyle, cntLink } = PostStyles;
  const {
    title,
    date,
    numOfLikes,
    numOfComments,
    comments,
    link,
    tag,
  } = post.post;

  const dateDiff = (postDate) => {
    const dateObj = new Date(postDate);
    const diffInTime = new Date() - dateObj;
    // Return diff in seconds
    if (diffInTime < 60000) {
      const diff = Math.round(diffInTime / 1000);
      if (diff === 1) {
        return '1 second ago';
      }
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
    const diff = dateObj.getMonth() - new Date().getMonth();
    if (diff === 1) {
      return '1 month ago';
    }
    return `${diff} months ago`;
  };

  const [diff, setDiff] = useState(dateDiff(date));

  useEffect(() => {
    const check = setInterval(() => {
      setDiff(dateDiff(date));
    }, 10000);
    return () => clearInterval(check);
  }, [date]);

  return (
    <div className={cntStyle}>
      <p>{title}</p>
      <p>{tag}</p>
      <MixLink link={link} />
      <Like numOfLikes={numOfLikes} />
      <Comment numOfComments={numOfComments} />
      <p>{diff}</p>
    </div>
  );
};

export default Post;
