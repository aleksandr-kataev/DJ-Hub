import { POST_LOADING, POST_LOADED } from '../actions/types';

const initialState = {
  post: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POST_LOADED:
      return {
        post: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
