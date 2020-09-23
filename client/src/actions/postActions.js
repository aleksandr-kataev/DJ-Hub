import axios from 'axios';
import { returnErrors } from './errorActions';

import { POST_LOADING, POST_LOADED } from './types';

export default (id) => async (dispatch) => {
  dispatch({ type: POST_LOADING });
  try {
    const res = await axios.get(
      `http://localhost:5000/api/posts/${id}`,
    );
    if (!res) throw new Error('Failed to retreive data');
    dispatch({
      type: POST_LOADED,
      payload: res.data[0],
    });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};
