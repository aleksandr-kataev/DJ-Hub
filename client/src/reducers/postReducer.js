import {
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  SEARCH_NOT_FOUND,
  POSTS_LOADED,
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
    case SEARCH_NOT_FOUND:
      return {
        ...state,
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
    default:
      return state;
  }
};
