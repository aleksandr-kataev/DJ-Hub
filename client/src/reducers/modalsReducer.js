import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_REG_MODAL,
  CLOSE_REG_MODAL,
} from '../actions/types';

const initialState = {
  showRegModal: false,
  showLoginModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: true,
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: false,
      };
    case OPEN_REG_MODAL:
      return {
        ...state,
        showRegModal: true,
      };
    case CLOSE_REG_MODAL:
      return {
        ...state,
        showRegModal: false,
      };
    default:
      return state;
  }
};
