/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { HeartFill, Heart } from 'react-bootstrap-icons';
import { likePost, unlikePost } from '../../actions/postsActions';
import { openLoginModal } from '../../actions/modalActions';
import {
  LikeIconProps,
  DefaultLikeIconProps,
} from '../../types/index';
import './LikeIcon.css';

const LikeIcon = ({
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

LikeIcon.propTypes = LikeIconProps;
LikeIcon.defaultProps = DefaultLikeIconProps;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  likePost,
  unlikePost,
  openLoginModal,
})(LikeIcon);
