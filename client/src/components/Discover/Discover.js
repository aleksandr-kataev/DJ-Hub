import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DiscoverStyles from './DiscoverStyles';
import Post from '../Post';
import { getPosts } from '../../actions/postsActions';

// eslint-disable-next-line no-shadow
const Discover = ({ getPosts, posts }) => {
  const { cntDiscover } = DiscoverStyles;

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (posts.isLoading) {
    return <>Loading</>;
  }

  return (
    <div className={cntDiscover}>
      {posts.posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

Discover.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    isLoading: PropTypes.bool,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        date: PropTypes.string,
        numOfLikes: PropTypes.number,
        comment: PropTypes.arrayOf(
          PropTypes.shape({
            userID: PropTypes.string,
            comment: PropTypes.string,
            date: PropTypes.date,
          }),
        ),
        _id: PropTypes.string,
        title: PropTypes.string,
        userID: PropTypes.string,
        link: PropTypes.string,
        tag: PropTypes.string,
      }),
    ),
  }),
};

Discover.defaultProps = {
  posts: PropTypes.shape({
    isLoading: false,
    posts: [],
  }),
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  likedPosts:
    state.auth.user === null ? [] : state.auth.user.likedPosts,
});

export default connect(mapStateToProps, { getPosts })(Discover);
