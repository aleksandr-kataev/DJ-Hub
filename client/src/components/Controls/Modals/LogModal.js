/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';
import ModalStyles from './ModalStyle';

const LogModal = ({
  showLogModal,
  setShowLogModal,
  isAuthenticated,
  error,
  login,
  clearErrors,
}) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const {
    bg,
    modal,
    heading,
    label,
    input,
    submit,
    err,
    errMessage,
  } = ModalStyles;

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleCloseLogModal = () => {
    clearErrors();
    setShowLogModal(false);
  };

  const handleOnSumbit = (e) => {
    e.preventDefault();
    const user = { username, password };
    login(user);
  };

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setErrMsg(error.msg.err);
    } else {
      setErrMsg(null);
    }

    // If authenticated, close modal
    if (showLogModal) {
      if (isAuthenticated) {
        setShowLogModal(false);
      }
    }
  }, [error, setShowLogModal, isAuthenticated, showLogModal]);

  if (!showLogModal) {
    return null;
  }
  return (
    <div className={bg}>
      <div className={modal}>
        <p className={heading}>Login</p>
        <form>
          <label htmlFor='username' className={label}>
            Username
            <input
              className={input}
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              onChange={handleChangeUsername}
            />
          </label>
          <label htmlFor='password' className={label}>
            Password
            <input
              className={input}
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              onChange={handleChangePassword}
            />
          </label>
          <div className={err}>
            <p className={errMessage}>{errMsg}</p>
          </div>
        </form>
        <button
          type='button'
          className={submit}
          onClick={handleOnSumbit}
        >
          Submit
        </button>
        <button type='button' onClick={handleCloseLogModal}>
          Close
        </button>
      </div>
    </div>
  );
};

LogModal.propTypes = {
  showLogModal: PropTypes.bool.isRequired,
  setShowLogModal: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  error: PropTypes.shape({
    msg: PropTypes.shape({
      err: PropTypes.string,
    }),
    status: PropTypes.number,
    id: PropTypes.string,
  }),
};

LogModal.defaultProps = {
  isAuthenticated: null,
  error: null,
};

const mapStateToPros = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToPros, { login, clearErrors })(
  LogModal,
);
