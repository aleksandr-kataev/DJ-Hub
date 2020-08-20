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
} from './types';

// Load user
const loadUser = () => async (dispach, getState) => {
  // User loading
  dispach({ type: USER_LOADING });

  try {
    const res = await axios.get(
      // dev http://localhost:5000/api/user
      // build api/dev
      'http://localhost:5000/api/user',
      tokenConfig(getState),
    );
    if (!res) throw new Error();
    dispach({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    dispach(returnErrors(e.response.data, e.response.status));
    dispach({ type: AUTH_ERROR });
  }
};
// Register user
const register = ({ username, email, password }) => async (
  dispach,
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
    dispach({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispach(
      returnErrors(
        e.response.data,
        e.response.status,
        'REGISTER_FAIL',
      ),
    );
    dispach({
      type: REGISTER_FAIL,
    });
  }
};

const login = () => 0;

// Logout a user
const logout = () => ({
  type: LOGOUT_SUCCESS,
});

export { loadUser, register, login, logout };
