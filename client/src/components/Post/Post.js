/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { Card, Tag, Row, Col } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { PostProps, DefaultPostProps } from '../../types/index';
import './Post.css';

// eslint-disable-next-line no-shadow
const Post = ({ post, likedPosts, isAuthenticated }) => {
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

  return (
    <Card
      title={title}
      extra={<Tag color='magenta'>{tag}</Tag>}
      style={{ marginTop: '2rem' }}
    >
      <p>{username}</p>
      <ReactPlayer url={link} width='100%' height='130px' />
      <Row style={{ marginTop: '1%' }}>
        <Col span={12}>
          <HeartFilled
            style={{ fontSize: '20px', color: '#d43008' }}
          />
          <span style={{ fontSize: '18px', marginLeft: '3px' }}>
            {numOfLikes}
          </span>
        </Col>
        <Col span={12}>
          <p style={{ textAlign: 'right' }}>{date}</p>
        </Col>
      </Row>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  likedPosts:
    state.auth.user === null ? [] : state.auth.user.likedPosts,
  isAuthenticated: state.auth.isAuthenticated,
});

Post.propTypes = PostProps;
Post.defaultProps = DefaultPostProps;

export default connect(mapStateToProps, {})(Post);
