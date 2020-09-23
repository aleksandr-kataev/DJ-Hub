import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postsReducer from './postsReducer';
import modalsReducer from './modalsReducer';
import postReducer from './postReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  posts: postsReducer,
  modals: modalsReducer,
  post: postReducer,
});
