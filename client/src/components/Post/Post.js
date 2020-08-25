/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import PostStyles from './PostStyles';
import Comment from './Comment';

const Post = (post) => {
  const {
    cntStyle,
    cntTop,
    cntBot,
    cntCommentsClosed,
    cntCommentsOpened,
    cntLikeComment,
  } = PostStyles;
  const {
    title,
    date,
    numOfLikes,
    numOfComments,
    comments,
    link,
    tag,
  } = post.post;

  const [openComments, setOpenComments] = useState(false);

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
      <div className={cntTop}>
        <span>{title}</span>
        <span>{`#${tag}`}</span>
      </div>
      <ReactPlayer url={link} width='100%' height='100%' />
      <div className={cntBot}>
        <div className={cntLikeComment}>
          <div className='flex mr-4'>
            <IconContext.Provider
              value={{ color: 'red', size: '25px' }}
            >
              <AiFillHeart />
            </IconContext.Provider>

            <span>{numOfLikes}</span>
          </div>
          <div className='flex'>
            <IconContext.Provider
              value={{ color: 'black', size: '25px' }}
            >
              <AiOutlineComment />
            </IconContext.Provider>

            <span>{numOfComments}</span>
          </div>
        </div>
        <span>{diff}</span>
      </div>
      <div
        className={
          openComments ? cntCommentsOpened : cntCommentsClosed
        }
      >
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Post;
