/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { useSpring, animated as a } from 'react-spring';

import {
  commentPost,
  deleteComment,
} from '../../actions/postsActions';
import { PostProps, DefaultPostProps } from '../../types/index';
import {
  PostStyled,
  Container,
  Left,
  PlayerStyled,
  InteractionStyled,
  AddCommentStyled,
} from './PostStyles';
import Like from './Like';
import CommentIcon from './CommentIcon';
import Comment from './Comment';
import PostDate from './PostDate';

// eslint-disable-next-line no-shadow
const Post = ({ post, likedPosts, commentPost, isAuthenticated }) => {
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

  const [addComment, addSetComment] = useState('');

  const [openComments, setOpenComments] = useState(false);
  const [commentHeight, setCommentHeight] = useState(0);

  // react-spring props
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const commentsProps = useSpring({
    height: openComments ? `${commentHeight + 15}px` : '0px',
  });

  const handleOpenComments = () => {
    setOpenComments(!openComments);
  };

  const handleChangeUsername = (e) => addSetComment(e.target.value);
  const handleAddComment = () => {
    if (!isAuthenticated) {
      alert('not logged in');
      return;
    }

    if (addComment === '') {
      alert('cant have empty comment ');
      return;
    }

    commentPost(id, addComment);
    addSetComment('');
  };

  return null;
};

const mapStateToProps = (state) => ({
  likedPosts:
    state.auth.user === null ? [] : state.auth.user.likedPosts,
  isAuthenticated: state.auth.isAuthenticated,
});

Post.propTypes = PostProps;
Post.defaultProps = DefaultPostProps;

export default connect(mapStateToProps, { commentPost })(Post);
