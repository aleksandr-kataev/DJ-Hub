import axios from 'axios';
import { returnErrors } from './errorActions';
import tokenConfig from './tokenConfig';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from './types';

// Load user
const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  try {
    const res = await axios.get(
      // dev http://localhost:5000/api/user
      // build api/dev
      'http://localhost:5000/api/user/',
      tokenConfig(getState),
    );
    if (!res) throw new Error();
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};
// Register user
const register = ({ username, email, password }) => async (
  dispatch,
) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post(
      'http://localhost:5000/api/user/register',
      body,
      config,
    );

    if (!res) throw new Error();
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch(
      returnErrors(
        e.response.data,
        e.response.status,
        'REGISTER_FAIL',
      ),
    );
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

const login = ({ username, password }) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post(
      'http://localhost:5000/api/user/login',
      body,
      config,
    );

    if (!res) throw new Error();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch(
      returnErrors(e.response.data, e.response.status, 'LOGIN_FAIL'),
    );
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout a user
const logout = () => ({
  type: LOGOUT_SUCCESS,
});

export { loadUser, register, login, logout };
