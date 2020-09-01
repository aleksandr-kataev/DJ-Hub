import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import {
  DiscoverProps,
  DefaultDiscoverProps,
} from '../../types/index';

import Post from '../Post';
import { getPosts } from '../../actions/postsActions';

const AppStyles = styled.div.attrs({
  className: '',
})``;

// eslint-disable-next-line no-shadow
const Discover = ({ getPosts, posts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (posts.isLoading) {
    return <>Loading</>;
  }

  return (
    <AppStyles>
      {posts.posts.map((post) => (
        <Post post={post} />
      ))}
    </AppStyles>
  );
};

Discover.propTypes = DiscoverProps;
Discover.defaultProps = DefaultDiscoverProps;

const mapStateToProps = (state) => ({
  posts: state.posts,
  likedPosts:
    state.auth.user === null ? [] : state.auth.user.likedPosts,
});

export default connect(mapStateToProps, { getPosts })(Discover);
