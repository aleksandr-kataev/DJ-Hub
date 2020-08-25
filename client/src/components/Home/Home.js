import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeStyles from './HomeStyles';
import Post from '../Post';
import { getPosts } from '../../actions/postsActions';

// eslint-disable-next-line no-shadow
const Home = ({ getPosts, posts }) => {
  const { cntHome } = HomeStyles;
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (posts.isLoading) {
    return <>Loading</>;
  }

  return (
    <div className={cntHome}>
      {posts.posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    isLoading: PropTypes.bool,
    posts: PropTypes.arrayOf,
  }),
};

Home.defaultProps = {
  posts: PropTypes.shape({
    isLoading: false,
    posts: [],
  }),
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPosts })(Home);
