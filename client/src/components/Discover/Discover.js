import React from 'react';
import { connect } from 'react-redux';
import './Discover.css';

import {
  DiscoverProps,
  DefaultDiscoverProps,
} from '../../types/index';

import PostCard from '../PostCard';
import { getPosts } from '../../actions/postsActions';

// eslint-disable-next-line no-shadow
const Discover = ({ posts }) => {
  if (posts.isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      <div className='posts'>
        {posts.posts.map((post) => (
          <PostCard key={post.id} post={post} />
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
