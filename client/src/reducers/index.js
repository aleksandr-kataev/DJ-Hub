import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import modalsReducer from './modalsReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  posts: postReducer,
  modals: modalsReducer,
});
