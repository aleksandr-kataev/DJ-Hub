/* eslint-disable no-unused-vars */
import React from 'react';
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
  } = post;

  const dateDiff = (postDate) => {
    const diffInTime = new Date() - postDate.getTime();
    // Return diff in minutes
    if (diffInTime < 3600000) {
      const diffMinutes = Math.round(
        ((diffInTime % 86400000) % 3600000) / 60000,
      );
      return { diffMinutes, type: 'minutes' };
    }
    // Return diff in hours
    if (diffInTime < 86400000) {
      const diffHours = Math.floor((diffInTime % 86400000) / 3600000);
      return { diffHours, type: 'hours' };
    }
    // Return diff in days
    if (diffInTime < 86400000) {
      const diffDays = Math.floor(diffInTime / 86400000);
      return { diffDays, type: 'days' };
    }
    // Return diff in months
    const diffMonths = postDate.getMonth - new Date().getMonth();
    return { diffMonths, type: 'months' };
  };
  return (
    <div className={cntStyle}>
      <p>{title}</p>
      <p>{tag}</p>
      <MixLink link={link} />
      <Like type='like' numOfLikes={numOfLikes} />
      <Comment type='comment' numOfComments={numOfComments} />
      <p>{`${dateDiff(date)} ago`}</p>
    </div>
  );
};

export default Post;
