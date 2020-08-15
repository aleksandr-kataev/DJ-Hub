import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// check token && load user
const loadUser = () => async (dispach, getState) => {
  // User loading
  dispach({ type: USER_LOADING });

  // Get tokena from locaStorage
  const { token } = getState().auth;

  const config = {
    headers: {
      'Context-type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  try {
    const res = await axios.get('api/user', config);
    if (!res) throw new Error();
    dispach({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    dispach(
      returnErrors(e.response.data, e.response.status),
    );
    dispach({ type: AUTH_ERROR });
  }
};

export { loadUser };
