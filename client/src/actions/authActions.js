import axios from 'axios';
import { returnErrors } from './errorActions';
import tokenConfig from './tokenConfig';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
} from './types';

// check token && load user
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
    dispach(
      returnErrors(e.response.data, e.response.status),
    );
    dispach({ type: AUTH_ERROR });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { loadUser };
