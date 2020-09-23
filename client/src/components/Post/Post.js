/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Date from '../helpers/Date';
import Like from '../LikeIcon/LikeIcon';
import CommentIcon from '../CommentIcon/CommentIcon';
import getPost from '../../actions/postActions';
import Comment from './Comment/Comment';
import { PostProps, DefaultPostProps } from '../../types/index';

import './Post.css';

const Post = ({ match, likedPosts, post, getPost }) => {
  const { id } = match.params;

  const history = useHistory();

  const handleUserRedirect = () => {
    history.push(`./users/${post.username}`);
  };

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  if (post.isLoading || !post.post) {
    return (
      <div className='post__loading'>
        <h1>Loading</h1>
      </div>
    );
  }
  const { title, tag, link, username, comments } = post.post;
  return (
    <div className='post'>
      <div className='post__card'>
        <Container fluid>
          <Row className='post__row'>
            <Col className='post__title'>
              <span>{title}</span>
            </Col>
            <Col className='post__rightAlign'>
              <span>{`#${tag}`}</span>
            </Col>
          </Row>
          <Row>
            <Col className='post__player'>
              <ReactPlayer url={link} width='100%' height='300px' />
            </Col>
          </Row>
          <Row>
            <Col className='post__commentCnt'>
              <input
                className='post__input'
                placeholder='Leave a comment'
              />
              <Button className='post__commentBnt' variant='light'>
                Post
              </Button>
            </Col>
          </Row>

          <Row>
            <Col sm={2} className='post__author'>
              <span>{username}</span>
            </Col>

            <Col sm={7} className='post__comments'>
              {comments.map((comment) => (
                <Comment key={comment.commentID} comment={comment} />
              ))}
            </Col>
            <Col sm={3} className='post__related'>
              related
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

Post.propTypes = PostProps;
Post.defaultProps = DefaultPostProps;

const mapStateToProps = (state) => ({
  post: state.post,
  likedPosts:
    state.auth.user === null ? [] : state.auth.user.likedPosts,
});

export default connect(mapStateToProps, { getPost })(Post);
