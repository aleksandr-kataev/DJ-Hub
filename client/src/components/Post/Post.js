/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useMeasure } from 'react-use';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { useSpring, animated as a } from 'react-spring';

import {
  commentPost,
  deleteComment,
} from '../../actions/postsActions';
import { PostProps, DefaultPostProps } from '../../types/index';
import PostStyles from './PostStyles';
import Like from './Like';
import CommentIcon from './CommentIcon';
import Comment from './Comment';
import PostDate from './PostDate';

const PlayerCnt = styled.div.attrs({
  className: '',
})``;

// eslint-disable-next-line no-shadow
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
  const {
    id,
    username,
    title,
    date,
    numOfLikes,
    comments,
    link,
    tag,
  } = post;

  const [openComments, setOpenComments] = useState(false);
  const [commentHeight, setCommentHeight] = useState(0);
  const [ref, { height }] = useMeasure();

  // react-spring props
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const commentsProps = useSpring({
    height: openComments ? `${commentHeight + 10}px` : '0px',
  });

  const handleOpenComments = () => {
    setOpenComments(!openComments);
  };

  useEffect(() => {
    setCommentHeight(height);

    window.addEventListener('resize', setCommentHeight(height));

    return window.removeEventListener(
      'resize',
      setCommentHeight(height),
    );
  }, [height]);

  return (
    <div className={cntStyle}>
      <a.div style={props}>
        <div className={cntTop}>
          <span>{title}</span>
          <span>{`#${tag}`}</span>
        </div>
        <PlayerCnt>
          <ReactPlayer
            className={player}
            url={link}
            width='100%'
            height='120px'
          />
        </PlayerCnt>

        <div className={cntBot}>
          <div className={cntLikeComment}>
            <Like
              likeCount={numOfLikes}
              id={id}
              liked={likedPosts.includes(id)}
            />
            <CommentIcon
              handleOpenComments={handleOpenComments}
              commentCount={comments.length}
            />
          </div>
          <PostDate datePosted={date} />
        </div>

        <div className='my-2'>
          <p>asd</p>
        </div>

        <a.div style={commentsProps}>
          <div ref={ref}>
            {comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </div>
        </a.div>
      </a.div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  likedPosts:
    state.auth.user === null ? [] : state.auth.user.likedPosts,
});

Post.propTypes = PostProps;
Post.defaultProps = DefaultPostProps;

export default connect(mapStateToProps, {})(Post);
