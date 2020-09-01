/* eslint-disable no-shadow */
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart';
import { likePost, unlikePost } from '../../actions/postsActions';
import { LikeProps } from '../../types/index';

const LikeStyled = styled.div.attrs({
  className: 'flex mr-6',
})``;

const Like = (props) => {
  const {
    likePost,
    unlikePost,
    isAuthenticated,
    likeCount,
    id,
    liked,
  } = props;

  const handleLike = () => {
    if (isAuthenticated) {
      if (liked) {
        unlikePost(id);
      } else {
        likePost(id);
      }
    } else {
      alert('must be logged in');
    }
  };

  return (
    <LikeStyled>
      <UseAnimations
        animation={heart}
        onClick={handleLike}
        size={25}
        reverse={isAuthenticated}
      />
      <span className='flex ml-2'>{likeCount}</span>
    </LikeStyled>
  );
};

Like.propTypes = LikeProps;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { likePost, unlikePost })(
  Like,
);
// https://www.youtube.com/watch?v=z3oHmGVB4K0
