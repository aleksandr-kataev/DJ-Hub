import {
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  POSTS_LOADED,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT_POST,
  DELETE_COMMENT,
} from '../actions/types';

const initialState = {
  posts: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POSTS_LOADED:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.items.filter(
          (post) => post.id !== action.payload,
        ),
      };
    case LIKE_POST:
      return {
        ...state,
        // update likeCount
      };
    case UNLIKE_POST:
      return {
        ...state,
        // update likeCount
      };
    case COMMENT_POST:
      return {
        ...state,
        post: state,
        // update comment
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: state,
        // update comment
      };
    default:
      return state;
  }
};
