/* eslint-disable no-unused-vars */
import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Date from '../helpers/Date';
import {
  PostCardProps,
  DefaultPostCardProps,
} from '../../types/index';
import Like from '../LikeIcon/LikeIcon';
import Comment from '../CommentIcon/Comment';
import './PostCard.css';

// eslint-disable-next-line no-shadow
const PostCard = ({ post, likedPosts }) => {
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

  const history = useHistory();

  const handleUserRedirect = () => {
    history.push(`./users/${username}`);
  };

  return (
    <Card className='post'>
      <Card.Body>
        <Container>
          <Row className='post__row'>
            <Col className='post__title'>
              <span>{title}</span>
            </Col>
            <Col className='post__rightAlign'>
              <span>{`#${tag}`}</span>
            </Col>
          </Row>
          <Row>
            <Col className='post__username'>
              <button onClick={handleUserRedirect} type='button'>
                {username}
              </button>
            </Col>
          </Row>
          <Row>
            <Col>
              <ReactPlayer url={link} width='100%' height='130px' />
            </Col>
          </Row>
          <Row className='post__row bottomRow'>
            <Col className='post__interactions'>
              <Like
                numOfLikes={numOfLikes}
                id={id}
                liked={likedPosts.includes(id)}
              />
              <Comment
                id={id}
                numOfComments={comments.length}
                redirect
              />
            </Col>
            <Col className='post__rightAlign'>
              <Date datePosted={date} />
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  likedPosts:
    state.auth.user === null ? [] : state.auth.user.likedPosts,
  isAuthenticated: state.auth.isAuthenticated,
});

PostCard.propTypes = PostCardProps;
PostCard.defaultProps = DefaultPostCardProps;

export default connect(mapStateToProps, {})(PostCard);
