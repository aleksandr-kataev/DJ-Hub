/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { HeartFill, Heart } from 'react-bootstrap-icons';
import { likePost, unlikePost } from '../../../actions/postsActions';
import { openLoginModal } from '../../../actions/modalActions';
import { LikeProps, DefaultLikeProps } from '../../../types/index';
import './Like.css';

const Like = ({
  openLoginModal,
  likePost,
  unlikePost,
  isAuthenticated,
  numOfLikes,
  id,
  liked,
}) => {
  const [disabled, setDisabled] = useState(false);

  const handleLike = (e) => {
    if (disabled) return;
    e.preventDefault();
    setDisabled(true);
    setTimeout(() => setDisabled(false), 500);
    if (isAuthenticated) {
      if (liked) {
        unlikePost(id);
      } else {
        likePost(id);
      }
    } else {
      openLoginModal();
    }
  };

  return (
    <div
      className='like'
      role='button'
      tabIndex={0}
      onClick={handleLike}
      onKeyDown={handleLike}
    >
      {liked ? (
        <HeartFill size={18} color='red' />
      ) : (
        <Heart size={18} color='red' />
      )}
      <span className='like__count'>{numOfLikes}</span>
    </div>
  );
};

Like.propTypes = LikeProps;
Like.defaultProps = DefaultLikeProps;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  likePost,
  unlikePost,
  openLoginModal,
})(Like);
