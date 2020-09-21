import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Discover.css';

import {
  DiscoverProps,
  DefaultDiscoverProps,
} from '../../types/index';

import Post from '../Post';
import { getPosts } from '../../actions/postsActions';

// eslint-disable-next-line no-shadow
const Discover = ({ getPosts, posts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (posts.isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      <div className='posts'>
        {posts.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
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
