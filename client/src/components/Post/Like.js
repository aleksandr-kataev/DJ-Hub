/* eslint-disable no-shadow */
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { likePost, unlikePost } from '../../actions/postsActions';
import { LikeProps } from '../../types/index';

const LikeStyled = styled.div.attrs({
  className: 'flex mr-6 hover:opacity-70 cursor-pointer',
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
      {liked ? (
        <IconContext.Provider value={{ color: 'red', size: '24px' }}>
          <AiFillHeart onClick={handleLike} />
        </IconContext.Provider>
      ) : (
        <IconContext.Provider value={{ color: 'red', size: '24px' }}>
          <AiOutlineHeart onClick={handleLike} />
        </IconContext.Provider>
      )}

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
