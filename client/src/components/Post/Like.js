/* eslint-disable no-confusing-arrow */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { connect } from 'react-redux';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { likePost, unlikePost } from '../../actions/postsActions';
import { LikeProps } from '../../types/index';

const LikeStyled = styled.div`
  ${tw`flex mr-8 hover:opacity-70 cursor-pointer`}
  & {
    button {
      ${tw`flex focus:outline-none`}
    }
    span {
      ${tw`ml-2`}
    }
  }
`;

const Like = ({
  likePost,
  unlikePost,
  isAuthenticated,
  likeCount,
  id,
  liked,
}) => {
  const [disabled, setDisabled] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    setDisabled(true);
    setTimeout(() => setDisabled(false), 250);
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
      <button type='button' onClick={handleLike} disabled={disabled}>
        {liked ? (
          <IconContext.Provider
            value={{ color: 'red', size: '24px' }}
          >
            <AiFillHeart />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider
            value={{ color: 'red', size: '24px' }}
          >
            <AiOutlineHeart />
          </IconContext.Provider>
        )}
        <span>{likeCount}</span>
      </button>
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
