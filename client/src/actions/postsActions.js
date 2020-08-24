import axios from 'axios';
import {
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  POSTS_LOADED,
} from './types';

import tokenConfig from './tokenConfig';
import { returnErrors } from './errorActions';

const getPosts = () => async (dispatch) => {
  dispatch({ type: POSTS_LOADING });
  try {
    const res = await axios.get('http://localhost:5000/api/posts');
    dispatch({ type: POSTS_LOADED, payload: res.data });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

const addPost = (post) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/posts',
      { ...post, userID: getState().auth.user.id },
      tokenConfig(getState),
    );
    dispatch({ type: ADD_POST, payload: res.data });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

const deletePost = (postID) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      'http://localhost:5000/api/posts',
      { postID, userID: getState().auth.user.id },
      tokenConfig(getState),
    );
    dispatch({ type: DELETE_POST, payload: res.data });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

export { getPosts, addPost, deletePost };
