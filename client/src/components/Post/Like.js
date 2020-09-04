/* eslint-disable no-confusing-arrow */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useTransition, animated as a } from 'react-spring';
import { likePost, unlikePost } from '../../actions/postsActions';
import { LikeProps } from '../../types/index';

const LikeStyled = styled.div.attrs({
  className: 'flex mr-16 hover:opacity-70 cursor-pointer',
})``;

const Like = ({
  likePost,
  unlikePost,
  isAuthenticated,
  likeCount,
  id,
  liked,
}) => {
  const transition = useTransition(liked, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { position: 'flex', opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 500 },
  });

  const [disabled, setDisabled] = useState(false);

  const handleLike = (e) => {
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
      alert('must be logged in');
    }
  };

  return (
    <LikeStyled>
      {transition.map(
        ({ item, props }) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          item ? (
            <a.div style={props}>
              <button
                type='button'
                className='flex focus:outline-none'
                onClick={handleLike}
                disabled={disabled}
              >
                <IconContext.Provider
                  value={{ color: 'red', size: '24px' }}
                >
                  <AiFillHeart />
                </IconContext.Provider>
                <span className='ml-2'>{likeCount}</span>
              </button>
            </a.div>
          ) : (
            <a.div style={props}>
              <button
                type='button'
                className='flex focus:outline-none'
                onClick={handleLike}
                disabled={disabled}
              >
                <IconContext.Provider
                  value={{ color: 'red', size: '24px' }}
                >
                  <AiOutlineHeart />
                </IconContext.Provider>
                <span className='ml-2'>{likeCount}</span>
              </button>
            </a.div>
          ),
        // eslint-disable-next-line function-paren-newline
      )}
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
