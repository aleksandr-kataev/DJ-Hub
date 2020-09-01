/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

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

  const handleOpenComment = () => {
    setOpenComments(!openComments);
  };

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
          <Like
            likeCount={numOfLikes}
            id={id}
            liked={likedPosts.includes(id)}
          />
          <CommentIcon
            handleOpenComment={handleOpenComment}
            commentCount={comments.length}
          />
        </div>
        <PostDate datePosted={date} />
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

Post.propTypes = PostProps;
Post.defaultProps = DefaultPostProps;

export default connect(mapStateToProps, {})(Post);

// create routes for likes and comments separately
// delay for liking
// transi9tion group maybe use styled componentes
