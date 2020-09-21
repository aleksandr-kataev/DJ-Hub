import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_REG_MODAL,
  CLOSE_REG_MODAL,
} from './types';

const openRegModal = () => (dispatch) => {
  dispatch({ type: OPEN_REG_MODAL });
};

const closeRegModal = () => (dispatch) => {
  dispatch({ type: CLOSE_REG_MODAL });
};

const openLoginModal = () => (dispatch) => {
  dispatch({ type: OPEN_LOGIN_MODAL });
};

const closeLoginModal = () => (dispatch) => {
  dispatch({ type: CLOSE_LOGIN_MODAL });
};

const switchLogToReg = () => (dispatch) => {
  dispatch({ type: CLOSE_LOGIN_MODAL });
  dispatch({ type: OPEN_REG_MODAL });
};

const switchRegToLog = () => (dispatch) => {
  dispatch({ type: CLOSE_REG_MODAL });
  dispatch({ type: OPEN_LOGIN_MODAL });
};

export {
  openRegModal,
  closeRegModal,
  openLoginModal,
  closeLoginModal,
  switchLogToReg,
  switchRegToLog,
};
