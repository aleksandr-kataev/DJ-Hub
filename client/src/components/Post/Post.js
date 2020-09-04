/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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

const CommentCnt = styled.div.attrs({
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
  const { id, title, date, numOfLikes, comments, link, tag } = post;

  const [openComments, setOpenComments] = useState(false);
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const commentsProps = useSpring({
    opacity: openComments ? 1 : 0,
  });
  const handleOpenComments = () => {
    setOpenComments(!openComments);
  };

  return (
    <a.div style={props}>
      <div className={cntStyle}>
        <div className={cntTop}>
          <span>{title}</span>
          <span>{`#${tag}`}</span>
        </div>
        <CommentCnt>
          <ReactPlayer
            className={player}
            url={link}
            width='100%'
            height='120px'
          />
        </CommentCnt>

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

        {openComments && (
          <a.div className='comments' style={commentsProps}>
            {comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </a.div>
        )}
      </div>
    </a.div>
  );
};

const mapStateToProps = (state) => ({
  likedPosts:
    state.auth.user === null ? [] : state.auth.user.likedPosts,
});

Post.propTypes = PostProps;
Post.defaultProps = DefaultPostProps;

export default connect(mapStateToProps, {})(Post);
