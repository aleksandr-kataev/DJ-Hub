/* eslint-disable no-confusing-arrow */
/* eslint-disable no-shadow */

import { connect } from 'react-redux';

import { likePost, unlikePost } from '../../actions/postsActions';
import { LikeProps, DefaultLikeProps } from '../../types/index';

const Like = () => 0;

Like.propTypes = LikeProps;
Like.defaultProps = DefaultLikeProps;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { likePost, unlikePost })(
  Like,
);
