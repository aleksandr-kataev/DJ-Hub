/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { VscComment } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import PostStyles from './PostStyles';
import Comment from './Comment';

const Post = ({ post, likedPosts }) => {
  const {
    cntStyle,
    cntTop,
    cntBot,
    cntCommentsClosed,
    cntCommentsOpened,
    cntLikeComment,
    cntPlayer,
    player,
  } = PostStyles;
  const { id, title, date, numOfLikes, comments, link, tag } = post;

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

  const [openComments, setOpenComments] = useState(false);
  const [liked, setLiked] = useState(null);
  const [diff, setDiff] = useState(dateDiff(date));

  const handleLike = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    setLiked(likedPosts.includes(id));
    const check = setInterval(() => {
      setDiff(dateDiff(date));
    }, 10000);
    return () => clearInterval(check);
  }, [date, likedPosts]);

  return (
    <div className={cntStyle}>
      <div className={cntTop}>
        <span>{title}</span>
        <span>{`#${tag}`}</span>
      </div>
      <div className={cntPlayer}>
        <ReactPlayer
          className={player}
          url={link}
          width='100%'
          height='120px'
        />
      </div>
      <div className={cntBot}>
        <div className={cntLikeComment}>
          <div className='flex mr-6'>
            <IconContext.Provider
              value={{ color: 'red', size: '25px' }}
            >
              {liked ? (
                <AiFillHeart onClick={handleLike} />
              ) : (
                <AiOutlineHeart onClick={handleLike} />
              )}
            </IconContext.Provider>
            <span className='flex ml-2'>{numOfLikes}</span>
          </div>

          <div className='flex'>
            <IconContext.Provider
              value={{ color: 'black', size: '25px' }}
            >
              <VscComment />
            </IconContext.Provider>
            <span className='flex ml-2'>{comments.length}</span>
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

const mapStateToProps = (state) => ({
  likedPosts:
    state.auth.user === null ? [] : state.auth.user.likedPosts,
});

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.string,
    numOfLikes: PropTypes.number,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        userID: PropTypes.string,
        comment: PropTypes.string,
        date: PropTypes.date,
      }),
    ),
    title: PropTypes.string,
    userID: PropTypes.string,
    link: PropTypes.string,
    tag: PropTypes.string,
  }),
  likedPosts: PropTypes.arrayOf(PropTypes.string),
};

Post.defaultProps = {
  post: {},
  likedPosts: [],
};

export default connect(mapStateToProps, {})(Post);

// create routes for likes and comments separately
// delay for liking
